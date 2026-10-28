# Shared foundation verification

## PATH preference correction follow-up

On 2026-10-24, updated only the search-preference contract, synthetic seed, display, explicit correction script and affected fixture assertions. Active walking limit is 5 minutes; preferred range is 3–5, with closer options qualifying. Possible expansion is 10 minutes, requires separate approval and additional verified candidate count, and is not active. No search algorithm or approval workflow was added.

The explicit `scripts/apply-path-preference.ts` update saved new versions in both existing cases and retained previous versions. Browser reload after rebuilding/restarting the local foundation server displayed case 1 search version 6 and 13 events, the corrected wording, both retained cases and the existing synthetic document. Tests: 20/20 passed; typecheck and production build passed. The sandbox initially prevented binding the local port; the permitted escalation started the same loopback preview successfully. No data reset or external deployment occurred. Earlier QA evidence below describes the prior checkpoint, including its then-current versions.

Verified locally on 2026-10-24. Scope: synthetic, single-user shared storage only. A1/A2/A3 execution, paid calls, real documents, outreach and deployment are disabled and were not tested or performed.

## Automated checks — passed

- `npm test`: 20 tests passed, 0 failed (10 foundation tests and 10 preserved deterministic tests).
- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run build`: passed; active routes are `/`, `/_not-found` and `/api/foundation`.

These checks ran during implementation before the status checkpoint. The final TypeScript type-guard correction was followed by lint, typecheck and build; the full test suite was not rerun after that type-only correction. This QA follow-up changed documentation only and did not rerun those commands.

Foundation tests cover versions and history, corrected synthetic fixtures, retained fresh cases, file permissions, duplicate operation IDs and cross-case rejection, server-side agent/document access isolation, consent and negotiation approval invalidation, schema v1-to-v4 migration retaining records, child-process restart and manual resume without duplicate work, zero-cost/error history, backup/restore with document hashes and tamper rejection, invalid-field rejection, and all approved record groups.

## Local browser and recovery — passed

- Edited the synthetic unit-type field, left the field to save, refreshed and verified the saved value. Restored `studio` through a new saved version; search record is version 5.
- Generated a 161-byte synthetic evidence document; its reference survived refresh and process restart.
- Created a second synthetic case and reopened the first. Both remained available.
- Stopped and restarted the foundation server during the implementation QA. The unfinished storage-only check became interrupted. Manual resume and completion succeeded, with cost $0 and no repeated completed work.
- Opened a new browser tab and verified case selection, saved records, evidence and completed check persisted. Case 1 displayed 12 saved events.
- Created a database-plus-document backup through the UI. Restored `backup-e8adca561e2e4a08a725c9d6ae797dca` into `../foundation-data/restore-verification-20261024`: two cases and one document verified, with schema migration to version 4. The original data remained intact.
- A later schema-4 backup also exists as `backup-943ee124e63389c84453033f1ecfde7e` and its `.tar`; that later bundle was not separately restored.
- Final follow-up: reloaded `http://127.0.0.1:3000/` using the supported Mac in-app browser. The live page displayed schema 4, both saved cases, search version 5, the synthetic document and completed zero-cost check. No restart was needed in this follow-up.
- Mobile viewport 390 x 844: inspected a full-page screenshot; cards, labels, controls and all six sections were readable in a single column. DOM viewport width and document scroll width both measured 390.
- Narrow viewport 320 x 740: viewport width and document scroll width both measured 320 (no horizontal overflow). No separate full visual inspection at this size.
- Restored the browser's default viewport and retained the preview tab for the user.

## Failures, limitations and not run

- A sandbox shell `curl` probe returned connection failure (HTTP 000); the same loopback URL subsequently reloaded successfully in the supported Mac browser. The shell probe does not establish browser unavailability; its underlying network-context difference was not diagnosed further.
- No unresolved application test failure was observed. Earlier implementation type errors were corrected before the final successful build.
- Mobile checks were desktop-browser viewport checks, not physical-device, touch-keyboard or screen-reader testing. No formal accessibility audit, load test, multi-user security test or production certification was performed.
- No off-device disaster recovery was tested. Local backups cannot protect against losing this Mac.
- Storage is private to the local OS user, not encrypted or authenticated for multiple users. One app server per database is supported.
- Preference edits save on field exit; an unfinished field edit is not yet durable. Successful save acknowledgement is required.
- No actual model, research, mail, calendar, payment or signing integration was exercised.

## Preserved data and preview

Data: `../foundation-data/` (outside build and temporary directories). Database, documents and backups were preserved throughout the follow-up. Preview: http://127.0.0.1:3000/ . The existing server was left running; availability depends on that local process remaining running.
