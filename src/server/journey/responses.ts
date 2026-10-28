import {readFileSync,statSync} from 'node:fs';
import type {Budget} from './budget.ts';
export const MODEL='gpt-6-astra';
function keyPath(){const path=process.env.TENANT_OPENAI_KEY_FILE;if(!path)throw Error('TENANT_OPENAI_KEY_FILE must be configured before live use');return path;}
export type Tool={name:string;description:string;parameters:Record<string,unknown>};
export type Request={instructions:string;input:unknown[];previous_response_id?:string;tools:Tool[];schema:Record<string,unknown>;inputBound:number;outputBound:number};
export type Reply={id:string;status:string;output:{type:string;name?:string;call_id?:string;arguments?:string;content?:{type:string;text?:string}[]}[];usage:{input_tokens:number;output_tokens:number;input_tokens_details?:{cached_tokens?:number;cache_write_tokens?:number}}};
export interface JourneyProvider{mode:'live'|'mock';model:string;respond(request:Request,signal:AbortSignal):Promise<Reply>;}
export function credentialReady(){const s=statSync(keyPath());if(!s.isFile()||s.size<20||s.size>1000||(s.mode&0o077)!==0)throw Error('Credential file is missing or insufficiently private');return {present:true,expiry:'Not exposed by key file; API access preflight required'};}
export class ResponsesProvider implements JourneyProvider{
 readonly mode='live';readonly model=MODEL;
 readonly budget:Budget;readonly grantId:string;readonly transport:typeof fetch;readonly key:()=>string;
 constructor(budget:Budget,grantId:string,transport:typeof fetch=fetch,key=()=>{credentialReady();return readFileSync(keyPath(),'utf8').trim();}){this.budget=budget;this.grantId=grantId;this.transport=transport;this.key=key;}
 async respond(r:Request,signal:AbortSignal):Promise<Reply>{if(signal.aborted)throw Error('Cancelled before request');const body=requestBody(r);
 // UTF-8 byte length is a conservative text-token bound. Continuation allowance is reserved separately.
 if(Buffer.byteLength(JSON.stringify(body),'utf8')+1024>r.inputBound)throw Error('Request envelope exceeds prepaid bound; no request sent');
 const key=this.key(),call=this.budget.reserve(this.grantId,r.inputBound,r.outputBound),started=Date.now();this.budget.dispatched(call);
 try{const result=await this.transport('https://api.openai.com/v1/responses',{method:'POST',headers:{authorization:'Bearer '+key,'content-type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.any([signal,AbortSignal.timeout(120000)])});if(!result.ok)throw Error('OPENAI_HTTP_'+result.status);const raw=await result.json() as Reply;if(!raw.id||!raw.usage||!Array.isArray(raw.output))throw Error('OPENAI_MALFORMED_RESPONSE');this.budget.settle(call,raw.usage,Date.now()-started,raw.id);if(raw.status!=='completed')throw Error('OPENAI_'+raw.status);return raw;}catch(e){this.budget.uncertain(call,e instanceof Error?e.message:'TRANSPORT_FAILURE');throw e;}
 }
}

export function requestBody(r:Request){return {model:MODEL,instructions:r.instructions,input:r.input,...(r.previous_response_id?{previous_response_id:r.previous_response_id}:{}),store:true,reasoning:{effort:'medium'},max_output_tokens:r.outputBound,parallel_tool_calls:false,tools:r.tools.map(t=>({type:'function',...t,strict:true})),text:{format:{type:'json_schema',name:'mia_journey_output',strict:true,schema:r.schema}}};}
