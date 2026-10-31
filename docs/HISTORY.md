# Historical Homies implementation notes

These are archived notes from before the documentation reconciliation. Old counts, paths, route instructions, and implementation framing below describe their original checkpoints, not the final submitted static demo. For the current submission use [README](../README.md).

## Archived README at 25b9e47

# Homies — final capstone snapshot

The active app includes the approved shared-storage foundation and A1 v0.5 deterministic mock workflow at `/a1`. Paid/model API calls, live research, A2 execution, real outreach and hosting remain disabled. A3 v0.2 simulated coordination is available at `/a3`. Earlier UI code remains in `src/preserved/`; it is not routed or imported by the active app. Old browser-only demo storage has not been deleted or silently imported as confirmed case facts.

## Final submission — October 31, 2026

`main` includes console Pass 1 and committed Pass 2 from `console-warm-pass` (`65a1e7b`), plus the recorded database and evidence under [`data/`](../data/README.md). The rejected interactive Initial Offer wizard was not found in the working tree, branches, stashes, or reachable commits and is not part of this submission. Initial Offer remains a read-only recorded checkpoint.

The complete data snapshot includes all 10 human-reviewed benchmark runs, their full review history, 17 recorded journey runs, and Case 6. See [current human verdicts](../data/exports/current_human_reviews.json): 8 Pass and 2 Fail, with prior verdicts preserved. The 229 offline automated tests passed before and after the fast-forward to `main`; final data-integration validation is recorded in `docs/FINAL_SUBMISSION.md`. These are different measures: automated tests do not certify model quality.

The sections below include historical implementation notes. Their old counts, pending-review statements, and external data paths describe earlier checkpoints; the final snapshot and data instructions here take precedence.

## Open and run

From the cloned `homies` repository (Node 24.21.0):

```sh
npm ci
npm run build
npm run start
```

Open http://127.0.0.1:3000. Node 24.21.0 provides built-in SQLite; no database package, account or credentials are needed. The server binds only to loopback. Keep one app server running against this data directory.

## Durable data location

Default: `./data/` inside the repository. It includes a consistent `foundation.sqlite`, referenced `documents/`, human-review receipts, and readable evaluation exports. See [`data/README.md`](../data/README.md) for counts, provenance, and preserved human verdicts.

`TENANT_DATA_DIR` overrides the default; an existing `.env.local` may still point at the original working-data directory. Changing the variable does not migrate data. For a persistent deployment, copy the committed snapshot to an initially empty writable volume and point `TENANT_DATA_DIR` there. Keep one app server per database. Never replace a non-empty runtime directory with a fresh snapshot.

The original source remains unchanged at `/Users/fizzajaffer/Documents/Codex/2026-10-25/task-4/working-data`. New backups, SQLite sidecars, credentials, and unreviewed data files remain ignored. The app uses local SQLite and loopback-only owner APIs; public hosting needs a separate authentication and storage review. No deployment is performed by this closeout.

## Record groups and access boundaries

1. Profile/search preferences and a separate private-finance record.
2. Housing/current lease/renewal case.
3. Evidence documents and claims: source, page, source date, event date, confirmation status.
4. Market findings and user selections.
5. Negotiation versions and explicit approval records.
6. Outreach/appointment records and selected-option scoped consent.
7. Run/checkpoint/operation/event/cost/error history.

Server `readForAgent` returns A1 only search preferences and market findings; A2 relevant case/dossier/private affordability and findings; A3 selected findings, selection IDs, scoped consent and related outreach. A3 does not receive private selection notes, private finances, raw evidence or documents. Only owner/A2 may read case-scoped dossier documents. Approval validity is computed against dependency versions; changes to those versions invalidate prior approval. New evidence invalidates existing negotiation approvals. Unrelated private-finance changes do not invalidate A3 consent. Mocked A1 orchestration is exposed at `/api/a1` and explicitly simulated A3 coordination at `/api/a3`; no live model or A2 execution endpoint exists.

The owner API is local-only with same-origin JSON checks for writes. These are single-user development controls, not a multi-user identity system. Future live agent adapters must use the restricted server repository methods; do not hand models the owner API or raw database. Future hosting requires authenticated case isolation and a deliberate storage migration.

## Saving and recovery

Preference fields save on field exit; in-progress edits are explicitly marked unsaved. Transactions preserve current/history together and optimistic versions reject stale updates. Failures leave a retry control using the same operation ID. Completed operation IDs cannot be repeated with different inputs or in a different case. A successful response is the save acknowledgement.

Reopening loads saved cases without reseeding or overwriting them. A seed is inserted only when no case exists. “Start fresh synthetic case” creates a new UUID and retains all earlier cases. There is no destructive reset.

The storage-only check controls exercise persistence, not agents. Startup marks previously running checks interrupted and appends the error/status history. Manual resume is required. Completed checkpoint operation IDs remain idempotent after restart. Cost stays zero; event logs contain event codes/IDs/timestamps, not prompts, credentials or hidden reasoning. Only one server instance per database is supported; starting a second could classify the first instance's unfinished work as interrupted.

## Corrected synthetic fixture

Gross annual income $127,000, biweekly; current ZIP 07302; studio search in 07302/07310; move-in window 2026-12-23 through 2026-12-31 inclusive, December 23 preferred; lease expiry 2026-12-31. PATH walk 3–5 minutes preferred, with closer options qualifying. Active maximum 5 minutes. A possible expansion up to 10 minutes requires separate Mia approval after the count of additional verified candidates is shown; more than 10 is excluded. This is stored preference data, not implemented search behavior. Heating, cooling, dishwasher, stovetop, hot/cold water, private bath, hard requirement for 24/7 staffed concierge or doorman, PATH and reviews retained.

Current $2,100 base + $45 mandatory amenity = $2,145. Renewal just received at $2,600 + $45 for 12 months. Private base target $2,200. Preferred increase strictly below $100 (total below $2,245); hard rent-plus-mandatory-fee ceiling $2,265 ($120 increase). Only the search maximum is included in A1's search profile. Utilities, one-time costs and net take-home remain separate/unknown; this does not establish affordability. The broader total-housing comfort ceiling remains unknown because utilities are not confirmed.

The approved budget correction was applied explicitly with `scripts/apply-approved-fixture.ts`, preserving older record versions. It is not a startup hook and does not reset saved cases. Later $2,260/waived-fee outcomes remain in the old arithmetic fixture only, not completed case facts. The $385/month, $4,620/year, 85% base-gap closure and separate $480 alternative delta remain covered by the preserved deterministic test.

## Backup and restore

Use “Back up database + documents” in the app and download the bundle. A SQLite `VACUUM INTO` snapshot captures all committed records; document references are read from that snapshot, and immutable document bytes are copied and hash-checked. The snapshot, documents and manifest are exported together. Retrying a completed backup operation returns the same bundle. An incomplete backup is retained and reported, not silently reused.

CLI backup (no agent execution):

```sh
node --experimental-strip-types scripts/foundation-storage.ts backup
```

Restore never overwrites an existing non-empty destination. Extract a backup tar into a new folder using Finder, then:

```sh
node --experimental-strip-types scripts/foundation-storage.ts restore /absolute/extracted/bundle /absolute/empty/restore-directory
```

The restore validates the manifest, paths, SQLite integrity and document hashes before copying. To use a restored copy, stop the server and deliberately set `TENANT_DATA_DIR` to that directory before starting it. Keep the original intact. The reviewed final snapshot is included in Git for off-device preservation. Local backup bundles may include private configuration and remain outside Git.

## Verification

Run `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`.

Foundation tests cover durable versions, stable IDs and case retention; cross-case and agent access isolation; consent/negotiation approval invalidation; schema v1→v7 retaining records; an actual child-process restart with interrupted/manual-resume behavior and duplicate protection; consistent backup/restore including document bytes and tamper detection; forbidden log fields; all approved record groups. Existing arithmetic tests remain isolated from the active UI.

Browser QA results and exact final counts are recorded in `VERIFICATION.md`. No production certification, multi-user authentication, disaster-recovery guarantee or agent-quality claim is made.

## A1 v0.5 mock review

Open http://127.0.0.1:3000/a1 in Chrome on this Mac. Choose a scenario, start an on-demand mock search or explicitly simulate refresh, then continue up to four bounded mock research stages and select **Validate and prepare review**. This deliberately exposes checkpoint controls; it is not an autonomous live search. Resume after process interruption is manual. Each run has a 120-second deadline; a long pause can require a new explicit run.

S1 checks ordering; S2 unknown/conflicting/stale evidence; S3 optional PATH counts; S4 source failure; S5 untrusted-source instructions; S6 changed evidence. No-match and malformed-response cases are also available. The active five-minute PATH preference is unchanged unless Mia explicitly approves the labeled demo expansion after reviewing counts. Synthetic counts never become verified market counts. Sources use `example.invalid` and are intentionally not live links.

The SYSTEM text in `src/a1/prompt.ts` is verbatim from the reviewed document's SYSTEM sections. Runtime contracts, bounded adaptive mock source strategies, deterministic evidence checks and a narrow replaceable model interface are separate. The mock provider returns the complete structured result. An independent runtime schema rejects malformed nested records and extra fields. A separate grounding gate compares factual claims, evidence, groups, counts and handoffs to deterministic application results, while allowing summary, question and explanatory prose variation. Prose quality and truthfulness still require model evaluation; application code owns facts, filters, ordering and authorization. This is not evidence that an actual model follows the prompt. The Astra adapter always rejects paid/live calls; it has no transport or credentials.

SQLite schema 5 adds A1 runs, per-run evidence, trace records and confirmed memory provenance while retaining foundation records. Schema 6 adds explicit mock-zero/uncertain cost status. Results and prior versions persist. Pre-correction findings remain historical but cannot authorize expansion. Prior unresolved opportunities are carried forward explicitly stale and excluded from current counts. Read views invalidate historical/changed-preference A3 preparations. A2/A3 records are preparation contracts only, not execution. Memory correction checks require explicit confirmation/provenance and a matching version; there is no inferred write path.

Limits: four local mock source stages and one mock provider request, no retries/substitution, one active run, 120-second application deadline and stop controls. Provider timeout/stop cannot turn a later response into completion. Actual billable usage is zero for the configured mock. An unknown provider’s pending cost remains uncertain after cancellation. Stop sends an AbortSignal where supported and suppresses late completion. Local input tokens are estimated from UTF-8 bytes divided by three; actual Astra tokenizer/capability and provider-added search accounting are **not verified**. The permanently OFF live gate is the cost protection; these mock checks do not certify a paid-call ceiling.

Mock output has a byte-size memory guard; the declared 4,000 output-token ceiling is not verified by a real tokenizer. The live adapter remains OFF.

See `A1_VERIFICATION.md` for the acceptance matrix, preserved failures and browser evidence. Actual model A/B, live source verification, paid evaluations, human scoring and production readiness remain NOT RUN/PENDING and require separate approval.


## A3 v0.2 simulated coordination

Open http://127.0.0.1:3000/a3 on this Mac. Select a current A1 synthetic candidate, review property-specific yes/no consent, and explicitly operate simulated messages and replies. Shared viewing preferences require approval; 30-minute visits and 30-minute buffers are defaults. A requested slot requires separate exact simulated property confirmation. All records persist in the same durable SQLite database; schema 7 adds snapshots, audit, idempotent operations and an atomic outbox. A2 receipts are recorded only; missing-cost research requests are held with zero dispatch/hop/spend budgets. No actual model, mail, calendar or external action is connected. See `A3_VERIFICATION.md` for the 33-case matrix, additional probes, exact counts, failure/fix evidence and browser checks.

## A2 first local checkpoint

Open `http://127.0.0.1:3000/a2` after `npm run build && npm run start`. It is fully mocked, with explicit manual review/copy/send records and no model or external transport. See `A2_VERIFICATION.md` for exact test coverage, limitations and the historical A1 budget-policy discussion. `npm test` includes the A2 tests and previous regressions. Saved SQLite/documents default to `./data`; retain runtime data when rebuilding.

Latest policy: A1 discovers by advertised regular base rent <= $2,265, with additional fees visible separately. A2 checks base + amenity against its separate $2,265 ceiling. See `CORRECTIONS_VERIFICATION.md` for the final 133-test evidence and A2 semantic/sent-record fixes.

## Portable live configuration

Default use is synthetic/mock. Live use requires explicit authorization and existing budget guards. Configure `TENANT_OPENAI_KEY_FILE` to a private local key file (owner-only permissions), and `TENANT_PRIOR_LEDGER_PATH` to the existing pooled-budget ledger. Missing configuration fails closed; it does not assume zero prior spend. Keep these files outside Git. `TENANT_DATA_DIR` can locate local SQLite data. Credentials and the original pre-publication Git history remain excluded. The reviewed synthetic database and its evidence are now included in `data/`. Historical verification reports describe the original local runs, not results reproduced by cloning this repository.

Original publication validation passed 211 offline tests. The final console branch passes 229 tests, with the exact approved instruction artifact and reviewed synthetic rubric fixture retained. Recorded historical model outputs and human reviews are now preserved in the database; offline tests do not independently reproduce live model results.


## Archived closeout report at 25b9e47

# Homies final submission — October 31, 2026

## Code and branch decision

The publication checkout is `/Users/fizzajaffer/Documents/Codex/2026-10-25/task-4/homies-publication`, with origin `https://github.com/fizzajaffer/homies.git`.

At inventory, `main` and cached `origin/main` pointed to `e0f09d2430a61ba19780f20a52c058c9bbd01282`. `console-warm-pass` pointed to `65a1e7b583baddb2ce1483751e8e0653da5a4d97`. Its history includes the warm-console checkpoint (`8a0e7f6`), the Pass 1 ceiling/grid correction (`72321a3`), and committed Pass 2 (`65a1e7b`, chronological checkpoints, preference pills, collapsed ledgers). The latter is a recorded-checkpoint reader, not the rejected interactive Initial Offer wizard.

There were no uncommitted changes, stashes, additional branches, or additional worktrees. Reflogs and unreachable objects did not reveal a wizard implementation. Three dangling blobs were an older ignore file, README, and dependency symlink; they remain preserved in the full local Git backup. No empty wizard branch was invented. The adjacent Step 0 numbered source file is an earlier source-evidence dump, not wizard code.

After the full branch passed 229/229 tests, `main` was fast-forwarded to `console-warm-pass`. No branch was deleted, history rewritten, or force push used. Existing test changes from the already-committed console work came through that fast-forward; this closeout did not edit any test file or assertion.

## Recorded data

The source working-data directory was about 3.3 MB. The submitted `data/` package is about 3.2 MB and includes a complete consistent SQLite snapshot, the referenced synthetic document, original review receipts, provenance/checksums, and readable JSON exports. No size-based fallback was needed.

All 46 tables were compared with the original source in rowid order, including BLOB values. The snapshot contains 7 cases, 10 adaptive benchmark records, 17 journey runs, and 12 review entries: 11 human review entries across 10 runs and one explicitly labeled UI test. Case 6 and its uploaded source bytes, 6 journey runs, and 21 track versions are retained. The source database and its WAL were not modified.

Human review history is authoritative in `eval_reviews`, not the older `humanReview: pending` fields in benchmark JSON. All 10 current human verdicts match their saved benchmark output hashes: 8 Pass and 2 Fail. The draft run's October 29 change from Needs work to Fail is preserved along with its earlier verdict. Historical failures, retries, assistant ratings, and limitations remain intact. Nothing was rescored or rerun against a paid model.

The app's default data directory is now `./data`; `TENANT_DATA_DIR` remains an explicit override. Existing local `.env.local` configuration was preserved. The README explains persistent-storage setup and distinguishes historical notes from the final snapshot.

## Validation

- Full tests on `console-warm-pass` before merge: **229 passed, 0 failed, 0 skipped**.
- Full tests on `main` after fast-forward: **229 passed, 0 failed, 0 skipped**.
- Full tests on `main` with the database and path update: **229 passed, 0 failed, 0 skipped**.
- TypeScript: passed (`npm run typecheck -- --incremental false`).
- ESLint: passed with the existing anonymous-default-export warning in `next.config.mjs` (zero errors).
- Production build: passed. Turbopack reports broad filesystem-tracing warnings for the configurable data path and prior-budget-ledger path.
- Read-only application checks on a disposable data copy: all five Case 6 checkpoint views load, all 10 current human reviews are visible, the revised Fail verdict is selected, and 17 journey runs are present. The default data path resolves to the committed `data/` folder.
- SQLite integrity and foreign-key checks passed. The referenced document's checksum and byte length match the database.
- Credential-signature scans of the data and tracked source found no credentials; structured-field review found model token-usage counters, not authentication tokens. Private local configuration and credentials are excluded from Git.

Automated-test success does not imply that every human evaluation passed. No deployment or UI redesign was performed.

## Local safety net and exclusions

The full repo (including `.git`, ignored files, and dependencies), complete working-data directory including SQLite sidecars, and adjacent task work files are in:

`/Users/fizzajaffer/Documents/ChatGPT/Homies 2/homies-backup-2026-10-31/homies-full-repo-and-working-data-2026-10-31.zip`

The ZIP is 193,106,201 bytes; CRC verification passed. SHA-256: `5a8404656a3321c8035648d409990f85b49cb0383c2e8494c5bd347257f82ee8`. A separate consistent SQLite snapshot and backup manifest are beside it. The ZIP contains local configuration and is intentionally kept out of Git; the reviewed code and database are the publication artifacts. Dependency caches, build output, repeated intermediate data dumps, and old logs were backed up, not added to the submission tree.

The earlier `tenant-demo` checkout (211-test baseline, no remote) was inspected but not merged or rewritten; the current publication repository is its later sanitized successor. The publication repository's two branches are retained under their existing names.

## Deployment boundary

The source builds successfully and includes the recorded evaluation data. Deployment still requires a Node runtime supporting SQLite, persistent writable storage, and deliberate handling of the existing loopback-only API checks and authentication; this closeout does not certify a public deployment configuration. Do not deploy the local backup ZIP or replace existing runtime data with the committed reference snapshot.


## Earlier supporting reports

The root `*_VERIFICATION.md` reports, `VERIFICATION.md`, `docs/AS_BUILT_HLD_LLD.md`, and `docs/UNIFIED_*` files retain earlier checkpoint evidence. Their old counts and A1/A2/A3 labels are historical capability names, not the final one-agent/six-skill architecture. The current approved bundle is `src/journey/adaptive-approved.json`.
