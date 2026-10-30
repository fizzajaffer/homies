import {DatabaseSync} from 'node:sqlite';
import {createHash} from 'node:crypto';
import {assess,type Preference} from './decision.ts';
import type {External,Landlord} from './tracks.ts';
import type {Result} from '../../journey/contracts.ts';
export const RECORDED_CASE='8050cf7d-496a-48b3-9d0d-c2101de28387';
const sha=(s:string)=>createHash('sha256').update(s).digest('hex');
type SourceVersion={id:string;hash:string;date:string|null};
type Benchmark={id:string;startedAt:string;originalRunId:string;inputHash:string;sourceVersions:SourceVersion[];prompt:{version:string};actual:Result;validation:string;status:string;matchingLimitations:string};
type Track={track:string;version:number;data:string;at:string};
type RecordRow={group_name:string;version:number;data:string;at:string};
export function readDesk(db:DatabaseSync,mode='active',caseId=RECORDED_CASE){
 if(!['active','initial','1','2','3'].includes(mode))throw Error('Unknown checkpoint');
 const c=db.prepare('SELECT id,label FROM cases WHERE id=?').get(caseId);if(!c)throw Error('Recorded Case 6 is not available in this database');
 const active=mode==='active',initial=mode==='initial';
 const benchmarkId=`adaptive-paired-${active?'3':mode}-v01`;
 const row=initial?null:db.prepare('SELECT data FROM adaptive_benchmarks WHERE id=?').get(benchmarkId);
 const bench=row?JSON.parse(String(row.data)) as Benchmark:null;
 const original=bench?db.prepare('SELECT data FROM journey_runs WHERE id=? AND case_id=?').get(bench.originalRunId,caseId):null;
 const cutoff=original?JSON.parse(String(original.data)).startedAt as string:null;
 // Historical preferences/initial terms come from the recorded versions at the original run.
 const history=db.prepare('SELECT group_name,version,data,at FROM record_history WHERE case_id=? ORDER BY version').all(caseId) as RecordRow[];
 const record=(group:string)=>{const rows=history.filter(r=>r.group_name===group&&(!cutoff||r.at<=cutoff));const r=initial?rows[0]:rows.at(-1);if(!r)throw Error('Missing recorded '+group);return JSON.parse(r.data);};
 const currentRows=db.prepare('SELECT group_name,version,data,updated_at AS at FROM records WHERE case_id=?').all(caseId) as RecordRow[];
 const current=(group:string)=>{const r=currentRows.find(r=>r.group_name===group);if(!r)throw Error('Missing current record');return JSON.parse(r.data);};
 const profile=(active?current('search-profile'):record('search-profile')) as Preference & {leaseExpiry:string};
 const housing=active?current('housing-case'):record('housing-case');const finance=record('private-finance');
 const tracks=db.prepare('SELECT track,version,data,at FROM journey_track_versions WHERE case_id=? ORDER BY version').all(caseId) as Track[];
 const selected:Track[]=[];let referencesMatch=!!bench;
 if(!initial){for(const id of ['stay','A','B']){const ref=bench?.sourceVersions.find(s=>s.id.startsWith(`property:${id}:v`));const targetVersion=ref?Number(ref.id.split(':v')[1]):null;const t=active?tracks.filter(t=>t.track==='property:'+id).at(-1):tracks.find(t=>t.track==='property:'+id&&t.version===targetVersion);if(t)selected.push(t);if(!t||!ref||sha(t.data)!==ref.hash)referencesMatch=false;}}
 // Bind every benchmark source hash; no recommendation is combined with changed evidence.
 for(const ref of bench?.sourceVersions??[]){if(ref.id.startsWith('property:'))continue;const colon=ref.id.lastIndexOf(':');const upload=db.prepare('SELECT text FROM journey_uploads WHERE case_id=? AND id=?').get(caseId,ref.id.slice(0,colon));const page=upload?JSON.parse(String(upload.text))[Number(ref.id.slice(colon+1))-1]:null;if(typeof page!=='string'||sha(page)!==ref.hash)referencesMatch=false;}
 const landlordTrack=initial?null:tracks.filter(t=>t.track==='landlord'&&(active||!cutoff||t.at<=cutoff)).at(-1);
 if(active&&cutoff){const savedLandlord=tracks.filter(t=>t.track==='landlord'&&t.at<=cutoff).at(-1);if(!savedLandlord||!landlordTrack||savedLandlord.data!==landlordTrack.data)referencesMatch=false;}
 const landlord=landlordTrack?JSON.parse(landlordTrack.data) as Landlord:null;
 if(bench&&landlord){const refs=new Set(bench.sourceVersions.map(s=>s.id));if(landlord.sourceIds.some(id=>!refs.has(id)))referencesMatch=false;}
 if(active&&cutoff){for(const group of ['search-profile','housing-case','private-finance'])if(JSON.stringify(current(group))!==JSON.stringify(record(group)))referencesMatch=false;}
 const base=initial?housing.renewalBase:landlord?.values.base??null,amenity=initial?housing.renewalFee:landlord?.values.amenity??null;
 const properties=selected.map(t=>({version:t.version,data:JSON.parse(t.data) as External}));const assessment=assess(profile,landlord,properties);
 const stateRow=db.prepare('SELECT version,data FROM journey_state WHERE case_id=?').get(caseId);const state=stateRow?{version:Number(stateRow.version),data:JSON.parse(String(stateRow.data))}:{version:0,data:{approval:null}};
 const drafts=active?db.prepare("SELECT data FROM journey_runs WHERE case_id=? AND status='completed'").all(caseId).map(r=>JSON.parse(String(r.data))).filter(r=>r.task==='draft').map(r=>({id:r.id,promptVersion:r.promptVersion,summary:r.result?.summary??'',review:r.review})):[];
 const artifactRow=db.prepare("SELECT data FROM adaptive_benchmarks WHERE id='adaptive-paired-4-v01'").get();
 const artifact=artifactRow?JSON.parse(String(artifactRow.data)):null;
 const artifactReview=artifactRow?db.prepare("SELECT verdict,comment FROM eval_reviews WHERE run_id='adaptive-paired-4-v01' AND kind='human' AND snapshot_hash=? ORDER BY rowid DESC LIMIT 1").get(sha(String(artifactRow.data))):null;
 const housingRow=currentRows.find(r=>r.group_name==='housing-case')!;
 return {caseId,label:String(c.label),mode,active,cutoff,profile:{areas:profile.searchPostalCodes,unit:profile.unitType,pathMax:profile.pathWalkMaxMinutes,staffed24:profile.staffedConciergeOrDoorman24HoursRequired,moveIn:profile.moveInDate,moveLatest:profile.moveInLatestDate,leaseExpiry:profile.leaseExpiry},
  terms:{base,amenity,months:landlord?.values.months??housing.termMonths,currentBase:housing.currentBase,currentFee:housing.currentFee,initialBase:housing.renewalBase,initialFee:housing.renewalFee,target:finance.targetBase,ceiling:finance.rentAndFeesCeiling},
  baselineA:(()=>{const t=tracks.find(t=>t.track==='property:A'&&t.version===1);if(!t)return null;const p=JSON.parse(t.data) as External;const c=p.costs;return {version:1,amenity:c.amenity,total:[c.base,c.amenity,c.otherMonthly,c.oneTime].some(x=>x===null)?null:(c.base!+c.amenity!+c.otherMonthly!)*12+c.oneTime!};})(),
  properties,options:assessment.options,landlordVersion:landlordTrack?.version??null,
  recommendation:bench&&referencesMatch?{id:bench.id,summary:bench.actual.summary,decision:bench.actual.decision,version:bench.prompt.version,validation:bench.validation,inputHash:bench.inputHash,sourceVersions:bench.sourceVersions,limitations:bench.matchingLimitations}:null,
  recommendationNote:initial?'No independent adaptive recommendation is recorded for the initial offer.':referencesMatch?'Saved independent adaptive output; not processing now.':'Saved recommendation withheld: source or preference versions no longer match. No new model run has been requested.',
  stateVersion:state.version,approval:state.data.approval,drafts,
  evaluationDraft:artifact?{id:artifact.id,summary:artifact.actual?.summary??'',originalRunId:artifact.originalRunId,promptVersion:artifact.prompt?.version,verdict:artifactReview?String(artifactReview.verdict):'Human review pending',comment:artifactReview?String(artifactReview.comment):'',snapshotHash:sha(String(artifactRow!.data))}:null,
  correction:{available:active,base:current('housing-case').renewalBase,version:housingRow.version,fee:current('housing-case').renewalFee,note:'The initial renewal record and latest landlord track differ. A renewal-fee edit here would target the initial record, so this control is unavailable.'},
  evidence:bench?.sourceVersions??[],provenance:'Recorded synthetic Case 6. Original Case 6 recommendations used prescribed choices; this desk leads the separately saved independent adaptive outputs. All history is immutable.'};
}
export type DeskView=ReturnType<typeof readDesk>;
