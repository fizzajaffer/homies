export const fixture = {currentBase:2100,initialBase:2600,initialFee:45,target:2200,counterBase:2400,finalBase:2260,finalFee:0,months:12,alternativeBase:2200,moveCost:1200} as const;
export function comparison(){const f=fixture;return {baseSaving:f.initialBase-f.finalBase,feeSaving:f.initialFee-f.finalFee,monthlySaving:f.initialBase+f.initialFee-f.finalBase-f.finalFee,annualSaving:(f.initialBase+f.initialFee-f.finalBase-f.finalFee)*f.months,gapClosure:(f.initialBase-f.finalBase)/(f.initialBase-f.target),stay:f.finalBase*f.months,move:f.alternativeBase*f.months+f.moveCost,delta:f.alternativeBase*f.months+f.moveCost-f.finalBase*f.months};}
export type EventType='renewal-arrived'|'terms-confirmed'|'pause'|'resume'|'external-signing-confirmed';
export type AuditEvent={type:EventType;at:string;id:number};
export type CaseState={version:1;renewalArrived:boolean;termsConfirmed:boolean;paused:boolean;signingConfirmed:boolean;events:AuditEvent[]};
export function initialState():CaseState{return {version:1,renewalArrived:false,termsConfirmed:false,paused:false,signingConfirmed:false,events:[]};}
export function transition(s:CaseState,type:EventType):CaseState{
 if(type==='renewal-arrived'&&s.renewalArrived||type==='terms-confirmed'&&(!s.renewalArrived||s.termsConfirmed)||type==='external-signing-confirmed'&&(!s.termsConfirmed||s.signingConfirmed)||type==='pause'&&s.paused||type==='resume'&&!s.paused)return s;
 if(s.paused&&type!=='resume')return s;
 return {...s,renewalArrived:s.renewalArrived||type==='renewal-arrived',termsConfirmed:s.termsConfirmed||type==='terms-confirmed',signingConfirmed:s.signingConfirmed||type==='external-signing-confirmed',paused:type==='pause'?true:type==='resume'?false:s.paused,events:[...s.events,{type,at:new Date().toISOString(),id:s.events.length+1}]};
}
