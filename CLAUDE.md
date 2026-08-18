# Claude context — Aghs Lab Hero Picker

Private two-player site (James + Liam) for ranking the *Aghanim's Labyrinth III* (Dota 2 workshop
item 2483181385) roster, comparing boards, and randoming runs. **Live on Vercel** — every push to
`main` auto-deploys. Neon Postgres. Read README.md for features, schema, and workflows; this file
holds what a fresh session can't infer from the code.

## Cautions

- **Production database:** on James's Mac, `.env.local` points `DATABASE_URL` at the *live* Neon DB.
  Local dev and db scripts read/write what James & Liam see. Never truncate; delete only your own
  test rows, surgically. Without `DATABASE_URL`, the app still runs (session-only writes).
- The generated files (`lib/*.generated.ts`) are machine-owned — never hand-edit. They were last
  regenerated a few patches ago, so shard text on recently-changed heroes is slightly stale; a full
  refresh means regenerating from a fresh VPK with the AghsLabWebsite repo's generator.
- Author keys `james`/`liam` are baked into the DB check constraints.

## Non-obvious design decisions

- **Patch badges** (`lib/patch.ts`): heroes changed in a patch show a "!" until *that person*
  re-ranks them — gold `.patch-badge` = changed in `PATCH_VERSION`, blue `.patch-badge-old` =
  changed in an older patch, still unacknowledged. Staleness is an **ordinal compare of patch
  versions** (`PATCH_SEQUENCE` vs the `patch` column stamped on every setTier) — deliberately not
  dates, because dev-machine clocks can't be trusted against patch dates.
- **Tiers** are data-driven from `lib/tiers.ts`; adding one also needs the `rankings_tier_check`
  constraint updated (DDL can't take bound params — use literal SQL).
- **Build system is wired but disabled**: `SHOW_HOVER_CARD = false` in
  `components/board/TierBoard.tsx`; clicking a hero opens the tier picker, not the build editor
  (`BuildEditor.tsx` is currently unused).
- Drag-and-drop uses pointer-based collision detection (`pointerWithin` fallback
  `rectIntersection`) — `closestCorners` caused lanes to "hold onto" dragged heroes.
- The board renders a static mirror pre-mount (dnd-kit a11y ids differ server/client and would
  trip hydration).

## When a game patch lands ("Aghs updated")

1. **Wording:** arakunido's changelog (https://arakunido.com/dota2/aghslab3/changelog). Changed
   heroes = its `hero_icons/<slug>.png` network requests; full data is bundled in its
   `useChangelogData-*.js` chunk. Version + date (DD.MM.YYYY) top of the PATCHES list. Note:
   arakunido translates the mod's Chinese text and lags a few days; in-game terms may differ
   (e.g. their "Ultimate Challenge" is "Apex Challenge" in-game).
2. **Facts:** `npm run patch:diff` — parses the workshop VPK (auto-found in a local Steam library,
   or `LABYRINTH_VPK=<path>`; anonymous `steamcmd +login anonymous +workshop_download_item 570
   2483181385` works, ~1.7 GB) and diffs hero abilities against
   `scripts/patch-baseline/abilities.json`. Roll the baseline forward after handling a patch:
   `npm run patch:diff -- --update --patch <ver>`.
3. **Apply:** in `lib/patch.ts` bump `PATCH_VERSION`/`PATCH_DATE`, append to `PATCH_SEQUENCE`,
   keep still-unacknowledged older heroes in `PATCH_HEROES`, add newly-changed ones with
   `changedIn: '<ver>'`. Ability names must match `lib/abilities.generated.ts` (icon lookup).
   New roster heroes go in `lib/heroes.ts`. Build, push — deploy is automatic.

## On hold

- **GSI match tracking** (auto-log hero + items per run): Steam Web API can't see custom games;
  the route is Dota's Game State Integration (cfg file → client POSTs JSON to a listener). Next
  step is a capture test on James's gaming PC — kit design: cfg + dependency-free Node listener
  (port 3310) logging payloads to JSONL, then verdict on what the mod populates.
