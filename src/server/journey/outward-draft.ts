import {hash} from '../../case-agent/contracts.ts';
import type {Evidence,Result} from '../../journey/contracts.ts';
export const OUTWARD_VERSION='outward-v1';
export type OutwardDraft={version:string;text:string;resultHash:string;dependency:string;sourceHashes:{id:string;hash:string}[];resolvedCitationIds:string[];posture:'baseline-supplicant'|'human-review-required';privacy:'no-listed-pattern-detected';limitations:string[];hash:string};
const marker=/\[([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}:[1-9]\d*)\]/gi;
/** Fail closed for known private values, including grouping/decimal/Unicode variants.
 * This is a bounded detector, not a comprehensive semantic privacy classifier. */
export function assertOutwardPrivacy(text:string){
 const normalized=text.normalize('NFKC').replace(/[\u200B-\u200D\u2060\uFEFF]/g,'');
 for(const digits of ['2265','2245','127000','5633']){
  const re=new RegExp('(?<![\\d])'+digits.split('').join('[,\\s.\u2019\u0027]*')+'(?:[.,]00)?(?![\\d])','u');
  if(re.test(normalized))throw Error('Detected private financial value; outward staging blocked');
 }
 if(/\b(?:salary|take[ -]?home|private (?:income|budget|ceiling|strategy)|my (?:income|budget|ceiling)|negotiation strategy)\b/i.test(normalized))throw Error('Detected private financial/strategy language; outward staging blocked');
}
export function stageOutward(result:Result,sources:Evidence[],dependency:string,moneyValues:number[],format=true):OutwardDraft{
 assertOutwardPrivacy(result.summary);
 const byId=new Map(sources.map(s=>[s.id,s]));
 if(byId.size!==sources.length)throw Error('Ambiguous source IDs');
 for(const id of result.evidence_ids)if(!byId.has(id))throw Error('Unresolved outward evidence reference');
 const resolvedCitationIds:string[]=[];
 let text=result.summary.replace(marker,(whole,id:string)=>{if(!byId.has(id)||!result.evidence_ids.includes(id))throw Error('Unresolved outward citation');resolvedCitationIds.push(id);return format?'':whole;});
 // A malformed bracketed UUID must not be silently stripped or presented as checked.
 if(/\[[^\]\n]*[0-9a-f]{8}-[^\]\n]*\]/i.test(text)&&format)throw Error('Malformed outward citation');
 const allowed=new Set(moneyValues.filter(n=>Number.isSafeInteger(n)&&n>=0));
 const amount='\\$?\\d[\\d,]*(?:\\.\\d{2})?';
 const render=(raw:string)=>{const value=Number(raw.replace(/[$,]/g,''));if(!allowed.has(value))throw Error('Unverified monetary span');return '$'+value.toLocaleString('en-US',{minimumFractionDigits:raw.includes('.')?2:0,maximumFractionDigits:2});};
 if(format){
  // Only explicitly monetary syntax; never dates, durations or all number occurrences.
  text=text.replace(new RegExp('(base rent(?: of)?\\s+)('+amount+')(?:([ ]+rather than[ ]+)('+amount+'))?','gi'),(_m,prefix:string,value:string,comparison:string|undefined,previous:string|undefined)=>prefix+render(value)+(comparison&&previous?comparison+render(previous):''));
  text=text.replace(new RegExp('('+amount+')(\\s+amenity fee)','gi'),(_m,value:string,suffix:string)=>render(value)+suffix);
  text=text.replace(/\$\d[\d,]*(?:\.\d{2})?/g,render);
 }
 assertOutwardPrivacy(text);
 const body={version:OUTWARD_VERSION,text,resultHash:hash(result),dependency,sourceHashes:sources.map(s=>({id:s.id,hash:hash(s)})).sort((a,b)=>a.id.localeCompare(b.id)),resolvedCitationIds:[...new Set(resolvedCitationIds)],posture:/would you consider/i.test(text)?'baseline-supplicant' as const:'human-review-required' as const,privacy:'no-listed-pattern-detected' as const,limitations:['Source reference resolution is not verification of every factual claim.','No comprehensive privacy or commercial-writing certification.','No commercial facts or legal leverage added.']};
 return {...body,hash:hash(body)};
}
