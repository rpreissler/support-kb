# support-kb

A copy of the MEGA.dev support-desk knowledge-base export (challenge
[S01E03 · what it shows](https://hq.mega.dev/challenges/what-it-shows)), plus the page we added
about what desk ticket #4471 actually holds.

- `support-kb/` — the kb export as the desk shipped it (`exported 2026-10-04`), with two changes:
  a new page `support-kb/src/routes/kb/incidents/4471-what-it-shows/+page.svx` (plus its ledger
  component `support-kb/src/lib/kb/ProblemLedger.svelte`), and a closing record on the desk's own
  `#4471` page — corrected, not deleted: the desk's original words stand, the note adds what the
  desk's own table shows.
- `rendered/` (repo root) — both pages as the desk will see them, built from the desk's real
  components over the desk's real data.
- Issues in this repo — one ticket per problem found in #4471, each with its report count.

Every count is computed from `support-kb/src/lib/data/reports-4471.json` with the desk's own logic
(`src/lib/kb/causes.ts`: `uniqueById` then `groupByCause` over the reports merged into 4471), not
typed into prose.

This repo is public because the challenge requires it; the course only reads it. It can be deleted
once the course accepts the tickets and the page.
