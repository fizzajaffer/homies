export const groups=['search-profile','private-finance','housing-case','evidence-claim','market-finding','selection','negotiation','consent','outreach'] as const;
export type Group=typeof groups[number];
export type Agent='A1'|'A2'|'A3';
export type Json=string|number|boolean|null|Json[]|{[key:string]:Json};
export type Payload={ [key:string]:Json };
export type StoredRecord={id:string;caseId:string;group:Group;version:number;data:Payload;updatedAt:string};
export type Source={documentId:string|null;url:string|null;page:number|null;sourceDate:string|null;eventDate:string|null;confirmation:'unconfirmed'|'confirmed'|'disputed'};
export type SearchProfile={city:string;currentPostalCode:string;searchPostalCodes:string[];unitType:string;mustHaves:string[];maxBase:number|null;baseDiscoveryCeiling?:number|null;maxRentAndMandatoryFees:number|null;leaseExpiry:string|null;moveInDate:string|null;moveInLatestDate:string|null;staffedConciergeOrDoorman24HoursRequired:boolean;pathWalkPreferredMinMinutes:number|null;pathWalkExpansionMaxMinutes:number|null;pathWalkExpansionRequiresApproval:boolean;pathWalkExpansionEvidence:string;pathWalkPreferredMinutes:number|null;pathWalkMaxMinutes:number|null};
export type PrivateFinance={grossAnnual:number|null;payFrequency:string;netMonthly:number|null;comfortCeiling:number|null;targetBase:number|null;rentAndFeesCeiling:number|null;preferredIncreaseStrictlyBelow:number|null;hardIncreaseCeiling:number|null};
export type HousingCase={currentBase:number|null;currentFee:number|null;renewalBase:number|null;renewalFee:number|null;termMonths:number|null;responseDeadline:string|null;status:string};
export type Consent={selectionId:string;actions:string[];availability:string[];status:'draft'|'approved'|'revoked'};
const keys:Record<Group,string[]>={
 'search-profile':['city','currentPostalCode','searchPostalCodes','unitType','mustHaves','maxBase','baseDiscoveryCeiling','maxRentAndMandatoryFees','leaseExpiry','moveInDate','moveInLatestDate','staffedConciergeOrDoorman24HoursRequired','pathWalkPreferredMinutes','pathWalkMaxMinutes','pathWalkPreferredMinMinutes','pathWalkExpansionMaxMinutes','pathWalkExpansionRequiresApproval','pathWalkExpansionEvidence'],
 'private-finance':['grossAnnual','payFrequency','netMonthly','comfortCeiling','targetBase','rentAndFeesCeiling','preferredIncreaseStrictlyBelow','hardIncreaseCeiling'],
 'housing-case':['currentBase','currentFee','renewalBase','renewalFee','termMonths','responseDeadline','status'],
 'evidence-claim':['text','documentId','url','page','sourceDate','eventDate','confirmation'],
 'market-finding':['title','base','fees','url','sourceDate','retrievedAt','confirmation','synthetic'],
 'selection':['findingId','selected','notes'],
 'negotiation':['text','status','sourceRecordIds'],
 'consent':['selectionId','actions','availability','status'],
 'outreach':['selectionId','consentId','status','base','fees','nonRefundable','refundableDeposit','appointmentStart','appointmentEnd','sourceDate','confirmation']
};
const numbers=new Set(['pathWalkPreferredMinMinutes','pathWalkExpansionMaxMinutes','maxRentAndMandatoryFees','rentAndFeesCeiling','preferredIncreaseStrictlyBelow','hardIncreaseCeiling','targetBase','pathWalkPreferredMinutes','pathWalkMaxMinutes','maxBase','baseDiscoveryCeiling','grossAnnual','netMonthly','comfortCeiling','currentBase','currentFee','renewalBase','renewalFee','termMonths','base','fees','nonRefundable','refundableDeposit','page']);
const arrays=new Set(['searchPostalCodes','mustHaves','actions','availability','sourceRecordIds']);
const booleans=new Set(['pathWalkExpansionRequiresApproval','selected','synthetic','staffedConciergeOrDoorman24HoursRequired']);
export function validatePayload(group:Group,input:unknown):Payload{
 if(!groups.includes(group)||!input||typeof input!=='object'||Array.isArray(input))throw Error('Invalid record group or data');
 const data=input as Payload;
 if(Object.keys(data).some(k=>!keys[group].includes(k))||keys[group].some(k=>!(k in data)))throw Error('Record fields do not match the schema');
 for(const [k,v] of Object.entries(data)){
  if(numbers.has(k)){if(v!==null&&(typeof v!=='number'||!Number.isFinite(v)||v<0))throw Error(`Invalid ${k}`);}
  else if(arrays.has(k)){if(!Array.isArray(v)||v.length>40||v.some(x=>typeof x!=='string'||x.length>200))throw Error(`Invalid ${k}`);}
  else if(booleans.has(k)){if(typeof v!=='boolean')throw Error(`Invalid ${k}`);}
  else if(v!==null&&(typeof v!=='string'||v.length>8000))throw Error(`Invalid ${k}`);
 }
 if('confirmation' in data&&!['unconfirmed','confirmed','disputed'].includes(String(data.confirmation)))throw Error('Invalid confirmation status');
 for(const k of ['moveInDate','moveInLatestDate','leaseExpiry','responseDeadline','sourceDate','eventDate'])if(data[k]!==undefined&&data[k]!==null&&(!/^\d{4}-\d{2}-\d{2}$/.test(String(data[k]))||Number.isNaN(Date.parse(String(data[k])))||new Date(String(data[k])).toISOString().slice(0,10)!==data[k]))throw Error(`Invalid ${k}`);
 if(group==='consent'&&!['draft','approved','revoked'].includes(String(data.status)))throw Error('Invalid consent status');
 if(group==='market-finding'&&data.synthetic!==true)throw Error('Only synthetic fixture records are enabled');
 if(group==='search-profile'&&typeof data.moveInDate==='string'&&typeof data.moveInLatestDate==='string'&&data.moveInDate>data.moveInLatestDate)throw Error('Move-in window end must be on or after its start');
 return JSON.parse(JSON.stringify(data));
}
export const syntheticSearch:SearchProfile={city:'Jersey City',currentPostalCode:'07302',searchPostalCodes:['07302','07310'],unitType:'studio',mustHaves:['heating','cooling','dishwasher','stovetop','hot water','cold water','private bath','24/7 staffed concierge or doorman','PATH access','reviews'],maxBase:null,baseDiscoveryCeiling:2265,maxRentAndMandatoryFees:2277,leaseExpiry:'2027-01-15',moveInDate:'2027-01-07',moveInLatestDate:'2027-01-15',staffedConciergeOrDoorman24HoursRequired:true,pathWalkPreferredMinMinutes:3,pathWalkPreferredMinutes:5,pathWalkMaxMinutes:5,pathWalkExpansionMaxMinutes:10,pathWalkExpansionRequiresApproval:true,pathWalkExpansionEvidence:'additional-verified-candidate-count'};
export const syntheticFinance:PrivateFinance={grossAnnual:127000,payFrequency:'biweekly',netMonthly:5633.33,comfortCeiling:null,targetBase:2200,rentAndFeesCeiling:2265,preferredIncreaseStrictlyBelow:100,hardIncreaseCeiling:120};
export const syntheticHousing:HousingCase={currentBase:2100,currentFee:45,renewalBase:2600,renewalFee:45,termMonths:12,responseDeadline:'2026-12-08',status:'renewal-received'};
