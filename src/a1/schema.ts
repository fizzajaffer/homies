import type {Result} from './contracts.ts';
type Check=(v:unknown)=>boolean;
const str:Check=v=>typeof v==='string';
const num:Check=v=>typeof v==='number'&&Number.isFinite(v);
const bool:Check=v=>typeof v==='boolean';
const nullable=(c:Check):Check=>v=>v===null||c(v);
const array=(c:Check):Check=>v=>Array.isArray(v)&&v.every(c);
const literal=(...values:unknown[]):Check=>v=>values.includes(v);
const object=(fields:Record<string,Check>,optional:Record<string,Check>={}):Check=>v=>{
 if(!v||typeof v!=='object'||Array.isArray(v))return false;
 const r=v as Record<string,unknown>;
 return Object.keys(r).every(k=>k in fields||k in optional)&&Object.entries(fields).every(([k,c])=>Object.hasOwn(r,k)&&c(r[k]))&&Object.entries(optional).every(([k,c])=>!Object.hasOwn(r,k)||c(r[k]));
};
const strings=array(str), ns=nullable(str), nn=nullable(num);
const evidence=object({evidence_id:str,source_url:str,retrieved_at:str,published_at:ns,supported_claim:str,field:str,value:v=>v===null||str(v)||num(v)||bool(v),verified:bool,conflict:bool,stale:bool},{origin_evidence_id:str,checked_in_run_id:ns});
const candidate=object({candidate_id:str,property:str,unit:str,real_or_synthetic:literal('real','synthetic'),evidence:array(evidence),utilities:ns,one_off:nn,refundable:nn,concession:ns,review:nullable(object({text:str,published_at:ns}))},{untrusted_text:str});
const filter=object({status:literal('pass','fail','unknown'),evidence_ids:strings,reason:str});
const filters=object(Object.fromEntries(['zip','unitType','heating','cooling','dishwasher','stovetop','hotWater','coldWater','privateBath','staffed24h','basePriceBasis','base','mandatoryFees','total','availableDate','pathRoute','pathMethod','pathMinutes'].map(k=>[k,filter])));
const assessed=object({candidate,filters,status:literal('eligible','needs_confirmation','near_match'),baseDiscovery:nn,costWarnings:strings,total:nn,preferred_price:bool,preferred_move:bool,walk:nn,rank_reason:str,facts:strings,inferences:strings,unknowns:strings,prior_status:ns});
const count:Check=v=>num(v)&&Number.isInteger(v)&&Number(v)>=0;
const counts=object({before:count,after:count,additional:count,inspected_set_date:str,coverage:str});
const handoff=object({findings_version:count,candidate_id:str,evidence_ids:strings,limitations:strings,mode:literal('preparation_only','consented_simulation'),selection_reference:ns,exact_action:ns,consent_reference:ns,simulation_flag:bool,external_actions:literal(false),valid:bool});
const result=object({run_id:str,as_of:str,prompt_version:str,constraints_version:count,findings_version:count,readiness:object({prep_start:ns,within_preparation_window:bool,on_demand_available:literal(true)}),summary:str,outcome:literal('findings','no_verified_match','source_failure','partial','needs_input'),stop_reason:str,coverage_limits:strings,questions:strings,strong_matches:array(assessed),needs_confirmation:array(assessed),near_matches:array(assessed),synthetic:array(assessed),opportunity_ledger:array(assessed),material_changes:strings,PATH_tradeoff_counts:counts,simulated_PATH_counts:counts,A2_handoff:object({findings_version:count,prior_version:count,material_deltas:strings,batched_notes:strings,evidence_ids:strings}),A3_handoffs:array(handoff),memory_proposals:v=>Array.isArray(v)&&v.length===0});
/** Independent runtime structure; no engine, fixture or answer-key dependency. */
export function parseResult(value:unknown):Result {if(!result(value))throw Error('OUTPUT_SCHEMA_INVALID');return structuredClone(value as Result);}
