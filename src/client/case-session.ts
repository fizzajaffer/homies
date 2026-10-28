// UI routing guard; server domain/version guards remain authoritative.
export function activeCase(){return new URLSearchParams(window.location.search).get('case')||sessionStorage.getItem('tenant-active-case')||'';}
export function rememberCase(id:string){sessionStorage.setItem('tenant-active-case',id);const u=new URL(window.location.href);u.searchParams.set('case',id);window.history.replaceState(null,'',u);window.dispatchEvent(new Event('tenant-case'));}
export function assertCase(expected:string,actual:string){if(!expected||expected!==actual)throw Error('Case changed or mismatched. Reload this case before acting.');}
let writing=false;
export async function caseFetch(input:string,init?:RequestInit){
 const u=new URL(input,window.location.origin),write=!!init?.method&&init.method!=='GET';
 let selected=u.searchParams.get('case')||activeCase();
 if(!write){if(selected){u.searchParams.set('case',selected);rememberCase(selected);}}
 else {if(writing)throw Error('An action is already pending; wait for its saved result.');const body=init?.body;const p=body instanceof FormData?{caseId:String(body.get('caseId'))}:typeof body==='string'?JSON.parse(body):{};assertCase(activeCase(),p.caseId);selected=p.caseId;writing=true;}
 try{const r=await globalThis.fetch(u,init);if(selected&&activeCase()!==selected)throw Error('Case changed while loading. Reload before acting.');if(r.ok&&r.headers.get('content-type')?.includes('application/json')){const d=await r.clone().json();const returned=d.caseId??d.state?.caseId??d.case?.caseId;if(returned){const p=typeof init?.body==='string'?JSON.parse(init.body):{};if(selected&&returned!==selected&&!['fresh','fresh-case'].includes(p.action))throw Error('Response belongs to a different case.');rememberCase(returned);}}return r;}finally{if(write)writing=false;}
}
