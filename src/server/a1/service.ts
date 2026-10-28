import {randomUUID} from 'node:crypto';
import type {FoundationRepository} from '../repository.ts';
import {LIMITS,PROMPT_VERSION,VALIDATION_VERSION,type Runtime,type Scenario,type Trigger,type Candidate,type Result,type Preferences} from '../../a1/contracts.ts';
import {buildResult,deduplicate,prepStart} from '../../a1/engine.ts';
import {nextStrategy,type Attempt} from '../../a1/strategy.ts';
import {mockSearch} from '../../a1/fixtures.ts';
import {invokeMock,MockProvider,ProviderError,type ModelProvider} from '../../a1/provider.ts';
type Run={id:string;case_id:string;operation_id:string;scenario:Scenario;status:string;runtime:string;step:number;candidates:string;failures:number;result:string|null;created_at:string;updated_at:string;owner_runtime:string;model_requests:number;cost_microusd:number;error_code:string|null;cost_status:string};
const scenarios=['S1','S2','S3','S4','S5','S6','no-match','malformed'];
export class A1Service {
 private controllers=new Map<string,AbortController>();
 readonly repo:FoundationRepository;readonly provider:ModelProvider;readonly clock:()=>string;readonly searchProvider:typeof mockSearch;
 constructor(repo:FoundationRepository,provider:ModelProvider=new MockProvider(),clock=()=>new Date().toISOString(),searchProvider:typeof mockSearch=mockSearch){
 this.repo=repo;this.provider=provider;this.clock=clock;this.searchProvider=searchProvider;
  for(const row of repo.db.prepare("SELECT id FROM a1_runs WHERE status='running' AND owner_runtime<>?").all(repo.runtimeId)) {repo.db.prepare("UPDATE a1_runs SET status='interrupted',error_code='PROCESS_INTERRUPTED' WHERE id=?").run(String(row.id));this.trace(String(row.id),'interrupted',{manual_resume_required:true});}
 }
 private trace(id:string,event:string,details:object){this.repo.db.prepare('INSERT INTO a1_trace(run_id,event,details,at) VALUES(?,?,?,?)').run(id,event,JSON.stringify(details),this.clock());}
 private search(caseId:string){return this.repo.readForAgent(caseId,'A1').find(r=>r.group==='search-profile')!;}
 private run(caseId:string,id:string){const r=this.repo.db.prepare('SELECT * FROM a1_runs WHERE id=? AND case_id=?').get(id,caseId) as Run|undefined;if(!r)throw Error('Run not found in this case');return r;}
 private current(r:Run){const runtime=JSON.parse(r.runtime);return this.search(r.case_id).version===runtime.constraints_version&&runtime.validation_version===VALIDATION_VERSION;}
 list(caseId:string){this.search(caseId);const rows=this.repo.db.prepare('SELECT * FROM a1_runs WHERE case_id=? ORDER BY created_at DESC,rowid DESC').all(caseId) as Run[];return rows.map(r=>({id:r.id,status:r.status,scenario:r.scenario,step:r.step,error:r.error_code,modelRequests:r.model_requests,cost:r.cost_status==='mock-zero'?0:null,costStatus:r.cost_status,valid:this.current(r)&&r===rows[0]&&r.status==='completed',result:r.result?this.visibleResult(r,this.current(r)&&r===rows[0]&&r.status==='completed'):null,trace:this.repo.db.prepare('SELECT event,details,at FROM a1_trace WHERE run_id=? ORDER BY id').all(r.id)}));}
 private visibleResult(r:Run,valid:boolean):Result {const result=JSON.parse(r.result!) as Result;return {...result,A3_handoffs:result.A3_handoffs.map(h=>({...h,valid:h.valid&&valid,limitations:valid?h.limitations:[...h.limitations,'Dependent inputs or findings version changed; revalidation required.']}))};}
 start(caseId:string,operationId:string,scenario:Scenario,trigger:Trigger,expectedVersion:number){
  if(!scenarios.includes(scenario)||!['on-demand','simulated-refresh'].includes(trigger))throw Error('Explicit permitted mock trigger required');
  if(!/^[\w:-]{8,160}$/.test(operationId))throw Error('Stable operation ID required');
  const existing=this.repo.db.prepare('SELECT * FROM a1_runs WHERE operation_id=?').get(operationId) as Run|undefined;if(existing){if(existing.case_id!==caseId||existing.scenario!==scenario||JSON.parse(existing.runtime).trigger!==trigger)throw Error('Operation ID conflicts');return existing.id;}
  if(this.repo.db.prepare("SELECT id FROM a1_runs WHERE status='running'").get())throw Error('One A1 run is already active');
  const search=this.search(caseId);if(search.version!==expectedVersion)throw Error('Preferences changed; review before starting');
  const data=search.data,preferences:Preferences={searchPostalCodes:data.searchPostalCodes as string[],unitType:String(data.unitType),baseDiscoveryCeiling:(data.baseDiscoveryCeiling??null) as number|null,moveInDate:data.moveInDate as string|null,moveInLatestDate:data.moveInLatestDate as string|null,leaseExpiry:data.leaseExpiry as string|null,pathWalkMaxMinutes:data.pathWalkMaxMinutes as number|null,staffedConciergeOrDoorman24HoursRequired:data.staffedConciergeOrDoorman24HoursRequired===true};
  const previous=this.list(caseId).find(r=>r.result)?.result,id=randomUUID(),at=this.clock();
  const runtime:Runtime={validation_version:VALIDATION_VERSION,run_id:id,as_of:at,timezone:'America/New_York',trigger,constraints_version:search.version,memory_version:Number(this.repo.db.prepare('SELECT count(*) AS n FROM a1_memory WHERE case_id=?').get(caseId)?.n??0),previous_findings_version:previous?.findings_version??0,opportunity_ledger:(previous?.opportunity_ledger??[]).map(a=>({candidate_id:a.candidate.candidate_id,status:a.status})),renewal_received:this.repo.db.prepare("SELECT json_extract(data,'$.status') AS status FROM records WHERE case_id=? AND group_name='housing-case'").get(caseId)?.status==='renewal-received'?true:null,current_lease_expiry:preferences.leaseExpiry,prep_start:prepStart(preferences.leaseExpiry),approved_cadence_policy:'explicit-demo-only',selected_candidate:null,specific_action_consent:null,tool_capabilities:{provider:'mock',intendedModel:'GPT-6 Astra',liveAvailable:false,externalActions:false},run_limits:LIMITS,preferences};
  this.repo.db.prepare('INSERT INTO a1_runs(id,case_id,operation_id,scenario,status,runtime,created_at,updated_at,owner_runtime) VALUES(?,?,?,?,?,?,?,?,?)').run(id,caseId,operationId,scenario,'running',JSON.stringify(runtime),at,at,this.repo.runtimeId);this.trace(id,'started',{trigger,scenario,constraints_version:search.version,paid_live_gate:'OFF',provider:'mock'});
  if(preferences.baseDiscoveryCeiling===null||!preferences.moveInDate||!preferences.moveInLatestDate||preferences.pathWalkMaxMinutes===null||!preferences.searchPostalCodes.length)this.finish(this.run(caseId,id),'missing-input',false);
  return id;
 }
 private finish(r:Run,stop:string,complete:boolean,validated?:Result){const runtime=JSON.parse(r.runtime) as Runtime;const prior=this.list(r.case_id).find(x=>x.id!==r.id&&x.result)?.result??undefined;const result=validated??buildResult(runtime,JSON.parse(r.candidates),{stop,calls:r.step,failures:r.failures,prior,complete});this.repo.db.prepare('UPDATE a1_runs SET status=?,result=?,updated_at=?,error_code=? WHERE id=?').run(stop==='completed'?'completed':stop==='stopped'?'stopped':'partial',JSON.stringify(result),this.clock(),['completed','stopped','missing-input'].includes(stop)?null:stop,r.id);this.trace(r.id,'finished',{stop,outcome:result.outcome,cost_microusd:r.cost_status==='mock-zero'?0:null,accounting:r.cost_status==='mock-zero'?'mock: no billable tokens or calls':'uncertain simulated provider accounting; no zero-cost assertion',cost_status:r.cost_status,input_tokens:0,output_tokens:0,reasoning_tokens:0,search_api_calls:0,latency_ms:Math.max(0,Date.parse(this.clock())-Date.parse(r.created_at)),local_input_accounting:'UTF-8 bytes / 3 estimate only; real tokenizer NOT VERIFIED'});return result;}
 async advance(caseId:string,id:string,expectedStep:number){let r=this.run(caseId,id);if(r.status!=='running'||r.step!==expectedStep)return;
  if(!this.current(r)){this.finish(r,'preferences-changed',false);return;}
  if(Date.parse(this.clock())-Date.parse(r.updated_at)>LIMITS.deadlineMs||Date.parse(this.clock())-Date.parse(r.created_at)>LIMITS.deadlineMs){this.finish(r,'timeout',false);return;}
  const runtime=JSON.parse(r.runtime) as Runtime;
  const attempts=(this.repo.db.prepare("SELECT details FROM a1_trace WHERE run_id=? AND event='mock-source' ORDER BY id").all(id)).map(row=>JSON.parse(String(row.details))) as Attempt[];
  const before=JSON.parse(r.candidates) as Candidate[],strategy=nextStrategy(runtime,before,attempts);
  if(strategy){const batch=this.searchProvider(r.scenario,r.step,runtime,strategy),all=deduplicate([...before,...batch.candidates]);
   const newEvidence=all.reduce((n,c)=>n+c.evidence.filter(e=>!before.find(old=>old.candidate_id===c.candidate_id)?.evidence.some(old=>old.evidence_id===e.evidence_id&&JSON.stringify(old.value)===JSON.stringify(e.value))).length,0);
   this.repo.db.exec('BEGIN IMMEDIATE');try{
   this.repo.db.prepare('UPDATE a1_runs SET candidates=?,step=step+1,failures=failures+?,updated_at=? WHERE id=? AND step=? AND status=?').run(JSON.stringify(all),Number(batch.failure),this.clock(),id,r.step,'running');
   for(const c of all)for(const e of c.evidence)this.repo.db.prepare('INSERT OR REPLACE INTO a1_evidence VALUES(?,?,?,?)').run(id,c.candidate_id,e.evidence_id,JSON.stringify(e));
   this.trace(id,'mock-source',{strategy,failure:batch.failure,newEvidence,network_calls:0});
   const historical=this.list(caseId).find(x=>x.id!==id&&x.result)?.result??undefined;
   const priorStage=r.step>0?buildResult(runtime,before,{stop:'stage',calls:r.step,failures:r.failures,prior:historical,complete:false}):historical;
   const delta=buildResult(runtime,all,{stop:'stage',calls:r.step+1,failures:r.failures+Number(batch.failure),prior:priorStage,complete:false}).material_changes;
   this.trace(id,'stage-material-delta',{stage:r.step+1,candidate_changes:delta,requires_dependent_revalidation:delta.length>0});this.repo.db.exec('COMMIT');}catch(e){this.repo.db.exec('ROLLBACK');throw e;}return;
  }
  this.trace(id,'research-stop',{reason:r.step>=LIMITS.maxToolCalls?'tool-cap':'no-useful-progress',completed_strategies:attempts.length});
  if(r.model_requests>=1){if(this.controllers.has(id))return;this.finish(r,'model-already-attempted',false);return;}
  this.repo.db.prepare('UPDATE a1_runs SET model_requests=1 WHERE id=?').run(id);this.trace(id,'mock-provider-attempt',{request:1,prompt_version:PROMPT_VERSION,paid_calls:0});
  const controller=new AbortController();this.controllers.set(id,controller);
  const billing=this.provider.capabilities.billing==='mock-zero'?'mock-zero':'uncertain';
  this.repo.db.prepare('UPDATE a1_runs SET cost_status=? WHERE id=?').run(billing,id);
  const context={stop:'completed',calls:r.step,failures:r.failures,prior:this.list(caseId).find(x=>x.id!==id&&x.result)?.result??undefined,complete:true};
  let timer:ReturnType<typeof setTimeout>|undefined;
  try{
   const selectedProvider=r.scenario==='malformed'?{capabilities:{name:'malformed mock',live:false},respond:async()=>({run_id:id,unexpected:true})}:this.provider;
   const validated=await Promise.race([invokeMock(selectedProvider,runtime,deduplicate(JSON.parse(r.candidates)),controller.signal,context),new Promise<never>((_,reject)=>{controller.signal.addEventListener('abort',()=>reject(new ProviderError('STOPPED')),{once:true});timer=setTimeout(()=>{reject(new ProviderError('timeout'));controller.abort();},Math.max(1,runtime.run_limits.deadlineMs-(Date.parse(this.clock())-Date.parse(r.created_at))));})]);
   r=this.run(caseId,id);if(r.status!=='running')return;if(!this.current(r)){this.finish(r,'preferences-changed',false);return;}this.finish(r,'completed',true,validated);
  }catch(e){r=this.run(caseId,id);if(r.status==='running')this.finish(r,e instanceof ProviderError?e.code:'PROVIDER_FAILED',false);}
  finally{if(timer)clearTimeout(timer);this.controllers.delete(id);}

 }
 stop(caseId:string,id:string){const r=this.run(caseId,id);if(r.status==='running'||r.status==='interrupted'){this.controllers.get(id)?.abort();this.trace(id,'stop-requested',{abort_sent:this.controllers.has(id),cost_status:r.cost_status});this.finish(r,'stopped',false);}}
 resume(caseId:string,id:string){const r=this.run(caseId,id);if(r.status!=='interrupted')throw Error('Manual resume applies only to interrupted runs');if(!this.current(r))throw Error('Preferences changed; start a new reviewed run');if(r.model_requests){this.finish(r,'model-already-attempted',false);return;}if(this.repo.db.prepare("SELECT id FROM a1_runs WHERE status='running'").get())throw Error('Another run is active');this.repo.db.prepare("UPDATE a1_runs SET status='running',owner_runtime=?,updated_at=?,error_code=NULL WHERE id=?").run(this.repo.runtimeId,this.clock(),id);this.trace(id,'manually-resumed',{completed_steps_retained:r.step});}
 confirmMemory(caseId:string,input:{field:string;value:unknown;expectedVersion:number;confirmed:boolean;provenance:string},op:string){
  if(!input.confirmed||input.provenance!=='Mia explicit confirmation'||!['unitType','moveInDate','moveInLatestDate'].includes(input.field))throw Error('Confirmed authorized correction and provenance required');const search=this.search(caseId);const saved=this.repo.saveRecord(caseId,'search-profile',{...search.data,[input.field]:input.value as string},op,search.id,input.expectedVersion);this.repo.db.prepare('INSERT OR IGNORE INTO a1_memory VALUES(?,?,?,?,?,?,?,?)').run(op,caseId,input.field,JSON.stringify(search.data[input.field]),JSON.stringify(input.value),input.provenance,saved.version,this.clock());return saved;
 }
 approveExpansion(caseId:string,id:string,expectedVersion:number,confirmed:boolean,operationId:string){const r=this.run(caseId,id),result=r.result?JSON.parse(r.result) as Result:null;const latest=this.repo.db.prepare('SELECT id FROM a1_runs WHERE case_id=? ORDER BY created_at DESC,rowid DESC LIMIT 1').get(caseId);if(!confirmed||latest?.id!==id||!this.current(r)||r.status!=='completed'||!result||result.simulated_PATH_counts.additional<1)throw Error('Review complete current synthetic counts and explicitly approve first');const search=this.search(caseId);if(search.version!==expectedVersion||search.data.pathWalkMaxMinutes!==5)throw Error('Preferences changed');return this.repo.saveRecord(caseId,'search-profile',{...search.data,pathWalkMaxMinutes:10},operationId,search.id,search.version);}
}
