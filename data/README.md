# Recorded Homies data — 2026-10-31

This is a complete, consistent snapshot of the recorded synthetic capstone data, not a new evaluation run. It contains 46 tables, 7 cases, 10 adaptive benchmark records, 17 journey runs, and all 12 review-history entries (11 human entries covering 10 runs, plus one explicitly labeled UI test). Case 6 is `8050cf7d-496a-48b3-9d0d-c2101de28387`.

The SQLite online backup included committed WAL records without writing to the source database. All 46 tables were compared with the source; integrity, foreign-key checks, and the referenced document checksum passed. File checksums and table counts are in [provenance.json](provenance.json). The original working directory is `/Users/fizzajaffer/Documents/Codex/2026-10-25/task-4/working-data`.

- [foundation.sqlite](foundation.sqlite): complete database, including benchmark outputs, human review history, recorded runs, uploaded source bytes, and Case 6.
- [Current human verdicts and their history](exports/current_human_reviews.json): latest human review matching each saved output's SHA-256, using the same selection rule as the app.
- [All review entries](exports/eval_reviews.json), [benchmark records](exports/adaptive_benchmarks.json), [journey runs](exports/journey_runs.json), and [Case 6 records](exports/case6.json): readable exports. Database JSON columns remain exact strings to retain snapshot-hash fidelity; the SQLite file is authoritative.
- [Original human-review receipts](human-review-receipts.json): the original insertion receipts, not the latest-verdict index.
- `documents/`: referenced immutable synthetic evidence bytes; other uploads are stored inside SQLite.

## Human verdicts

| Run | Recorded execution status | Current human verdict |
| --- | --- | --- |
| adaptive-paired-1-v01 | completed | Pass |
| adaptive-paired-2-v01 | completed | Pass |
| adaptive-paired-3-v01 | completed | Pass |
| adaptive-paired-3-v01-retry | completed | Pass |
| adaptive-paired-4-v01 | completed | Fail |
| adaptive-legal-1-v01 | completed | Pass |
| adaptive-legal-2-v01 | failed | Fail |
| repair-undated-v1 | completed | Pass |
| repair-source-dated-v1 | completed | Pass |
| repair-legal-unavailable-v1 | completed | Pass |

There are 8 current Pass verdicts and 2 Fail verdicts. The draft run `adaptive-paired-4-v01` was revised from Needs work to Fail on October 29; both entries are preserved. The retry remains labeled as a retry, not an extra independent paired sample. Human verdicts are separate from the older assistant rubric scores and the original benchmark `humanReview: pending` metadata; neither was rewritten. A passing automated test suite does not turn a failed human evaluation into a pass.

## Running with this data

The app defaults to this `data/` directory. `TENANT_DATA_DIR` still overrides it, including values in an existing `.env.local`. Keep the committed snapshot as a reference; to retain new sessions across deployments, copy its contents to persistent writable storage and set `TENANT_DATA_DIR` to that directory. Do not overwrite existing runtime data with a fresh clone. SQLite requires a Node runtime with filesystem access; static hosting alone is insufficient.

No model calls, new human reviews, or source-data edits were made for this snapshot. Credential-signature scans of the database, evidence, and tracked source found no credentials; JSON-field inspection found token-usage counters, not authentication tokens. The local backup includes private local configuration and must not be uploaded as a public artifact.
