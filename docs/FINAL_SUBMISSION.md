# Final Homies submission and documentation reconciliation

The submitted prototype is [the live static Netlify walkthrough](https://homiesrental.netlify.app). Its exact submitted HTML is preserved at [`demo/index.html`](../demo/index.html), with SHA-256 `d5bd81a11a2082f5796cfd416afa4e602a92637c64c96dca36580a2a78508869`. The live page differs only by Netlify-injected hosting markup. No demo changes or deployment were made.

## Review correction

Before: **8 Pass, 0 Needs work, 2 Fail**. After: **8 Pass, 1 Needs work, 1 Fail**.

Fizza, the original reviewer, confirmed that the October 29 Fail on `adaptive-paired-4-v01` was accidental UI testing. The app's `EvalReviews.save` appended operation `fizza-confirmed-restore-paired4-20261031` at `2026-10-31T20:02:53.260Z`, bound to the unchanged benchmark snapshot `55ba6c260073d71a597e8d9d0137c9e4e20867bb3621aa888d7f92cc438e08c9`, restoring Needs work with the exact note: “Restored original verdict; prior Fail was an accidental status change during UI testing.”

The prior Needs work and accidental Fail are retained. `adaptive-paired-3-v01` remains Pass; its saved response recommends conditional renewal and rejects the ineligible alternatives. Its older validation error and later contract repair remain visible. `adaptive-legal-2-v01` remains the genuine human Fail because it references an unavailable source with an empty quotation. No model outputs, benchmark statuses, rubric scores, or other human verdicts were changed.

The unchanged demo incorrectly calls paired-3 Fail and says it recommended an ineligible property, omits the actual legal-failure ID, and consequently misstates its fidelity to the original backend verdicts. Its aggregate count and paired-4 wording critique agree with the corrected records. The [full fact inventory and consistency table](DEMO_CONSISTENCY.md) flags each contradiction separately.

## Preserved data and exports

The corrected database contains 46 tables, 7 cases, 10 benchmark runs, 17 journey runs, and 13 review-history entries (12 human entries across 10 runs plus one UI test). All 45 non-review tables and all 12 previous review rows were compared unchanged with a fresh pre-correction snapshot. Only the authorized revision was appended. Database integrity, foreign keys, source-document checksum, and review-to-output hash bindings were verified.

The read-only SQLite backup attempt could not open the WAL-mode database without sidecar handling. The service had already closed and fully checkpointed the database: no uncheckpointed WAL existed, and the stable main file included the 13th review. Export was completed using a byte-identical copy, verified against the working file before and after copying, then opened with immutable read-only semantics for integrity and table checks. Failed empty intermediate destinations were left outside the repository; no source data was discarded.

[`current_human_reviews.json`](../data/exports/current_human_reviews.json), [`eval_reviews.json`](../data/exports/eval_reviews.json), and [provenance/checksums](../data/provenance.json) were regenerated. Benchmark and journey-run exports were regenerated and verified byte-identical; Case 6 and the original insertion receipts remain unchanged. `data/provenance.json` records the correction receipt and authorized source change. Earlier full backups remain available; their locations and prior closeout notes are archived in [HISTORY.md](HISTORY.md).

## Documentation and verification

README now describes the final submitted static demo, its consent checkpoint, Evals section, verified case defaults, all ten recorded IDs and review reasons, and the one-agent/six-skill backend. It explicitly distinguishes simplified sample properties and response paths from recorded Case 6 and flags the demo's Evals discrepancy. Historical routes, old counts, external paths, and earlier capability framing moved to [HISTORY.md](HISTORY.md).

The verified offline software suite is **229 tests, all passing**, not the 222 quoted in the faculty note. No test files or assertions were edited. Human-evaluation counts remain a separate measure.

Final checks cover the full test suite, a clean commit diff, unchanged demo bytes, exactly one appended review, unchanged Case 6 and benchmark outputs, regenerated checksums, and the rendered `/evals` page showing **8 Human Pass, 1 Human Needs work, 1 Human Fail, 0 Human Pending**. The correction is also present in the working database used by the existing local configuration. `main` is the submission branch; the separate `console-warm-pass` branch is retained without rewriting history.

The static demo remains hosted as submitted. The optional local console needs Node with SQLite and a writable data directory; it is not deployed by this documentation task.
