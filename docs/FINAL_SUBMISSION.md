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
