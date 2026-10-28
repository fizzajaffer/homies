import type {DatabaseSync} from 'node:sqlite';
export const schemaVersion=13;
export function migrate(db:DatabaseSync,target=schemaVersion){
 const version=Number((db.prepare('PRAGMA user_version').get() as {user_version:number}).user_version);
 if(version>schemaVersion||target>schemaVersion)throw Error('Database schema is newer than this app. No changes made.');
 if(version<1&&target>=1){db.exec(`BEGIN IMMEDIATE;
 CREATE TABLE cases(id TEXT PRIMARY KEY,label TEXT NOT NULL,created_at TEXT NOT NULL);
 CREATE TABLE records(id TEXT PRIMARY KEY,case_id TEXT NOT NULL REFERENCES cases(id),group_name TEXT NOT NULL,version INTEGER NOT NULL,data TEXT NOT NULL,updated_at TEXT NOT NULL);
 CREATE TABLE record_history(record_id TEXT NOT NULL,case_id TEXT NOT NULL,group_name TEXT NOT NULL,version INTEGER NOT NULL,data TEXT NOT NULL,at TEXT NOT NULL,PRIMARY KEY(record_id,version));
 CREATE TABLE documents(id TEXT PRIMARY KEY,case_id TEXT NOT NULL REFERENCES cases(id),name TEXT NOT NULL,sha256 TEXT NOT NULL,relative_path TEXT NOT NULL,bytes INTEGER NOT NULL,created_at TEXT NOT NULL,synthetic INTEGER NOT NULL DEFAULT 1);
 CREATE TABLE approvals(id TEXT PRIMARY KEY,case_id TEXT NOT NULL REFERENCES cases(id),target_id TEXT NOT NULL,status TEXT NOT NULL,created_at TEXT NOT NULL,invalidated_at TEXT);
 CREATE TABLE approval_dependencies(approval_id TEXT NOT NULL REFERENCES approvals(id),record_id TEXT NOT NULL,version INTEGER NOT NULL,PRIMARY KEY(approval_id,record_id));
 CREATE TABLE runs(id TEXT PRIMARY KEY,case_id TEXT NOT NULL REFERENCES cases(id),agent TEXT NOT NULL,status TEXT NOT NULL,checkpoint TEXT,operation_id TEXT NOT NULL UNIQUE,owner_runtime TEXT NOT NULL,created_at TEXT NOT NULL,updated_at TEXT NOT NULL);
 CREATE TABLE run_steps(run_id TEXT NOT NULL REFERENCES runs(id),operation_id TEXT NOT NULL,checkpoint TEXT NOT NULL,completed_at TEXT NOT NULL,PRIMARY KEY(run_id,operation_id));
 CREATE TABLE operations(id TEXT PRIMARY KEY,case_id TEXT,fingerprint TEXT NOT NULL,result TEXT NOT NULL,created_at TEXT NOT NULL);
 CREATE TABLE events(id INTEGER PRIMARY KEY AUTOINCREMENT,case_id TEXT,entity_id TEXT,kind TEXT NOT NULL,at TEXT NOT NULL);
 PRAGMA user_version=1; COMMIT;`);}
 if(version<2&&target>=2){db.exec(`BEGIN IMMEDIATE;ALTER TABLE runs ADD COLUMN cost_microusd INTEGER NOT NULL DEFAULT 0;ALTER TABLE runs ADD COLUMN error_code TEXT;CREATE INDEX records_case_group ON records(case_id,group_name);CREATE INDEX events_case ON events(case_id,id);PRAGMA user_version=2;COMMIT;`);}
 if(version<3&&target>=3){db.exec(`BEGIN IMMEDIATE;CREATE TABLE run_history(id INTEGER PRIMARY KEY AUTOINCREMENT,run_id TEXT NOT NULL REFERENCES runs(id),status TEXT NOT NULL,checkpoint TEXT,cost_microusd INTEGER NOT NULL,error_code TEXT,at TEXT NOT NULL);INSERT INTO run_history(run_id,status,checkpoint,cost_microusd,error_code,at) SELECT id,status,checkpoint,cost_microusd,error_code,updated_at FROM runs;PRAGMA user_version=3;COMMIT;`);}

 if(version<4&&target>=4){db.exec(`BEGIN IMMEDIATE;UPDATE operations SET result=json_object('__recordRef',json_object('id',json_extract(result,'$.id'),'caseId',json_extract(result,'$.caseId'),'version',json_extract(result,'$.version'))) WHERE json_type(result,'$.data')='object' AND json_type(result,'$.group')='text' AND json_type(result,'$.caseId')='text';PRAGMA user_version=4;COMMIT;`);}

 if(version<5&&target>=5){db.exec(`BEGIN IMMEDIATE;
 CREATE TABLE a1_runs(id TEXT PRIMARY KEY,case_id TEXT NOT NULL REFERENCES cases(id),operation_id TEXT NOT NULL UNIQUE,scenario TEXT NOT NULL,status TEXT NOT NULL,runtime TEXT NOT NULL,step INTEGER NOT NULL DEFAULT 0,candidates TEXT NOT NULL DEFAULT '[]',failures INTEGER NOT NULL DEFAULT 0,result TEXT,created_at TEXT NOT NULL,updated_at TEXT NOT NULL,owner_runtime TEXT NOT NULL,model_requests INTEGER NOT NULL DEFAULT 0,cost_microusd INTEGER NOT NULL DEFAULT 0,error_code TEXT);
 CREATE UNIQUE INDEX a1_single_active ON a1_runs((1)) WHERE status='running';
 CREATE TABLE a1_trace(id INTEGER PRIMARY KEY AUTOINCREMENT,run_id TEXT NOT NULL REFERENCES a1_runs(id),event TEXT NOT NULL,details TEXT NOT NULL,at TEXT NOT NULL);
 CREATE TABLE a1_evidence(run_id TEXT NOT NULL REFERENCES a1_runs(id),candidate_id TEXT NOT NULL,evidence_id TEXT NOT NULL,data TEXT NOT NULL,PRIMARY KEY(run_id,candidate_id,evidence_id));
 CREATE TABLE a1_memory(id TEXT PRIMARY KEY,case_id TEXT NOT NULL REFERENCES cases(id),field TEXT NOT NULL,replaces_value TEXT NOT NULL,value TEXT NOT NULL,provenance TEXT NOT NULL,constraints_version INTEGER NOT NULL,at TEXT NOT NULL);
 PRAGMA user_version=5;COMMIT;`);}

 if(version<6&&target>=6){db.exec(`BEGIN IMMEDIATE;ALTER TABLE a1_runs ADD COLUMN cost_status TEXT NOT NULL DEFAULT 'mock-zero';PRAGMA user_version=6;COMMIT;`);}

 if(version<7&&target>=7){db.exec(`BEGIN IMMEDIATE;
 CREATE TABLE a3_properties(id TEXT PRIMARY KEY,case_id TEXT NOT NULL REFERENCES cases(id),version INTEGER NOT NULL,data TEXT NOT NULL);
 CREATE TABLE a3_snapshots(property_id TEXT NOT NULL,version INTEGER NOT NULL,data TEXT NOT NULL,PRIMARY KEY(property_id,version));
 CREATE TABLE a3_preferences(case_id TEXT PRIMARY KEY REFERENCES cases(id),version INTEGER NOT NULL,data TEXT NOT NULL);
 CREATE TABLE a3_preference_history(case_id TEXT NOT NULL,version INTEGER NOT NULL,data TEXT NOT NULL,PRIMARY KEY(case_id,version));
 CREATE TABLE a3_preference_operations(id TEXT PRIMARY KEY,fingerprint TEXT NOT NULL,result TEXT NOT NULL);
 CREATE TABLE a3_ledger(action_id TEXT PRIMARY KEY,property_id TEXT NOT NULL,fingerprint TEXT NOT NULL,version INTEGER NOT NULL,result TEXT NOT NULL);
 CREATE TABLE a3_outbox(event_id TEXT PRIMARY KEY,property_id TEXT NOT NULL,version INTEGER NOT NULL,data TEXT NOT NULL);
 CREATE TABLE a3_receipts(event_id TEXT PRIMARY KEY,property_id TEXT NOT NULL,version INTEGER NOT NULL,status TEXT NOT NULL,review_flag TEXT NOT NULL);
 CREATE TABLE a3_audit(id INTEGER PRIMARY KEY AUTOINCREMENT,property_id TEXT NOT NULL,version INTEGER NOT NULL,code TEXT NOT NULL,at TEXT NOT NULL);
 PRAGMA user_version=7;COMMIT;`);}

 if(version<8&&target>=8){db.exec(`BEGIN IMMEDIATE;
 CREATE TABLE fixture_sync(case_id TEXT PRIMARY KEY,version TEXT NOT NULL,data TEXT NOT NULL,at TEXT NOT NULL);
 CREATE TABLE a2_cases(case_id TEXT PRIMARY KEY REFERENCES cases(id),version INTEGER NOT NULL,data TEXT NOT NULL);
 CREATE TABLE a2_history(case_id TEXT NOT NULL,version INTEGER NOT NULL,data TEXT NOT NULL,at TEXT NOT NULL,PRIMARY KEY(case_id,version));
 CREATE TABLE a2_operations(id TEXT PRIMARY KEY,case_id TEXT NOT NULL,fingerprint TEXT NOT NULL,result TEXT NOT NULL);
 CREATE TABLE a2_runs(id TEXT PRIMARY KEY,case_id TEXT NOT NULL,status TEXT NOT NULL,owner_runtime TEXT NOT NULL,data TEXT NOT NULL);
 CREATE UNIQUE INDEX a2_active_case ON a2_runs(case_id) WHERE status='running';
 CREATE TABLE a2_audit(id INTEGER PRIMARY KEY AUTOINCREMENT,case_id TEXT NOT NULL,run_id TEXT,code TEXT NOT NULL,at TEXT NOT NULL,details TEXT NOT NULL);
 CREATE TABLE a2_receipts(event_id TEXT PRIMARY KEY,case_id TEXT NOT NULL,aggregate_id TEXT NOT NULL,aggregate_version INTEGER NOT NULL,review_flag TEXT NOT NULL,snapshot TEXT NOT NULL,status TEXT NOT NULL);
 PRAGMA user_version=8;COMMIT;`);}

 if(version<9&&target>=9){db.exec(`BEGIN IMMEDIATE;
 CREATE TABLE case_agent_runs(id TEXT PRIMARY KEY,case_id TEXT NOT NULL REFERENCES cases(id),operation_id TEXT NOT NULL UNIQUE,status TEXT NOT NULL,owner TEXT NOT NULL,data TEXT NOT NULL);
 CREATE UNIQUE INDEX case_agent_active ON case_agent_runs(case_id) WHERE status='running';
 CREATE TABLE case_agent_steps(run_id TEXT NOT NULL,step INTEGER NOT NULL,data TEXT NOT NULL,PRIMARY KEY(run_id,step));
 CREATE TABLE case_agent_proposals(id TEXT PRIMARY KEY,case_id TEXT NOT NULL,property_id TEXT NOT NULL,payload TEXT NOT NULL,payload_hash TEXT NOT NULL,approved INTEGER NOT NULL DEFAULT 0,executed INTEGER NOT NULL DEFAULT 0);
 CREATE TABLE case_agent_corrections(id TEXT PRIMARY KEY,case_id TEXT NOT NULL,record_id TEXT NOT NULL,before_version INTEGER NOT NULL,after_version INTEGER NOT NULL,data TEXT NOT NULL);
 PRAGMA user_version=9;COMMIT;`);}

 if(version<10&&target>=10){db.exec(`BEGIN IMMEDIATE;
 CREATE TABLE journey_events(id TEXT PRIMARY KEY,case_id TEXT NOT NULL REFERENCES cases(id),kind TEXT NOT NULL,at TEXT NOT NULL,data TEXT NOT NULL);
 CREATE TABLE journey_uploads(id TEXT PRIMARY KEY,case_id TEXT NOT NULL REFERENCES cases(id),name TEXT NOT NULL,mime TEXT NOT NULL,sha256 TEXT NOT NULL,bytes BLOB NOT NULL,text TEXT NOT NULL,at TEXT NOT NULL);
 CREATE TABLE journey_state(case_id TEXT PRIMARY KEY REFERENCES cases(id),version INTEGER NOT NULL,data TEXT NOT NULL);
 CREATE TABLE journey_runs(id TEXT PRIMARY KEY,case_id TEXT NOT NULL REFERENCES cases(id),status TEXT NOT NULL,owner TEXT NOT NULL,data TEXT NOT NULL);
 CREATE UNIQUE INDEX journey_single_active ON journey_runs(case_id) WHERE status='running';
 CREATE TABLE api_grants(id TEXT PRIMARY KEY,reserved_microusd INTEGER NOT NULL,data TEXT NOT NULL);
 CREATE TABLE api_calls(id TEXT PRIMARY KEY,grant_id TEXT NOT NULL,status TEXT NOT NULL,reserved_microusd INTEGER NOT NULL,actual_microusd INTEGER,data TEXT NOT NULL);
 PRAGMA user_version=10;COMMIT;`);}

 if(version<11&&target>=11){db.exec(`BEGIN IMMEDIATE;CREATE TABLE journey_track_versions(case_id TEXT NOT NULL REFERENCES cases(id),track TEXT NOT NULL,version INTEGER NOT NULL,operation_id TEXT NOT NULL UNIQUE,data TEXT NOT NULL,at TEXT NOT NULL,PRIMARY KEY(case_id,track,version));PRAGMA user_version=11;COMMIT;`);}

 if(version<12&&target>=12){db.exec(`BEGIN IMMEDIATE;
 CREATE TABLE legal_source_snapshots(id TEXT NOT NULL,content_hash TEXT NOT NULL,data TEXT NOT NULL,PRIMARY KEY(id,content_hash));
 CREATE TABLE adaptive_benchmarks(id TEXT PRIMARY KEY,status TEXT NOT NULL,data TEXT NOT NULL);
 PRAGMA user_version=12;COMMIT;`);}

 if(version<13&&target>=13){db.exec(`BEGIN IMMEDIATE;
 CREATE TABLE eval_reviews(operation_id TEXT PRIMARY KEY,run_id TEXT NOT NULL REFERENCES adaptive_benchmarks(id),snapshot_hash TEXT NOT NULL,at TEXT NOT NULL,verdict TEXT NOT NULL,comment TEXT NOT NULL,kind TEXT NOT NULL);
 PRAGMA user_version=13;COMMIT;`);}

}
