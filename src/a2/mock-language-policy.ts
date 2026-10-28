// Independent allowlist for this synthetic checkpoint. This is deliberately not
// a general natural-language truth validator and does not certify model writing.
const allowedLines=new Set([
'Renewal terms for review',
'I am requesting revised terms for the proposed 12-month renewal.',
'Documented concerns',
'• Water recurrence continued over six months and was resolved before the proposed stay. This supports a factual discussion of the documented inconvenience.',
'• The previously raised amenity concern also warrants a response.',
'Requested terms',
'Please offer $2,200 monthly base rent, waive the $45 amenity charge, and retain the separately itemized $12 trash charge. Please confirm the revised itemized terms.',
'Renewal terms — follow-up',
'Thank you for the revised proposal.',
'• Please confirm your response to the documented, resolved water recurrence.',
'• Please address the previously raised amenity concern.',
'Please revise the 12-month renewal to $2,200 monthly base rent, waive the $45 amenity charge, and retain the separately itemized $12 trash charge. Please address the amenity concern in your response.'
]);
const normalized=(line:string)=>line.replace(/\$\d[\d,]*(?:\.\d+)?/g,'<MONEY>').replace(/\d+-month/g,'<MONTHS>');
export function validateMockLanguage(text:string,r:Runtime,o:Output){validateBindings(text,r,o);const permitted=new Set([...allowedLines].map(normalized));if(!text.trim()||text.split('\n').map(s=>s.trim()).filter(Boolean).some(line=>!permitted.has(normalized(line))))throw Error('Unsupported outgoing language: this checkpoint permits reviewed synthetic clauses only');}

import type {Runtime,Output} from './contracts.ts';
const clauseSources={water_resolved_six_months:{id:'mock-water',text:'Water recurrence over six months; resolved before stay. Severity and legal applicability not established.'},amenity_concern:{id:'mock-amenity',text:'An amenity concern was raised. No claim of a legal violation or specific unprovided defect.'}} as const;
export function validatePrivateRecommendation(o:Output,r:Runtime){
 const blocked=!r.confirmed||r.evidence.some(e=>(e.source_type==='mock_extraction'&&e.confirmation_status!=='confirmed')||e.conflicts.length),uncertain=r.trigger==='uncertainty'||r.a3.some(a=>a.conflicts.length);
 const code=r.legal.risk?'legal':blocked?'confirmation':r.decision?'decision':uncertain?'uncertainty':r.reply?'counter':'opening';
 const messages={legal:'Pause the affected recommendation and obtain qualified legal review. We can organize the factual timeline; no legal claim or automatic action is proposed.',confirmation:'Please confirm the action-critical mocked extraction or resolve its conflict before reviewing a draft.',decision:'Your decision is recorded. No notice or signature has been sent. Negotiation is stopped.',uncertainty:'Hold the affected comparison: costs or evidence remain unresolved. Request only the missing facts; no alternative is treated as confirmed.',opening:'Review the opening request and its factual support. This is mocked writing, not evaluated Astra output. You choose whether to approve and send it.'};
 const expected=code==='counter'?`The rent-plus-amenity proposal is ${r.reply!.terms.base+r.reply!.terms.amenity<=r.hardCeiling?'within':'above'} your primary ceiling. Base and other charges remain separate. Water acknowledgment: ${r.reply!.waterAcknowledged?'yes':'not confirmed'}; amenity addressed: ${r.reply!.amenityAddressed?'yes':'no'}. Review observable terms and unresolved costs; this is not complete affordability or an outcome guarantee.`:messages[code];
 const action=code==='legal'?'escalate':code==='decision'?'respect_decision':['confirmation','uncertainty'].includes(code)?'hold':'review';
 if(o.private_recommendation.decision_code!==code||o.private_recommendation.action!==action||o.private_recommendation.summary!==expected||o.private_recommendation.claims.length)throw Error('Unsupported private recommendation: reviewed decision code and current inputs required');
 const expectedStatus=code==='legal'||code==='decision'?'paused':code==='confirmation'?'needs_confirmation':code==='uncertainty'?'waiting_for_evidence':'ready_for_review';
 const unresolved=[...(!r.confirmed?['mocked extraction confirmation']:[]),...r.a3.flatMap(a=>a.unknowns),...(r.sentWordingUnknown?['actual externally sent wording']:[])];
 if(JSON.stringify(o.unresolved_fields)!==JSON.stringify(unresolved)||JSON.stringify(o.material_change_flags)!==JSON.stringify(r.materialRevision?['Material incoming evidence requires review']:[])||JSON.stringify(o.progress_assessment.unresolved_concerns)!==JSON.stringify(r.reply&&!r.reply.amenityAddressed?['Amenity concern unaddressed']:[]))throw Error('Unsupported private field or concern');
 if(o.status!==expectedStatus||(['legal','decision','confirmation','uncertainty'].includes(code)&&o.outgoing_draft))throw Error('Decision status/action mismatch');
 if(o.progress_assessment.rationale!=='Observable terms and current evidence, not tone or probability.')throw Error('Unsupported private rationale');
 const direction=!r.reply?'unclear':r.reply.terms.base+r.reply.terms.amenity<r.offerTerms.base+r.offerTerms.amenity?'improving':r.reply.terms.base+r.reply.terms.amenity>r.offerTerms.base+r.offerTerms.amenity?'worsening':'stalled';
 const changes=r.reply?[`Base changed from ${r.offerTerms.base} to ${r.reply.terms.base}; amenity from ${r.offerTerms.amenity} to ${r.reply.terms.amenity}.`]:[];
 if(o.progress_assessment.direction!==direction||o.progress_assessment.fee_concessions!==(r.reply?r.offerTerms.amenity-r.reply.terms.amenity:0)||JSON.stringify(o.progress_assessment.observable_changes)!==JSON.stringify(changes))throw Error('Unsupported progress assessment');
}
function validateBindings(text:string,r:Runtime,o:Output){
 if(!o.requested_terms||o.requested_terms.months!==r.offerTerms.months)throw Error('Current renewal term required');
 const matches=[...text.matchAll(/\$(\d[\d,]*(?:\.\d+)?)/g)].map(m=>Number(m[1].replaceAll(',','')));const months=[...text.matchAll(/(\d+)-month/g)].map(m=>Number(m[1]));
 if(matches.length!==3||matches[0]!==o.requested_terms.base||matches[1]!==r.offerTerms.amenity||matches[2]!==o.requested_terms.trash||!months.length||months.some(m=>m!==o.requested_terms!.months))throw Error('Draft body amounts or term contradict structured current terms');
 if(!text.includes(r.reply?'• Please confirm your response to the documented, resolved water recurrence.':'• Water recurrence continued over six months and was resolved before the proposed stay.')||!text.includes(r.reply?'• Please address the previously raised amenity concern.':'• The previously raised amenity concern also warrants a response.'))throw Error('Required supported concerns omitted');
 if(o.outgoing_draft!.claims.some(c=>c.kind!=='fact'||!c.source_ids.length))throw Error('Outgoing claim metadata must contain only source-bound facts');
 const bindings=o.outgoing_draft!.bindings;if(bindings.length!==2||new Set(bindings.map(b=>b.code)).size!==2)throw Error('Required typed clause bindings missing');
 for(const b of bindings){const expected=clauseSources[b.code],source=r.evidence.find(e=>e.source_id===b.source_id);if(!o.evidence_refs.includes(b.source_id)||b.source_id!==expected.id||!source||source.version!==b.source_version||source.confirmation_status!=='confirmed'||source.conflicts.length||source.text!==expected.text)throw Error('Draft clause not established by current confirmed source');}
}
