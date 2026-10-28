import {spawn} from 'node:child_process';
import {createInterface} from 'node:readline';
import {resolve} from 'node:path';
import type {Packet,Source} from '../../case-agent/contracts.ts';
import {hash,object} from '../../case-agent/contracts.ts';
import {protocolVersion,serverInfo,tools} from '../../../scripts/evidence-mcp/contract.mjs';
export async function retrieve(packet:Packet,signal:AbortSignal):Promise<{sources:Source[];trace:string[];server:string;schemaHash:string}>{
 if(signal.aborted)throw Error('Cancelled');
 const child=spawn(process.execPath,[resolve(process.cwd(),'scripts/evidence-mcp/server.mjs')],{env:{NODE_ENV:"production",MIA_EVIDENCE_BUNDLE:JSON.stringify({caseId:packet.caseId,purpose:packet.purpose,sources:packet.sources})},stdio:['pipe','pipe','pipe']});
 const lines=createInterface({input:child.stdout});let seq=0;const trace:string[]=[];
 const pending=new Map<number,{resolve:(x:unknown)=>void;reject:(e:Error)=>void}>();
 const fail=()=>{for(const p of pending.values())p.reject(Error('Evidence transport stopped'));pending.clear();child.kill();};
 child.on('error',fail);child.on('exit',()=>{for(const p of pending.values())p.reject(Error('Evidence process exited'));pending.clear();});
 lines.on('line',line=>{try{if(line.length>200000)throw Error();const m=JSON.parse(line);const p=pending.get(m.id);if(!p)return;pending.delete(m.id);if(m.error)p.reject(Error('Scoped evidence rejected'));else p.resolve(m.result);}catch{fail();}});
 const call=(method:string,params:unknown)=>new Promise<unknown>((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});trace.push(method);child.stdin.write(JSON.stringify({jsonrpc:'2.0',id,method,params})+'\n');});
 const timer=setTimeout(fail,5000);signal.addEventListener('abort',fail,{once:true});
 try{const hello=object(await call('initialize',{protocolVersion,capabilities:{},clientInfo:{name:'mia-case-client',version:'1'}}),['protocolVersion','serverInfo','capabilities']);if(hello.protocolVersion!==protocolVersion||hash(hello.serverInfo)!==hash(serverInfo))throw Error('Unreviewed server identity');child.stdin.write(JSON.stringify({jsonrpc:'2.0',method:'notifications/initialized'})+'\n');trace.push('notifications/initialized');const list=object(await call('tools/list',{}),['tools']);if(hash(list.tools)!==hash(tools))throw Error('Unreviewed evidence tools');const result=object(await call('tools/call',{name:'search_evidence',arguments:{query:'',limit:5}}),['content','isError']);const content=result.content as {type:string;text:string}[];if(result.isError||!Array.isArray(content)||content.length!==1||content[0].type!=='text')throw Error('Invalid evidence envelope');const value=object(JSON.parse(content[0].text),['caseId','purpose','sources']);if(value.caseId!==packet.caseId||value.purpose!==packet.purpose||!Array.isArray(value.sources))throw Error('Evidence scope mismatch');for(const source of value.sources){if(!packet.sources.some(s=>hash(s)===hash(source)))throw Error('Unrecognized evidence');}
 if(value.sources.length){const read=await call('tools/call',{name:'read_evidence',arguments:{sourceId:(value.sources[0] as Source).id}});if(!read)throw Error('Read failed');}
 return {sources:value.sources as Source[],trace,server:serverInfo.name+'@'+serverInfo.version,schemaHash:hash(tools)};
 }finally{clearTimeout(timer);signal.removeEventListener('abort',fail);child.stdin.end();child.kill();lines.close();}
}
