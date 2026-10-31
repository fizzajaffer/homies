# Submitted demo facts and consistency

The submitted artifact is [`demo/index.html`](../demo/index.html), copied byte-for-byte from `Homies_Your_Terms_v2_Netlify_Ready_2026-10-31.zip` (member `homies-your-terms-v2/index.html`). Its SHA-256 is `d5bd81a11a2082f5796cfd416afa4e602a92637c64c96dca36580a2a78508869`. A read-only fetch of [the live demo](https://homiesrental.netlify.app) on October 31, 2026 has identical application content; Netlify adds a hosting comment and HUD script. Neither artifact nor live deployment was edited.

## Factual claims in the demo

The amounts below are the initial defaults. Requested rent, ceiling, shortlisted options, draft text, and the simulated final-response path can change during the walkthrough. Dynamic arithmetic follows the formulas below rather than an additional recorded model run.

| Claim/category | What the artifact says or calculates |
| --- | --- |
| Evaluation count and ownership | 10 formal scenarios, personally reviewed by Fizza; 8 Pass, 1 Needs work, 1 Fail. |
| Named failed scenario | `adaptive-paired-3-v01`: “Recommended an ineligible property.” **Contradicts stored review and output.** |
| Named Needs work scenario | `adaptive-paired-4-v01`: opens with “Would you consider…”; professional sample instead includes “I propose a 12-month renewal…”. |
| Evaluation provenance | Read-only display, no evaluations executed by the page; “Source: Fizza's tested backend” and original recorded verdicts retained. The execution/display distinction is correct; the claimed faithful verdict attribution is not. Only two run IDs are displayed. |
| Current lease | $2,100 base + $45 amenity = $2,145 monthly. |
| Original renewal | $2,600 base + $45 amenity = $2,645 monthly; fictional offer dated November 8, 2026. |
| Initial increase | $500/month base increase, 23.8% relative to $2,100, $6,000 over 12 months. |
| Mia's initial request | $2,200 base, amenity waived, 12 months. Target base reduction: $400/month, 15.4% of original base, $4,800 annual base savings if accepted. |
| Private ceiling | $2,265 base + amenity monthly; excluded from the generated outgoing record. This is not a full housing-cost ceiling. User-authored text still requires review. |
| Grove Courtyard (`grove`) | Grove Street; studio; 475 sq ft; $2,200 base/month; stated four-minute PATH walk; illustrative availability January 7–15, 2027. |
| Newport Terrace (`newport`) | Newport; studio; 510 sq ft; $2,240 base/month; stated three-minute PATH walk; illustrative availability January 10, 2027. |
| Property evidence | Two existing illustrative property records, simulated search results, not live listings or verified availability. A shortlist is not a reservation or viewing booking. |
| Moving estimate | Approximately $1,200 once for each move option; $0 when renewing. A quote still needs confirmation. |
| Comparison basis | Same January 16, 2027–January 15, 2028 period; 12 × monthly base + moving once. Excludes amenity and other fees, utilities, and deposits; not a fee-inclusive affordability comparison. |
| Default first-year amounts | Original renewal base $31,200; Grove $27,600 including moving; Newport $28,080 including moving. Differences versus original renewal base: Grove $3,600 lower, Newport $3,120 lower. |
| Default first counteroffer | Midpoint of $2,600 original base and requested base, rounded to cents, plus $45 amenity: initially $2,400 + $45 = $2,445. $200/month (7.7%) base reduction, $2,400 annual base reduction, $180 above the private ceiling. |
| Default successful final path | Requested base + $0 amenity: initially $2,200 total, $65 below ceiling, $400/month ($4,800/year) base reduction versus original ask; $100/month (4.8%) base increase versus current base. This is simulated, not an achieved real-world saving. |
| Held-counteroffer path | Holds the first counteroffer, initially $2,400 + $45; remains $180 above ceiling. User can preview the other deterministic response path. |
| Default final comparison | At $2,200 base renewal, staying is $26,400/year before excluded costs; Grove is $1,200 higher and Newport $1,680 higher including moving. |
| Dates | Offer received November 8, 2026; final response due December 8, 2026; current lease ends January 15, 2027; new term begins January 16, 2027. Response deadline and lease expiry are distinct. |
| Tenant-reported evidence | Six months of hot-water disruption, resolved in July; continuing amenity gaps with facilities/dates needing supporting records. Both start unselected and only selected facts enter sample text. No invented payment history or automatic compensation. |
| Evidence labels | Verified means original-source checked, but none have been checked in this demo; Tenant-reported is Mia's account; Calculated is arithmetic; Estimate is a planning assumption; Simulated is fictional records/responses. |
| Consent and writing | Warm, Professional, or Firm sample tone; editable exact text; explicit approval of wording and Fictional Leasing Team recipient before each simulated send; changed text/context requires review again. No real email. |
| Outcome and persistence | A direction to renew, negotiate, or pursue a move is not lease signing or acceptance. Journey and sent-text history are browser-memory state for the current demo session, not backend records; restarting/reloading does not create recorded Case 6 evidence. |
| Recommendation limits | Deterministic guidance favors renewal within the ceiling, otherwise a reviewed within-base-ceiling backup or further negotiation. Availability and written terms need confirmation; extra negotiation can add delay. Not a prediction of wording effectiveness or guaranteed concessions. |

## Consistency table

“Exports” means the authoritative review exports and Case 6 record set, not hypothetical values generated by the static walkthrough. “Console” is the recorded Case 6/evaluation view. Absence is stated rather than filled with invented facts.

| Fact | Demo | README | Exports | Console | Result/explanation |
| --- | --- | --- | --- | --- | --- |
| Current rent | $2,100 + $45 | $2,100 + $45 | $2,100 + $45 | $2,100 + $45 | Match. |
| Renewal ask | $2,600 + $45 | $2,600 + $45 | $2,600 + $45 | $2,600 + $45 | Match. |
| Target / ceiling | $2,200 / $2,265 | Same defaults | $2,200 / $2,265 | $2,200 / $2,265 | Match; demo defaults editable, recorded values versioned. |
| Deadline / lease end | Dec 8, 2026 / Jan 15, 2027 | Same | Same in housing/profile records | Lease end available in saved profile; desk does not surface response deadline | Stored facts match; deadline is not a desk field. |
| Offer date / comparison term | Nov 8 offer; Jan 16, 2027–Jan 15, 2028 term | Term stated as demo-only | Recorded upload/run times in October; term length 12 months | Recorded checkpoint timestamps; 12-month calculations | Demo dates are fictional presentation facts, not recorded source timestamps or confirmed lease start/end. |
| Options | Grove $2,200 base; Newport $2,240 base | Same sample names/rents, explicitly simplified | Riverside A $2,200 + $30 at checkpoint 2, later +$100; B $1,950 + $0 | Same versioned A/B | Intentional sample distinction; demo names are not Case 6 properties. |
| PATH and availability | Grove 4 min, Jan 7–15; Newport 3 min, Jan 10 | Simplified options; detailed inventory linked | A 4 min, Jan 20 then Jan 7; B 7 min, Jan 7 | A/B checkpoint details; five-minute requirement | Different sample properties; B is excluded by recorded PATH requirement. |
| Moving / annual-cost basis | $1,200 each; base × 12 + moving | Same simplified basis | A $1,200, B $500; fee-inclusive nonrefundable totals; utilities/deposits separate | Same itemized recorded costs | Intentional simplification, not equivalent total-housing figures. |
| Final offer | Success $2,200 + $0 or hold $2,400 + $45 at defaults | Both paths distinguished from recorded $2,260 + $0 | $2,260 + $0 | $2,260 + $0 | Demo response paths are not the recorded outcome. |
| Human counts | 10: 8 Pass / 1 Needs work / 1 Fail | Same | Same | Same; 0 pending | Match after reviewer-authorized restoration. |
| `adaptive-paired-3-v01` verdict | **Fail** | **Pass**, discrepancy disclosed | **Pass** | **Pass** | **Contradiction: demo assigns the wrong verdict.** |
| Paired-3 failure explanation | **Recommended an ineligible property** | Rejects ineligible alternatives; recommends conditional renewal | Saved response + human comment support conditional renewal; prior contract error retained | Human Pass; saved validation repair visible | **Contradiction: demo misstates the saved recommendation.** |
| Genuine failed run | Not named; its sole Fail is assigned elsewhere | `adaptive-legal-2-v01`: unavailable source + empty quote | Same Fail and reason | Same Fail and reason | **Omission/misattribution: actual failed run is not identified by demo.** |
| Paired-4 verdict / reason | Needs work; supplicant opening | Same; restored after reviewer confirmation | Needs work; all three revisions retained | Needs work; three receipts | Match after restoration. |
| Evals provenance statement | Claims original backend verdicts retained | Explains inaccurate failure attribution | Full original history plus authorized correction | Same history, snapshot-bound | **Contradiction in claimed fidelity: counts agree but failure ID/reason do not.** |
| Ten scenarios / ID coverage | 10 scenarios, only two named IDs/reasons | All 10 IDs; retry caveat | 10 benchmark runs including a retry | All 10 rows and retry label | Coverage limitation, not ten independent paired improvement samples. |
| Better sample wording | Direct “I propose…” sample | Improvement described; original retained | Original paired-4 “Would you consider…” output remains | Original evaluation artifact remains | Intentional separate sample; no new scored model run or rewritten benchmark. |
| Execution and simulated labels | Read-only Evals; simulated search/replies, no real send/signing | Same; distinguishes console from demo | Historical live-model runs on synthetic inputs, no new run | Saved synthetic model evaluations | Static demo displays hardcoded summaries; it does not execute stored evaluations. |
| Architecture / software tests | No backend architecture/test count asserted | One agent, six scoped skills; 229 offline tests | Prompt versions/hashes, not a test-suite summary | Uses recorded backend data | Verified against approved bundle and current test run; unrelated to the 10 review count. |

All contradictions in the Evals modal are listed separately above: wrong paired-3 verdict, wrong recommendation explanation, omission/misattribution of the legal failure, and the resulting inaccurate claim of original-backend-verdict fidelity. The modal's aggregate counts, paired-4 critique, reviewer attribution, read-only/no-execution labeling, direct-proposal sample, and ability to edit and approve text are consistent with the reviewed evidence or clearly identified as demo behavior.
