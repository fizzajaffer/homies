import type {FoundationRepository} from '../repository.ts';
import {A2Service} from '../a2/service.ts';
import {calculate} from '../../a2/math.ts';
import {hash} from '../../case-agent/contracts.ts';
export function correctAmenity(repo:FoundationRepository,caseId:string,fee:number,expected:number,op:string,confirmed:boolean){
 if(!confirmed||!Number.isFinite(fee)||fee<0||fee>10000||!/^[\w:-]{8,160}$/.test(op))throw Error('Explicit valid fee confirmation required');
 const old=repo.db.prepare('SELECT data FROM case_agent_corrections WHERE id=? AND case_id=?').get(op,caseId);if(old){const data=JSON.parse(String(old.data));if(data.after!==fee||data.beforeVersion!==expected)throw Error('Correction operation conflict');return data;}
 const record=repo.records(caseId).find(r=>r.group==='housing-case')!;const history=repo.history(caseId,record.id) as {version:number;data:Record<string,unknown>}[];const before=history.find(h=>h.version===expected);if(!before)throw Error('Unknown prior version');
 // Repository operation fingerprint and CAS own the versioned mutation and approval invalidation.
 const saved=repo.saveRecord(caseId,'housing-case',{...before.data,renewalFee:fee},op,record.id,expected);
 const a2=new A2Service(repo),runtime=a2.runtime(caseId,'correction:'+op,'uncertainty');
 const calc=calculate(runtime.currentTerms,runtime.offerTerms,runtime.offerTerms,runtime.targetBase,runtime.hardCeiling,runtime.netBiweekly,runtime.paychecks,runtime.energyPeakWinter,runtime.waterSewer,runtime.internet);
 const data={type:'factual',field:'renewalFee',before:before.data.renewalFee,after:fee,beforeVersion:expected,afterVersion:saved.version,source:'Mia explicit synthetic fact confirmation',actor:'local-user',at:new Date().toISOString(),delta:fee-Number(before.data.renewalFee),calculation:calc,reason:'Corrected amenity changes the rent package; review affected drafts. Additional costs remain separate; this is not complete affordability.',invalidDrafts:a2.view(caseId).drafts.filter(d=>!d.valid&&!d.sent).map(d=>d.id),sentHistoryHash:hash(a2.get(caseId).drafts.filter(d=>d.sent).map(d=>d.sent))};
 repo.db.prepare('INSERT INTO case_agent_corrections VALUES(?,?,?,?,?,?)').run(op,caseId,record.id,expected,saved.version,JSON.stringify(data));return data;
}
