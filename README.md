# Aghs Lab Hero Picker

A private site for two people to rank the roster of *Aghanim's Labyrinth III: Crisis of Infinite
Dimensions* (the Dota 2 workshop game, item `2483181385`), compare each other's calls, and random
the next run. Built with Next.js 16 · React 19 · Tailwind 4 · Neon Postgres, deployed on Vercel —
every push to `main` auto-deploys.

There is no public signup: the whole site sits behind two passphrases, one per person. Whose
passphrase you sign in with is what attributes every ranking to you.

## Features

### Tier list

- Six plain-language tiers: **Best · Very Strong · Does Well · Has Potential · Struggle Bus ·
  Absolute Dogshit**, plus an **Unranked** tray grouped by attribute (Strength / Agility /
  Intelligence / Universal). Nobody has to rank a hero they haven't played.
- Two ways to rank: **drag** a hero into a tier lane, or **click** it and pick a tier from the
  popover — the popover also moves ranked heroes and can send one back to Unranked.
- A **person toggle** flips the board between the two players. Your own board is editable; the
  other person's is read-only.
- On phones the layout adapts: the header wraps into two rows and each tier renders as a colored
  bar with its heroes below it instead of a side label.

### Patch badges

When the game updates, changed heroes get a **"!" badge** until *you* re-rank them — per person,
so each player clears their own.

- **Gold "!"** — the hero changed in the current patch.
- **Blue "!"** — the hero changed in an earlier patch and you still haven't re-ranked it since.
- **Hover the badge** for the exact per-ability changes (with ability icons), adapted from
  [arakunido's changelog](https://arakunido.com/dota2/aghslab3/changelog).

Staleness is tracked by patch *version*, not date: every ranking write stamps the current
`PATCH_VERSION` into the row's `patch` column, and the badge shows while that stamp is older than
the patch the hero last changed in (ordinal compare against `PATCH_SEQUENCE` in `lib/patch.ts`).

### Randomizer

- Filters: by **attribute**, by **tier placement** (either player's board), or **only heroes
  neither of you has ranked** — great for discovery runs.
- The **pool grid always shows all heroes**, grouped by attribute. Filters pre-select; clicking any
  hero toggles it in or out of the roll — including heroes outside the current filter (filter to
  Agility, then click one Strength hero in, if that's the mood). Select all / Clear for resets.
- Roll **one shared hero** or **one hero for each player**. The result card shows both players'
  placements for the rolled hero plus its full legendary-shard list.

### Game data, rendered like the game

Hero abilities, **legendary shards** (the game's epic upgrades), relics, and artifacts come from
the game's own files (see *Data provenance* below). Their descriptions render through
`components/RichText.tsx`, which reproduces the game's tooltip markup — colored keywords, glowing
numbers, inline tooltip icons.

### Builds (currently disabled)

There's a full build system wired up but switched off for now: hover cards showing a person's
pinned key shards / relics / artifacts / notes per hero, and an inline editor with searchable
pickers. Flip `SHOW_HOVER_CARD` in `components/board/TierBoard.tsx` to bring the cards back
(clicking currently opens the tier picker instead of the build editor).

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Without `DATABASE_URL`, the site still runs: reads come back empty and
ranking writes succeed in-memory for the session, so the UI is fully usable but nothing persists.
Point `DATABASE_URL` at Postgres to persist. **Careful:** if `.env.local` holds the production
Neon URL, local dev reads and writes the same data the live site shows.

### Environment

All server-only — never prefix with `NEXT_PUBLIC_`. See `.env.example`.

| Variable | Purpose |
| --- | --- |
| `SESSION_SECRET` | Signs the session cookie (`jose`, HS256, 30 days). Generate: `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"` |
| `SITE_PASSWORD_JAMES` | James's passphrase — signing in with it attributes rankings to James. |
| `SITE_PASSWORD_LIAM` | Liam's passphrase. Must differ, or the gate refuses everyone. |
| `DATABASE_URL` | Neon Postgres connection string (set automatically by the Vercel Neon integration). |

Auth details: constant-time passphrase comparison, per-IP rate limiting, httpOnly signed cookie.
`proxy.ts` redirects every route except the gate at `/` until the cookie is valid, and every page
and Server Action re-checks the session itself (`lib/auth-guard.ts`).

## Data model

One table, `rankings` (see `db/schema.sql`) — one row per (hero, author):

| Column | Meaning |
| --- | --- |
| `tier` | One of the six tier ids, or null for the Unranked tray. |
| `position` | Intra-tier order. Drops write a midpoint between neighbors, so one drag = one row updated. |
| `build` | jsonb document: `{ keyShards, relics, artifacts, notes }` (catalogue slugs/ids). |
| `patch` | The game patch the ranking was last set under — drives the badge logic. |
| `updated_at` | Timestamp, bumped on every write. |

Every save is an upsert on the composite key `(hero_slug, author)`, so duplicates are structurally
impossible. `npm run db:push` applies the schema idempotently (`create ... if not exists`).

## When a game patch lands

Two complementary tools:

**1. Update the badges** — edit `lib/patch.ts`:
- Bump `PATCH_VERSION` and `PATCH_DATE`, and append the new version to `PATCH_SEQUENCE`.
- In `PATCH_HEROES`, keep the older entries that are still unacknowledged and add the
  newly-changed heroes, each with `changedIn: '<new version>'` and its per-ability change list
  (source: arakunido's changelog). Ability names must match `lib/abilities.generated.ts` so the
  popover can resolve their icons.
- Push. Badges appear for everyone immediately; they clear per-person on re-rank.

**2. Find out what actually changed** — diff the game files (no Steam login needed; Dota 2 is
free-to-play, so anonymous steamcmd works):

```bash
steamcmd +force_install_dir /tmp/aghs +login anonymous +workshop_download_item 570 2483181385 +quit
LABYRINTH_VPK=/tmp/aghs/steamapps/workshop/content/570/2483181385/2483181385.vpk npm run patch:diff
```

`patch:diff` parses the ~1.7 GB workshop VPK with the pure-Node readers in `scripts/lib/` and
prints exactly which heroes/abilities changed versus the committed baseline
(`scripts/patch-baseline/abilities.json`). After handling a patch, roll the baseline forward:

```bash
LABYRINTH_VPK=... npm run patch:diff -- --update --patch 1.03G
```

macOS first-run fix for Homebrew steamcmd:
`xattr -dr com.apple.quarantine /usr/local/Caskroom/steamcmd/*/MacOS`

## Data provenance

- `lib/heroes.ts` — the roster (hand-maintained: slug, name, attribute). Portraits and ability
  icons load from **Valve's CDN**, so no hero art is committed.
- `lib/abilities.generated.ts`, `lib/relics.generated.ts`, `lib/artifacts.generated.ts` —
  generated from the game's KV files, originally by the
  [AghsLabWebsite](https://github.com/James-Hillmann/AghsLabWebsite) compendium's generator.
  Machine-owned: don't edit by hand. Legendary shards shown in the app are the `epics` on these
  abilities. Heroes added to the mod after the last regeneration (and Muerta) have no shard data
  until the files are regenerated from a fresh VPK.
- `public/artifacts/`, `public/relics/`, `public/items/`, `public/tooltip/` — the mod's own icon
  art, extracted from the VPK.

## Project structure

```
app/                    Routes: / (gate), /tiers, /random + server actions
components/
  board/TierBoard.tsx   The tier board: dnd-kit drag/drop, tier picker, patch badges + popover
  random/Randomizer.tsx Filters, clickable pool, roll animation, result card
  RichText.tsx          Renders the game's tooltip markup
lib/
  tiers.ts              Tier definitions — add/rename tiers here (one file)
  patch.ts              Patch badge data — update each game patch
  heroes.ts             Roster + Valve CDN URL helpers
  rankings*.ts          Ranking model + Neon data access
  session/auth-guard    Passphrase auth
scripts/
  patch-diff.mjs        Game-file diff vs baseline (npm run patch:diff)
  lib/                  Pure-Node VPK/KV readers
  db-push.mjs           Apply db/schema.sql (npm run db:push)
```

## Deploying from scratch

Already live? Pushing to `main` is the whole deploy. To stand up a fresh instance:

1. Import the repo at [vercel.com/new](https://vercel.com/new) (Next.js auto-detected).
2. Project → **Storage** → add the **Neon** integration with env prefix `DATABASE` (so the
   variable lands as `DATABASE_URL`), all environments.
3. Add `SESSION_SECRET`, `SITE_PASSWORD_JAMES`, `SITE_PASSWORD_LIAM` (Production + Preview).
4. `vercel env pull .env.local && npm run db:push` to create the table, then deploy.

## Customization

- **Tiers** — `lib/tiers.ts` is the single source: id, label, blurb, color. Adding/removing a tier
  also needs the `rankings_tier_check` constraint updated (see `db/schema.sql`).
- **Players** — display names/colors in `lib/authors.ts`; passphrases in env. The author keys
  (`james`/`liam`) are baked into the DB check constraint.
- **Build hover cards** — `SHOW_HOVER_CARD` in `components/board/TierBoard.tsx`.

## Notes

- `npm audit` reports a few advisories from transitive dependencies of the pinned Next.js version;
  they don't affect this private two-user app. Revisit on the next Next.js bump rather than forcing.
