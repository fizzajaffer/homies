// Allowlisted local stdio MCP. No filesystem, network or mutation tools.
import {createInterface} from 'node:readline';
import {protocolVersion,serverInfo,tools,check} from './contract.mjs';
const bundle=JSON.parse(process.env.MIA_EVIDENCE_BUNDLE??'{}');
if(!bundle.caseId||!Array.isArray(bundle.sources)||bundle.sources.length>20)process.exit(1);
let initialized=false,ready=false;
const lines=createInterface({input:process.stdin});
lines.on('line',line=>{if(line.length>20000)return;let q;try{q=JSON.parse(line);if(q.jsonrpc!=='2.0')throw Error('Invalid protocol');if(q.method==='notifications/initialized'){if(initialized)ready=true;return;}let result;
if(q.method==='initialize'){if(q.params?.protocolVersion!==protocolVersion)throw Error('Unsupported protocol');initialized=true;result={protocolVersion,serverInfo,capabilities:{tools:{listChanged:false}}};}
else if(!ready)throw Error('Initialize first');
else if(q.method==='tools/list')result={tools};
else if(q.method==='tools/call'){const {name,arguments:args}=q.params??{};check(name,args);const sources=name==='read_evidence'?bundle.sources.filter(s=>s.id===args.sourceId):bundle.sources.filter(s=>(s.text+' '+s.id).toLowerCase().includes(args.query.toLowerCase())).slice(0,args.limit);if(name==='read_evidence'&&!sources.length)throw Error('Source outside approved scope');result={content:[{type:'text',text:JSON.stringify({caseId:bundle.caseId,purpose:bundle.purpose,sources})}],isError:false};}
else if(q.method==='ping')result={};else throw Error('Method not allowed');
process.stdout.write(JSON.stringify({jsonrpc:'2.0',id:q.id,result})+'\n');
}catch{if(q?.id!==undefined)process.stdout.write(JSON.stringify({jsonrpc:'2.0',id:q.id,error:{code:-32602,message:'Scoped evidence request rejected'}})+'\n');}});
