import type{FoundationRepository}from'../repository.ts';import{fetchOfficial,type LegalSnapshot,registry}from'./legal.ts';import{createHash}from'node:crypto';
export class LegalEvidenceRepository{
 readonly repo:FoundationRepository;constructor(repo:FoundationRepository){this.repo=repo;}
 read(id:string):LegalSnapshot|null{if(!registry.some(r=>r.id===id))throw Error('Unreviewed source ID');const row=this.repo.db.prepare('SELECT data FROM legal_source_snapshots WHERE id=? ORDER BY rowid DESC LIMIT 1').get(id);return row?JSON.parse(String(row.data)):null;}
 async refresh(id:string,authorized:boolean,transport:typeof fetch=fetch){if(!authorized)throw Error('Official-source network access disabled');const snapshot=await fetchOfficial(id,transport);const key=createHash('sha256').update(JSON.stringify(snapshot)).digest('hex');this.repo.db.prepare('INSERT INTO legal_source_snapshots VALUES(?,?,?)').run(id,key,JSON.stringify(snapshot));return snapshot;}
}
