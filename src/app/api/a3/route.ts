import {NextRequest,NextResponse} from 'next/server';
import {repository} from '../../../server/runtime';import {A3Service} from '../../../server/a3/service';import {A1Service} from '../../../server/a1/service';import type {Claim} from '../../../a3/contracts';
export const runtime='nodejs';export const dynamic='force-dynamic';
function guard(r:NextRequest,write=false){const host=r.headers.get('host')??'';if(!/^(127\.0\.0\.1|localhost)(:\d+)?$/.test(host))throw Error('Local only');if(write&&(!r.headers.get('origin')||new URL(r.headers.get('origin')!).host!==host||!r.headers.get('content-type')?.startsWith('application/json')))throw Error('Same-origin JSON required');}
function view(caseId:string){const repo=repository(),s=new A3Service(repo),a1=new A1Service(repo).list(caseId).find(r=>r.valid);return {caseId,cases:repo.listCases(),preferences:s.preferences(caseId),questions:s.preferenceQuestions(caseId),options:a1?{runId:a1.id,candidates:a1.result!.synthetic.filter(c=>c.walk===null||c.walk<=10).map(c=>({id:c.candidate.candidate_id,name:c.candidate.property,status:c.status}))}:null,properties:s.list(caseId).map(p=>s.report(caseId,p.id)),cost:0,mode:'simulation'};}
export async function GET(r:NextRequest){try{guard(r);return NextResponse.json(view(r.nextUrl.searchParams.get('case')||String(repository().bootstrap().id)),{headers:{'Cache-Control':'no-store'}});}catch(e){return NextResponse.json({error:String(e)},{status:400});}}
export async function POST(r:NextRequest){try{guard(r,true);const text=await r.text();if(text.length>15000)throw Error('Request too large');const b=JSON.parse(text),s=new A3Service(repository());const p=b.id?s.get(b.caseId,b.id):null;switch(b.action){
 case 'select':s.select(b.caseId,b.runId,b.candidateId);break;
 case 'consent':if(typeof b.yes!=='boolean')throw Error('Yes or no required');s.consent(b.caseId,b.id,b.yes,b.operationId,b.version);break;
 case 'preferences':s.savePreferences(b.caseId,b.preferences,b.expectedVersion,b.approved===true,b.operationId);break;
 case 'send':case 'followup':s.execute(b.caseId,b.id,b.proposal,b.operationId);break;
 case 'advance':s.advanceDemo(b.caseId,b.id,b.now,b.approved===true,b.operationId,b.version);break;
 case 'partial-costs':case 'conflict':case 'mia-call':{const at=new Date().toISOString(),source=b.operationId,origin=b.action==='mia-call'?'mia':'property';const claims:Claim[]=[{field:b.action==='mia-call'?'utilities':'base_rent',value:b.action==='mia-call'?null:b.action==='conflict'?2300:2200,currency:'USD',unit:'monthly',status:b.action==='mia-call'?'unknown':'known',conditions:null,source_ref:source,source_date:at,received_at:at,provenance:origin,conflict_group:null,record_version:0}];s.costs(b.caseId,b.id,claims,source,origin,'Explicit synthetic fixture reply; not a live property message.',b.operationId,b.version);break;}
 case 'request-viewing':s.appointment(b.caseId,b.id,b.start,b.end,false,null,b.operationId,b.version);break;
 case 'confirm-viewing':if(!p!.appointment)throw Error('Request a slot first');s.appointment(b.caseId,b.id,p!.appointment.start,p!.appointment.end,true,'sim-property:'+b.operationId,b.operationId,b.version);break;
 case 'cancel':s.cancel(b.caseId,b.id,b.operationId,b.version);break;
 case 'feedback':s.feedback(b.caseId,b.id,'Synthetic Mia report: the viewing was bright; noise needs a second check.',b.operationId,b.version);break;
 case 'property-unresolved':case 'mia-unresolved':s.clarifyFailed(b.caseId,b.id,b.action==='property-unresolved'?'property':'mia',b.operationId,b.version);break;
 case 'research-record':s.research(b.caseId,b.id,['utilities','application_fee'],b.operationId,b.version);break;
 case 'review-boundary':s.dispatch(b.caseId,true);break;
 default:throw Error('Unsupported A3 action');}
 s.dispatch(b.caseId);return NextResponse.json(view(b.caseId),{headers:{'Cache-Control':'no-store'}});
 }catch(e){return NextResponse.json({error:e instanceof Error?e.message:'A3 blocked'},{status:400});}}
