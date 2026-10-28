// Explicit approved correction only; never run on startup.
import {FoundationRepository,defaultDataRoot} from '../src/server/repository.ts';
const repo=new FoundationRepository(defaultDataRoot(),{recover:false});
try {let updated=0;for(const c of repo.listCases()) {
 const r=repo.records(String(c.id)).find(r=>r.group==='search-profile')!;
 const op=`fixture-path-five-minutes-20261024-${r.id}`;
 if(repo.db.prepare('SELECT id FROM operations WHERE id=?').get(op))continue;
 repo.saveRecord(r.caseId,r.group,{...r.data,pathWalkPreferredMinMinutes:3,pathWalkPreferredMinutes:5,pathWalkMaxMinutes:5,pathWalkExpansionMaxMinutes:10,pathWalkExpansionRequiresApproval:true,pathWalkExpansionEvidence:'additional-verified-candidate-count'},op,r.id,r.version);updated++;
 } console.log(JSON.stringify({updated,oldVersionsRetained:true}));
}finally{repo.close();}
