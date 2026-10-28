# Tenant advocacy foundation — A1 first

Local preview: http://127.0.0.1:3000

Run from this folder: `npm run dev`. Production: `npm run build`, then `npm run start`. Node 24.21.0 and npm 11.19.0 were present; no desktop software was installed. Next.js 16.4.3, React 19.2 and TypeScript. Dependencies are project-local, lockfile retained. Homeward is a temporary working label.

## Implemented checkpoint
A1 preferences → bounded mock research → dated synthetic source/shortlist → no-match/error states. One research request, two-second timeout, zero retries. The 75-day prep date is deterministic; renewal arrival records phase change, never parses a contract. No background scheduler exists. Astra is the configured model identifier; only a mock provider exists. No SDK, key, paid API or send transport.

Separate current lease / renewal, synthetic arithmetic, dossier and A2/A3 review placeholders. A2 writing is explicitly unaccepted. Signing is only a clearly labelled explicit fixture confirmation. No actual signing, payments, messages, bank/inbox or identity sharing.

## Persistence and limits
CaseRepository, A1Repository and A3Repository isolate browser localStorage from UI. Versioned saves restore confirmed state, preferences and research outputs. Save failures are visible. Corrupt case state is preserved for explicit reset. A1 stores only the current and last successful snapshot, not an unlimited research history. Case event records contain only event type, timestamp and sequence, no dossier text. Reset discards this demo's three storage keys.

Browser-local storage is not encrypted, backed up, cross-device, multi-user or transactional across keys. Clearing browser data loses progress. Concurrent tabs can overwrite each other. Use synthetic data only. A new hosted origin starts with empty storage. Hosted migration must add authenticated per-user persistence, validation, optimistic concurrency and access controls. No hosted database has been selected.

## Sources and precedence
Read-only PRDs are in ../prds: Master v58 (114284 bytes) and template-aligned v12 (50619 bytes), retrieved through Library. Original workbooks unchanged. Current explicit task instruction overrides older PRD $2300 ceiling: comfort ceiling, income and utilities remain unknown. No private PDFs or evaluation secrets were retrieved. Drafting and real extraction are not implemented.

## Next concrete build step
Implement a server-only real ResearchAdapter with approved source access, bounded query plan, dated source snapshots and deterministic eligibility filtering. Retain mocks for regression tests. Add real provenance and failure/staleness tests before turning it on; do not treat synthetic matching as research quality evidence.

## Tonight deployment plan — revised after account checks
Prefer native OpenAI Responses API web_search with gpt-6-astra; no Tavily account is needed for the initial integration. Official docs confirm model support, allowed/blocked domains, inline URL citations and complete consulted-source retrieval. These capabilities fit bounded A1 public market research; they do not guarantee current availability, property fees or full source coverage. Keep deterministically checked fields and missing evidence separate from generated prose. Exclude Zumper as a direct modeling source. Preserve source date/reporting period separately from retrieval time.

Published standard short-context Astra pricing: $10/M input and $50/M output tokens. Native web search costs $10/1000 tool calls, plus search-content input tokens and model tokens. Two searches cost $0.02 in tool fees only, not the whole run. No paid run was made and no dollar-per-run benchmark exists. Proposed initial pilot is ONE manually supervised request, no retries/background work, standard tier, capped output and tool calls, store:false, with preflight cost bounds and an explicitly approved total ceiling before execution. A timeout is not proof billing stopped. Do not treat dashboard budget alerts as a hard application cap. Do not expose a paid route publicly without durable server-side quota reservation and authentication.

Read-only account checks: OpenAI platform is signed in, existing API credit balance $12.30, auto-reload OFF at this checkpoint. No keys viewed/copied/created, billing settings changed or model access test made. Vercel dashboard redirects to login; CLI is not installed and no project link exists. No account was created. Existing API credit is not authorization to spend it.

Hosting proposal: Vercel Hobby only if this qualifies as a non-commercial personal capstone, no upgrade/trial/purchase. Official limits currently include 100GB transfer, 1M requests, 4 CPU-hours, 300-second function duration and 100 deployments/day. Most over-limit features pause rather than incur paid overages. Vercel Authentication and All Deployments protection are included; Hobby permits one external access-request user and one shareable link. Prefer owner-only protected preview first, verify protection on both preview and production URLs, and never rely on an unlisted URL for privacy. No publishing until user signs in and approves that exact access scope.

Least-complex persistence for tonight: retain browser-local, versioned case/A1/A3 adapters on a stable protected preview origin; no shared server case database, no additional database account. Each browser profile has its own fixture; it is not per-person identity isolation on a shared device, cross-device sync or backup. Deploying to a new origin starts empty; do not claim local progress migrated. Add an explicit export/import backup before moving origins if preserving a particular demo session matters. A later hosted paid research endpoint needs durable quota storage; do not use localStorage or process memory to enforce spending. Cross-device case persistence can wait until the demo needs it, then use an authenticated owner/session-keyed database with row access checks and optimistic concurrency. No database service has been selected.

Minimal approval bundle for the parent to present:
1. Sign in to existing Vercel and approve an owner-only protected, synthetic-only Hobby preview (assuming personal/non-commercial eligibility), no upgrade or purchases.
2. Choose whether to keep A1 mock-only for that preview or approve a separately cost-bounded native OpenAI pilot. If pilot approved, user securely supplies/authorizes an app-scoped server credential through the platform secret UI; do not reuse evaluation secrets or global coding auth. No credential creation is authorized yet. No Tavily or database signup needed for the mock preview.

Data: send only approved general area/preferences and public market sources to a future research call. Never send raw lease/dossier, income, immigration or contact data. store:false does not eliminate default abuse-monitoring retention (up to 30 days per docs). No live outreach/calendar/payment/identity/signing integration.

Official sources checked 2026-10-24:
- https://developers.openai.com/api/docs/models/gpt-6-astra
- https://developers.openai.com/api/docs/guides/tools-web-search
- https://developers.openai.com/api/docs/pricing
- https://developers.openai.com/api/docs/guides/your-data
- https://vercel.com/docs/plans/hobby
- https://vercel.com/docs/deployment-protection/usage-and-pricing
- https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication

## Verification
`npm test`: five deterministic tests passed (math, state gates, repository reload/reset/corruption, provider bounds, A1 filters/errors/date).
`npm run lint`, `npm run typecheck`, `npm run build`: passed before browser QA; final rerun follows layout fix.
Browser QA: real production app loaded in in-app browser; A1 preferences/result and renewal event survived reload without replay; no-match checked. Mobile overflow found and corrected before final check.
Not tested: real service access, model quality, real PDF/image parsing, full browser/device matrix, screen reader conformance, hosted deployment, concurrent-tab consistency. Native date picker automation did not retain its test date; date arithmetic unit test passes, manual date-entry compatibility needs follow-up.

Final checks: all five tests, lint, typecheck and production build passed after the mobile fix. Browser reset cleared preferences, research result and renewal history across reload. At a 390px viewport, document width was exactly 390px (no horizontal overflow). Failed-refresh UI retained the last successful snapshot timestamp. Versioned A1-selection → A3-consent/cost/appointment types are in src/lib/handoff.ts; A3 execution is now implemented as a deterministic simulation only; see the minimum A3 checkpoint below.

## Minimum A3 checkpoint
Implemented inside the same app: shortlist selection, explicit selected-option/availability consent, simulated property question, partial base reply, fee/deposit reply, requested/confirmed/conflicting appointment and revocation. Separate localStorage repository, versioned consent and stable event IDs. New A1 run invalidates old-run action authority. Maximum 40 local events; no retries or external execution. The single synthetic time window is fixed for this fixture, not a general scheduling engine. Ten unit tests, lint, typecheck and production build passed. Browser tested partial replies, confirmed appointment surviving reload with exactly seven events, revocation preserving past appointment, and 390px layout with no horizontal overflow. Conflict and stale-consent branches tested in unit tests; no real service exercised.
