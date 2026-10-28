import {object,integer,text,hash} from './contracts.ts';
export type Outgoing={purpose:'outbound-drafting';kind:'negotiation'|'coordination';template:string;evidence:{id:string;version:number}[];disclosures:string[]};
const permitted=['requested_terms','confirmed_concerns','synthetic_name','selected_property','approved_viewing_windows'];
export function parseOutgoing(raw:unknown):Outgoing{
 const o=object(raw,['purpose','kind','template','evidence','disclosures']);
 if(o.purpose!=='outbound-drafting'||!['negotiation','coordination'].includes(String(o.kind))||typeof o.template!=='string'||!o.template.length||o.template.length>12000||!Array.isArray(o.evidence)||!o.evidence.length||!Array.isArray(o.disclosures)||!o.disclosures.length)throw Error('Invalid outgoing contract');
 const evidence=o.evidence.map(raw=>{const e=object(raw,['id','version']);return {id:text(e.id),version:integer(e.version)};});
 const allowed=o.kind==='negotiation'?permitted.slice(0,2):permitted.slice(2);
 const disclosures=o.disclosures.map(x=>{if(typeof x!=='string'||!allowed.includes(x))throw Error('Disclosure denied');return x;});
 return {purpose:'outbound-drafting',kind:o.kind as Outgoing['kind'],template:o.template,evidence,disclosures};
}
export function validateOutgoingResult(raw:unknown,input:Outgoing):string{
 const o=object(raw,['text','evidence','disclosures']);
 if(o.text!==input.template||hash(o.evidence)!==hash(input.evidence)||hash(o.disclosures)!==hash(input.disclosures))throw Error('Unapproved outgoing content or references');
 return String(o.text);
}
