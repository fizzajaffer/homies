import type {FoundationRepository} from '../repository.ts';
import {A3Service} from '../a3/service.ts';
import {hash,type Capability,type Packet,type Source} from '../../case-agent/contracts.ts';
export function context(repo:FoundationRepository,caseId:string,capability:Capability,propertyId:string|null):Packet{
 if(!repo.listCases().some(c=>c.id===caseId))throw Error('Case not found');
 const records=repo.records(caseId),profile=records.find(r=>r.group==='search-profile')!;
 const source=(id:string,text:string,version:number):Source=>({id,version,text,page:'Synthetic fixture; no real document extraction',date:null,url:null,authority:'synthetic_unverified',untrusted:true,hash:hash([id,text,version])});
 if(capability==='coordination'){if(!propertyId)throw Error('Select property first');const p=new A3Service(repo).get(caseId,propertyId);return {caseId,capability,purpose:'selected-property-only',recordVersions:[[p.id,p.version]],facts:{propertyId:p.id,name:p.name,recipient:p.recipient,consent:p.consent,costs:p.costs,appointment:p.appointment},sources:[source('selection:'+p.id,'Synthetic selected property; unknown fees remain unknown.',p.version)]};}
 const housing=records.find(r=>r.group==='housing-case')!;
 const selected=capability==='research'?[profile]:[profile,housing];
 const p:Packet={caseId,capability,purpose:capability==='research'?'market-synthetic':'internal-negotiation',recordVersions:selected.map(r=>[r.id,r.version]),facts:capability==='research'?profile.data:{housing:housing.data},sources:[source(capability==='research'?'market-policy':'lease-facts',capability==='research'?'Synthetic research fixture. Regular advertised base only; no real market evidence.':'Synthetic lease terms; no verified legal conclusion.',selected.at(-1)!.version)]};
 if(capability==='negotiation'){const f=records.find(r=>r.group==='private-finance')!;p.privateEconomics={targetBase:f.data.targetBase,ceiling:f.data.rentAndFeesCeiling};p.recordVersions.push([f.id,f.version]);}
 return p;
}
// Only explicitly selected, prevalidated public clauses enter the drafting seam.
export {parseOutgoing as outbound} from '../../case-agent/outgoing.ts';
