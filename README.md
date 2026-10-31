# Homies — Your home. Your Terms. Always.

**[Open the submitted demo](https://homiesrental.netlify.app)**

Homies helps Mia compare a rent renewal with possible alternatives, prepare a request, and choose her next step. The submitted prototype is an interactive, simulated browser walkthrough. It includes editable drafts, a consent checkpoint for the exact wording and recipient before each simulated send, and a read-only Evals section. No live property search, model call, real email, booking, or lease acceptance occurs in this static demo.

The submitted artifact is preserved unchanged in [`demo/index.html`](demo/index.html). Its application content matches the live site; Netlify adds hosting markup. The separate Next.js console retains the recorded model evaluations, review revisions, and synthetic Case 6 evidence in [`data/`](data/README.md).

## Mia's case

These are the demo's starting values, also present in the recorded case. The requested base rent and private ceiling can be edited in the demo before the first simulated send.

| Item | Value |
| --- | --- |
| Current rent | $2,100 base + $45 amenity = $2,145/month |
| Original renewal ask | $2,600 base + $45 amenity = $2,645/month |
| Requested base rent | $2,200/month, with the amenity fee waived, for 12 months |
| Private ceiling | $2,265/month for base rent plus amenity; not a complete affordability finding |
| Final response deadline | December 8, 2026 |
| Current lease ends | January 15, 2027 |
| Demo's new comparison term | January 16, 2027–January 15, 2028 |
| Demo moving estimate | Approximately $1,200 once per move |

The demo's option names and figures are simplified samples: **Grove Courtyard, $2,200 base/month**, and **Newport Terrace, $2,240 base/month**. Its comparison uses 12 months of base rent plus the moving estimate once, not a full fee-inclusive housing cost. Its default first counteroffer is $2,400 + $45; its final simulated response either meets the $2,200 request with the fee waived or holds at $2,400 + $45. These are deterministic illustration paths, not forecasts or recorded landlord outcomes.

Recorded **Case 6** has different versioned options: Option A was **$2,230/month ($2,200 base + $30 amenity) at Checkpoint 2**, then rose to $2,300 with a $100 amenity fee. Its final recorded landlord offer is **$2,260 + $0 amenity**, not the demo's $2,200 success path. The console and [`data/exports/case6.json`](data/exports/case6.json) preserve this evidence and its history. Case 6 also tracks other monthly charges, one-time costs, utilities estimates, and refundable deposits separately.

## Evaluations

**10 recorded scenarios/runs: 8 Pass, 1 Needs work, 1 Fail.** These include one explicitly labeled retry; they are not ten independent paired improvement samples. Human verdicts are separate from automated validation and provisional assistant ratings. See the [current human reviews](data/exports/current_human_reviews.json), [complete review history](data/exports/eval_reviews.json), and [saved benchmark outputs](data/exports/adaptive_benchmarks.json).

| Recorded run ID | Current human verdict | One-line reason from the stored review |
| --- | --- | --- |
| `adaptive-paired-1-v01` | Pass | Keeps both tracks open while checking rent, timing, and PATH constraints. |
| `adaptive-paired-2-v01` | Pass | Treats the $2,230 Option A as conditional and retains verification requirements. |
| `adaptive-paired-3-v01` | Pass | Recommends conditional renewal at $2,260 + $0; rejects ineligible alternatives after the recommendation/selection contract repair. |
| `adaptive-paired-3-v01-retry` | Pass | Preserves Mia's decision authority and gives precise conditional-renewal calculations. |
| `adaptive-paired-4-v01` | Needs work | Opens with supplicant phrasing, “Would you consider…”, and needs stronger commercial framing. |
| `adaptive-legal-1-v01` | Pass | Grounds legal discussion in the supplied source and avoids unsupported remedies. |
| `adaptive-legal-2-v01` | Fail | References an unavailable legal source with an empty quotation; the validator rejects it. |
| `repair-undated-v1` | Pass | Keeps upload metadata separate from unknown statement and incident dates. |
| `repair-source-dated-v1` | Pass | Separates the explicit statement date from the upload timestamp. |
| `repair-legal-unavailable-v1` | Pass | Uses an empty claims list when the legal source is unavailable. |

**Known discrepancy in the unchanged demo:** its Evals section labels `adaptive-paired-3-v01` as Fail and says it “Recommended an ineligible property.” The stored human review is Pass; the saved response recommends conditional renewal and rejects the ineligible alternatives. The genuine documented Fail is `adaptive-legal-2-v01`, which the demo does not identify. Thus the demo's claim to retain the original backend verdicts is inaccurate for the failure ID and reason, even though its aggregate 8/1/1 counts now agree. The modal names only the Fail and Needs work entries; it does not list all ten IDs or reasons. Its paired-4 wording criticism and direct-proposal sample are consistent with the evidence.

Fizza confirmed that paired-4's October 29 change from Needs work to Fail was accidental UI testing. A new human review revision restores Needs work with the note: “Restored original verdict; prior Fail was an accidental status change during UI testing.” All prior revisions remain. No other verdict or saved model output was changed. The [consistency report](docs/DEMO_CONSISTENCY.md) lists every Evals discrepancy and the demo-versus-console differences.

## Architecture and verification

The recorded backend uses **one agent with six scoped skills**, selected by task from the approved [`mia-adaptive-v0.1` bundle](src/journey/adaptive-approved.json):

1. Chronology and contradictions (`chronology-contradictions`).
2. External discovery and coordination (`external-discovery-coordination`).
3. Lease and rights research (`lease-rights-research`).
4. Independent negotiation strategy (`independent-negotiation-strategy`).
5. Negotiation progress (`negotiation-pulse`).
6. Audience-specific writing and revision (`audience-writing-revision`).

The shared core and task-to-skill mapping live in [`src/journey/adaptive.ts`](src/journey/adaptive.ts). Next.js serves the console; SQLite preserves cases, evidence, runs, approvals, and review history. The static Netlify artifact illustrates the user journey with deterministic browser logic and does not execute this agent architecture.

The verified offline suite is **229 tests**, all passing. This software test count is separate from the ten human-reviewed benchmark runs; it does not certify that every model output passed review. See [final validation and provenance](docs/FINAL_SUBMISSION.md).

## Run the console locally

Use Node **24.21.0** and npm. From the repository:

```sh
npm ci
export TENANT_DATA_DIR="$PWD/data"
npm run build
npm run start
```

Open [the console](http://127.0.0.1:3000/console) or [Evals](http://127.0.0.1:3000/evals). The explicit variable selects the submitted database even if an older local `.env.local` points elsewhere. Viewing saved evaluations does not require a model key or make a paid call. `npm test` runs the offline suite.

The console writes new reviews to its selected database. To keep the committed reference snapshot unchanged during further work, copy `data/` to a new persistent writable directory and point `TENANT_DATA_DIR` there. Do not overwrite an existing runtime directory. Run one console server per database; the console's APIs are restricted to localhost. The submitted Netlify demo needs only static hosting and is already live; this task does not deploy or alter it.

Historical routes, earlier counts, local data paths, and earlier capability framing are archived in [`docs/HISTORY.md`](docs/HISTORY.md).
