# Recorded Homies data

This is the complete recorded synthetic capstone dataset, with one reviewer-authorized correction appended on October 31, 2026. It contains **46 tables, 7 cases, 10 adaptive benchmark runs, 17 journey runs, and 13 review-history entries**: 12 human entries across 10 runs plus one explicitly labeled UI test. Case 6 is `8050cf7d-496a-48b3-9d0d-c2101de28387`.

## Current human verdicts

**8 Pass, 1 Needs work, 1 Fail.**

| Run | Execution status | Current human verdict |
| --- | --- | --- |
| adaptive-paired-1-v01 | completed | Pass |
| adaptive-paired-2-v01 | completed | Pass |
| adaptive-paired-3-v01 | completed | Pass |
| adaptive-paired-3-v01-retry | completed | Pass |
| adaptive-paired-4-v01 | completed | Needs work |
| adaptive-legal-1-v01 | completed | Pass |
| adaptive-legal-2-v01 | failed | Fail |
| repair-undated-v1 | completed | Pass |
| repair-source-dated-v1 | completed | Pass |
| repair-legal-unavailable-v1 | completed | Pass |

Paired-4's history is **Needs work → Fail → Needs work**. Fizza, its original reviewer, confirmed the October 29 Fail was accidental UI testing. The final entry was appended through the app's `EvalReviews.save` mechanism, bound to the unchanged benchmark snapshot hash, with this exact note: “Restored original verdict; prior Fail was an accidental status change during UI testing.” Both earlier entries remain.

Paired-3 remains Pass following the documented recommendation/selection contract repair. The genuine Fail is `adaptive-legal-2-v01`, which emitted an unavailable-source reference with an empty quotation. The unchanged static demo misattributes this failure to paired-3; see the [consistency report](../docs/DEMO_CONSISTENCY.md). The retry is not an additional independent paired sample. The older assistant scores and benchmark `humanReview: pending` metadata remain unchanged; current human verdicts come from `eval_reviews`.

## Files and provenance

- [foundation.sqlite](foundation.sqlite): complete database, including all benchmark outputs, review history, journey runs, uploaded source bytes, and Case 6.
- [Current human reviews](exports/current_human_reviews.json): latest human entry matching each saved output's SHA-256, with matching revision history; uses the same selection rule as the app.
- [All review entries](exports/eval_reviews.json), [benchmark records](exports/adaptive_benchmarks.json), [journey runs](exports/journey_runs.json), and [Case 6](exports/case6.json): readable exports. Database JSON columns remain exact strings to preserve snapshot hashes; BLOB values use an explicit base64 wrapper.
- [Original review receipts](human-review-receipts.json): original insertion receipts, intentionally preserved, not a current-verdict index. The correction receipt is in [provenance.json](provenance.json).
- `documents/`: immutable referenced synthetic evidence bytes. Other uploaded evidence is stored in SQLite.

The corrected snapshot is a byte-identical copy of the closed, fully checkpointed working database. There was no uncheckpointed WAL, and its SHA-256 matched before and after copying. Immutable read-only integrity and foreign-key checks passed. All 45 non-review tables and all 12 earlier review rows match the pre-correction snapshot exactly. Only the authorized new review row was added. Benchmark, journey-run, and Case 6 exports are unchanged; review exports and checksums were regenerated. No model calls or rescoring occurred.

The app defaults to `./data`; `TENANT_DATA_DIR` overrides it. Use a persistent writable copy for further sessions and keep one server per database. Historical local paths and backup details are in [HISTORY.md](../docs/HISTORY.md). The full local backup includes private local configuration and is not a publication artifact.
