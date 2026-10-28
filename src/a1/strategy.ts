import type {Candidate,Runtime} from './contracts.ts';
import {assess} from './engine.ts';
export type Strategy={kind:'discovery'|'fallback'|'verify-unknowns'|'alternate-query';zip:string|null;reason:string};
export type Attempt={strategy:Strategy;failure:boolean;newEvidence:number};
export function nextStrategy(r:Runtime,candidates:Candidate[],attempts:Attempt[]):Strategy|null{
 if(attempts.length>=r.run_limits.maxToolCalls)return null;
 const last=attempts.at(-1);
 if(last?.strategy.kind==='alternate-query'&&last.newEvidence===0)return null;
 if(last?.failure&&!attempts.some(a=>a.strategy.kind==='fallback'&&a.strategy.zip===last.strategy.zip))return {kind:'fallback',zip:last.strategy.zip,reason:'Source failed; try a permitted alternate source once.'};
 const missing=r.preferences.searchPostalCodes.find(zip=>!attempts.some(a=>a.strategy.kind==='discovery'&&a.strategy.zip===zip));
 if(missing)return {kind:'discovery',zip:missing,reason:'Inspect the other confirmed ZIP before asking about trade-offs.'};
 if(!attempts.some(a=>a.strategy.kind==='verify-unknowns'))return {kind:'verify-unknowns',zip:null,reason:candidates.some(c=>assess(c,r).status==='needs_confirmation')?'Recheck promising unresolved facts.':'Recheck current unit price and availability before final review.'};
 if(!attempts.some(a=>a.strategy.kind==='alternate-query'))return {kind:'alternate-query',zip:null,reason:'Try one useful permitted query variation.'};
 return null;
}
