import type {A1Selection,A3Consent,A3Record} from './handoff.ts';
export const a3Key='tenant-demo.a3.v1';
export type A3Event={id:string;type:string;at:string;revision:number};
export type A3State={version:1;selection:A1Selection|null;consent:A3Consent|null;record:A3Record|null;events:A3Event[];message:string};
export type A3Command={id:string;currentRun:string;type:'select';selection:A1Selection}|{id:string;currentRun:string;type:'grant'|'revoke'|'ask-costs'|'base-reply'|'fee-reply'|'request-viewing'|'conflict'|'confirm-viewing';revision:number};
export function initialA3():A3State{return {version:1,selection:null,consent:null,record:null,events:[],message:'Select a synthetic shortlist option to begin.'};}
export function a3Transition(s:A3State,c:A3Command,paused=false):A3State{
 if(s.events.some(e=>e.id===c.id))return s;
 if(paused&&c.type!=='revoke')throw Error('Demo paused. No new action applied.');
 if(s.events.length>=40&&c.type!=='revoke')throw Error('Demo action limit reached. Reset or review history.');
 let n={...s};const at=new Date().toISOString();
 if(c.type==='select'){
  if(c.selection.researchRunId!==c.currentRun)throw Error('Selection is from an outdated research result.');
  n={...n,selection:c.selection,consent:s.consent?{...s.consent,revokedAt:at}:null,record:null,message:'Option selected. Separate scoped consent is required.'};
 }else{
  if(!s.selection)throw Error('Select an option first.');
  if(c.type==='revoke'){
   if(!s.consent||c.revision!==s.consent.revision)throw Error('Consent changed; review the current permission.');
   n.consent={...s.consent,revokedAt:at};n.message='Consent revoked. Past simulated actions remain in history; nothing is unsent or cancelled externally.';
  }else{
   if(s.selection.researchRunId!==c.currentRun)throw Error('A1 research changed. Reselect the current option and grant fresh consent.');
   if(c.type==='grant'){
    if(c.revision!==(s.consent?.revision??0))throw Error('Consent version changed.');
    const revision=c.revision+1;n.consent={schemaVersion:1,selection:s.selection,revision,allowedActions:['clarify-costs','request-viewing'],availabilityWindows:[{start:'2026-10-28T18:00:00-04:00',end:'2026-10-28T19:00:00-04:00'}],revokedAt:null,simulationOnly:true};
    n.record={schemaVersion:1,consentRevision:revision,listingId:s.selection.listingId,status:'awaiting-consent',base:null,recurringFees:null,nonRefundable:null,refundableDeposit:null,termMonths:null,quoteExpiresAt:null,sourceIds:[],appointment:null,simulationOnly:true};n.message='Consent saved for this selected fixture only. No real contact or calendar access.';
   }else{
    const consent=s.consent;const r=s.record;if(!consent||consent.revokedAt||consent.revision!==c.revision||!r||r.consentRevision!==c.revision||consent.selection.researchRunId!==s.selection.researchRunId||consent.selection.listingId!==s.selection.listingId)throw Error('Active consent for this selection and revision is required.');
    if(c.type==='ask-costs'){
     if(!consent.allowedActions.includes('clarify-costs')||r.status!=='awaiting-consent')throw Error('Cost request is not available in this state.');
     n.record={...r,status:'awaiting-reply'};n.message='Simulated question: Please confirm the 12-month base rent, recurring fees, utilities, upfront fees and refundable deposit. Nothing was sent.';
    }else if(c.type==='base-reply'){
     if(r.status!=='awaiting-reply'||r.base!==null)throw Error('No pending base-rent reply.');
     n.record={...r,base:2200,termMonths:12,sourceIds:[...r.sourceIds,'synthetic-property-reply-base']};n.message='Synthetic reply: $2,200 base for 12 months. Other costs remain unknown. This partial evidence is ready for a future A2 handoff.';
    }else if(c.type==='fee-reply'){
     if(r.status!=='awaiting-reply'||r.base===null)throw Error('Receive the base-rent reply first.');
     n.record={...r,status:'costs-confirmed',recurringFees:0,nonRefundable:0,refundableDeposit:2200,sourceIds:[...r.sourceIds,'synthetic-property-reply-fees']};n.message='Synthetic reply: no recurring property fee or non-refundable property fee; $2,200 refundable deposit. Utilities, quote expiry and real availability remain unknown. Moving/setup is a separate $1,200 fixture estimate.';
    }else if(c.type==='request-viewing'){
     if(!consent.allowedActions.includes('request-viewing')||r.status!=='costs-confirmed')throw Error('Viewing request is not available in this state.');
     n.record={...r,status:'viewing-requested'};n.message='Viewing requested in the simulation, not confirmed. Proposed slot: October 28, 6:00–6:30 PM America/New_York.';
    }else if(c.type==='conflict'){
     if(r.status!=='viewing-requested')throw Error('No pending viewing request.');n.record={...r,status:'blocked',appointment:null};n.message='Simulated calendar conflict. No appointment confirmed and no work meeting moved. Revoke/reselect and agree new consent before another attempt.';
    }else{
     if(r.status!=='viewing-requested')throw Error('No conflict-free pending viewing request.');const appointment={start:'2026-10-28T18:00:00-04:00',end:'2026-10-28T18:30:00-04:00'};
     if(!consent.availabilityWindows.some(w=>Date.parse(w.start)<=Date.parse(appointment.start)&&Date.parse(w.end)>=Date.parse(appointment.end)))throw Error('Outside consented availability.');
     n.record={...r,status:'viewing-confirmed',appointment};n.message='Simulated property acknowledgement and conflict-free calendar check complete. Viewing confirmed in this fixture only; no real booking or calendar event.';
    }
   }
  }
 }
 return {...n,events:[...s.events,{id:c.id,type:c.type,at,revision:n.consent?.revision??0}]};
}
export interface A3Repository{load():Promise<A3State>;save(state:A3State):Promise<void>}
export class BrowserA3Repository implements A3Repository{
 private storage:Pick<Storage,'getItem'|'setItem'>;
 constructor(storage:Pick<Storage,'getItem'|'setItem'>){this.storage=storage;}
 async load(){const raw=this.storage.getItem(a3Key);if(!raw)return initialA3();const s=JSON.parse(raw);if(s.version!==1||!Array.isArray(s.events)||typeof s.message!=='string'||s.events.some((e:A3Event)=>typeof e.id!=='string'||typeof e.type!=='string'||typeof e.at!=='string')||s.selection&&typeof s.selection.researchRunId!=='string'||s.consent&&(!Number.isInteger(s.consent.revision)||!Array.isArray(s.consent.allowedActions))||s.record&&(!Array.isArray(s.record.sourceIds)||s.record.simulationOnly!==true))throw Error('Saved A3 state is unreadable; it was preserved. Reset explicitly to discard it.');return s as A3State;}
 async save(state:A3State){this.storage.setItem(a3Key,JSON.stringify(state));}
}
