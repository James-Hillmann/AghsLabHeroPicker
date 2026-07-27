-- Run once against the Neon database, or via `npm run db:push`.
--
-- Every statement is `create ... if not exists`, so it only fills in what's missing and is
-- safe to re-run. Changing the shape of a table that already exists is a separate, deliberate
-- step done by hand in the Neon console.

-- One row per (hero, author). A person's whole ranking is these rows; a hero with no row --
-- or a row whose tier is null -- sits in that person's unassigned tray. Every save is an
-- upsert on the composite key, so a hero can't be recorded twice for the same person.
--
-- `build` is one jsonb document: { keyShards: [...], relics: [...], artifacts: [...], notes }.
-- Kept as a document rather than columns because it's write-whole, read-whole, and never
-- queried by its innards -- the randomizer and board only ever filter on tier.
create table if not exists rankings (
  hero_slug  text not null,
  author     text not null check (author in ('james', 'liam')),
  tier       text check (tier in ('best', 'does_well', 'has_potential', 'dogshit')),
  position   double precision not null default 0,
  build      jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (hero_slug, author)
);

-- The board's read: one author's placements, tray-and-tiers, in order.
create index if not exists rankings_author_idx on rankings (author, position);
