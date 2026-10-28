import {NextRequest,NextResponse} from 'next/server';
import {repository} from '../../../server/runtime';
import {safeFilename} from '../../../server/repository';
export const runtime='nodejs';export const dynamic='force-dynamic';
function localOnly(request:NextRequest,write=false){const host=request.headers.get('host')??'';if(!/^(127\.0\.0\.1|localhost)(:\d+)?$/.test(host))throw Error('Local access only');const origin=request.headers.get('origin');if(write&&(!origin||new URL(origin).host!==host))throw Error('Same-origin request required');if(write&&!request.headers.get('content-type')?.startsWith('application/json'))throw Error('JSON required');}
function snapshot(caseId?:string){const repo=repository();const first=repo.bootstrap();const selected=caseId||String(first.id);return {cases:repo.listCases(),case:repo.view(selected),storage:'Durable local SQLite and private documents; no cloud sync or multi-user authentication.'};}
export async function GET(request:NextRequest){try{localOnly(request);const repo=repository();const id=request.nextUrl.searchParams.get('case')??undefined;const document=request.nextUrl.searchParams.get('document');const backup=request.nextUrl.searchParams.get('backup');const record=request.nextUrl.searchParams.get('history');if(backup)return new Response(new Uint8Array(repo.backupFile(backup)),{headers:{'Content-Type':'application/x-tar','Content-Disposition':`attachment; filename="${safeFilename(backup)}.tar"`,'Cache-Control':'no-store'}});if(document&&id){const d=repo.readDocument(id,document);return new Response(new Uint8Array(d.bytes),{headers:{'Content-Type':'text/plain','Content-Disposition':`attachment; filename="${safeFilename(d.name)}"`,'Cache-Control':'no-store'}});}if(record&&id)return NextResponse.json({history:repo.history(id,record)},{headers:{'Cache-Control':'no-store'}});return NextResponse.json(snapshot(id),{headers:{'Cache-Control':'no-store'}});}catch(e){return NextResponse.json({error:e instanceof Error?e.message:'Read failed'},{status:400});}}
export async function POST(request:NextRequest){try{localOnly(request,true);const body=await request.text();if(body.length>20000)throw Error('Request too large');const input=JSON.parse(body);const repo=repository();let id=input.caseId as string;let extra={};
 switch(input.action){
  case 'fresh-case':id=String(repo.createCase(input.operationId).id);break;
  case 'save-search':{const prior=repo.record(id,input.recordId);if(prior.data.pathWalkMaxMinutes!==input.data.pathWalkMaxMinutes)throw Error('Use the A1 reviewed-count approval to expand PATH');}repo.saveRecord(id,'search-profile',input.data,input.operationId,input.recordId,input.expectedVersion);break;
  case 'add-synthetic-document':repo.addSyntheticDocument(id,input.operationId);break;
  case 'start-storage-run':repo.startRun(id,input.operationId);break;
  case 'checkpoint':repo.checkpoint(id,input.runId,input.operationId,'storage-checkpoint',false);break;
  case 'complete-storage-run':repo.checkpoint(id,input.runId,input.operationId,'storage-checkpoint',true);break;
  case 'resume-storage-run':repo.resumeRun(id,input.runId,input.operationId);break;
  case 'backup':{const b=repo.backup(input.operationId);extra={backup:{id:b.id,documents:b.documents}};break;}
  default:throw Error('Action is outside the approved foundation scope');
 }
 return NextResponse.json({...snapshot(id),...extra},{headers:{'Cache-Control':'no-store'}});
 }catch(e){return NextResponse.json({error:e instanceof Error?e.message:'Save failed. No change confirmed.'},{status:400});}}
