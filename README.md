# Aghs Lab Hero Picker

A small, private site for two people to rank the *Aghanim's Labyrinth* (workshop) hero roster,
compare each other's calls, and random the next run. Next.js 16 · React 19 · Tailwind 4 · Neon.

## What it does

- **Tier list** — drag heroes into four plain-language tiers (**Best · Does Well · Has Potential ·
  Absolute Dogshit**) plus an Unranked tray. Not every hero has to be placed.
- **Two people, separate boards** — sign in with your own passphrase; a person toggle flips between
  your board (editable) and your friend's (read-only).
- **Builds on hover** — hover any hero to see that person's build and the hero's full legendary-shard
  list. Click a hero on your own board to pin **key shards, relics, artifacts, and notes**. All the
  shard/relic/artifact text renders with the game's own highlighting (colored keywords, glowing
  numbers, inline tooltip icons).
- **Randomizer** — narrow the pool by attribute, by tier placement, to only-unranked heroes, or a
  hand-picked subset, then roll — one shared hero or one for each of you.

Hero/shard/relic/artifact data is game-accurate, brought over from the
[AghsLabWebsite](https://github.com/James-Hillmann/AghsLabWebsite) compendium. Portraits load from
Valve's CDN, so no hero art is committed.

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. `.env.local` already has dev passphrases (`james` / `liam`) and a
session secret. Without `DATABASE_URL` set, the site works but rankings stay in-memory for the
session (they won't survive a reload) — connect Neon to persist and sync.

## Environment

All server-only — never prefix with `NEXT_PUBLIC_`. See `.env.example`.

| Variable | Purpose |
| --- | --- |
| `SESSION_SECRET` | Signs the session cookie. Generate: `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"` |
| `SITE_PASSWORD_JAMES` | James's passphrase — signing in with it attributes rankings to James. |
| `SITE_PASSWORD_LIAM` | The friend's passphrase. Must differ from James's. |
| `DATABASE_URL` | Neon Postgres connection string (from the Vercel Neon integration). |

Display names live in `lib/authors.ts` (`james` / `liam` keys, shown as “James” / “Liam”); change
the labels there if your friend goes by something else. Tier definitions live in `lib/tiers.ts`.

## Deploying (Vercel + Neon)

These steps need an interactive terminal (Vercel login is a browser flow):

```bash
npm i -g vercel@latest
vercel link
```

1. In the Vercel dashboard → **Storage / Marketplace**, add the **Neon** Postgres integration to the
   project. It sets `DATABASE_URL` automatically.
2. Add the three secrets: `vercel env add SESSION_SECRET`, `SITE_PASSWORD_JAMES`, `SITE_PASSWORD_LIAM`
   (Production + Preview).
3. Create the table:
   ```bash
   vercel env pull .env.local
   npm run db:push
   ```
4. Deploy: `vercel --prod`.

## Data model

One table, `rankings` (see `db/schema.sql`): one row per (hero, author) holding the tier, an
intra-tier position, and a `build` jsonb document. Absence of a row — or a null tier — means the
hero sits in that person's Unranked tray. Every save is an upsert on the composite key.

## Notes

- `npm audit` reports a few advisories from transitive dependencies of the pinned Next.js version;
  they don't affect this private two-user app. Revisit on the next Next.js bump rather than forcing.
