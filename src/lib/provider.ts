export type SourceRef={documentId:string;version:number;page?:number;region?:[number,number,number,number];quote?:string};
export type EvidenceInput={kind:'text'|'pdf'|'image';source:SourceRef;text?:string;assetId?:string};
export type ModelRequest={agent:'A1'|'A2'|'A3';inputs:EvidenceInput[];signal:AbortSignal};
export type ModelResult={ok:true;mock:true;summary:string;sources:SourceRef[]}|{ok:false;code:'ABORTED'|'LIMIT'|'PROVIDER_ERROR';message:string};
export interface ModelProvider {readonly model:string;run(request:ModelRequest):Promise<ModelResult>}
export const providerConfig={model:'gpt-6-astra',mode:'mock',paidTransportEnabled:false} as const;
export class MockAstraProvider implements ModelProvider {
 readonly model=providerConfig.model;
 async run(r:ModelRequest):Promise<ModelResult>{if(r.signal.aborted)return {ok:false,code:'ABORTED',message:'Stopped by user.'};return {ok:true,mock:true,summary:`${r.agent} placeholder only. No research, extraction or writing performed.`,sources:r.inputs.map(i=>i.source)};}
}
// A deterministic hook, not a supervisor. No retry, networking or tool execution.
export async function boundedRun(provider:ModelProvider,request:ModelRequest,budget:{remainingCalls:number;timeoutMs:number}):Promise<ModelResult>{
 if(budget.remainingCalls<1||budget.timeoutMs<=0)return {ok:false,code:'LIMIT',message:'Execution limit reached.'};
 budget.remainingCalls--;
 const controller=new AbortController();const abort=()=>controller.abort();request.signal.addEventListener('abort',abort,{once:true});if(request.signal.aborted)abort();
 let timer:ReturnType<typeof setTimeout>|undefined;
 try{return await Promise.race([provider.run({...request,signal:controller.signal}),new Promise<ModelResult>(resolve=>{timer=setTimeout(()=>{controller.abort();resolve({ok:false,code:'LIMIT',message:'Time limit reached.'});},budget.timeoutMs);})]);}catch{return {ok:false,code:'PROVIDER_ERROR',message:'Provider failed; no automatic retry.'};}finally{clearTimeout(timer);request.signal.removeEventListener('abort',abort);}
}
