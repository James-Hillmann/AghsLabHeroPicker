'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'

import { type HeroLite } from '@/components/board/TierBoard'
import { ShardRow } from '@/components/board/catalogue'
import { AUTHOR_NAME, AUTHORS, type Author } from '@/lib/authors'
import { ATTRIBUTES, ATTRIBUTE_COLOR, portraitUrl, type Attribute } from '@/lib/heroes'
import { type Build } from '@/lib/rankings'
import { legendaryShardsForHero } from '@/lib/shards'
import { TIERS, tier as tierDef, type TierId } from '@/lib/tiers'

type Entry = { tier: TierId | null; build: Build }
type RankMap = Record<Author, Record<string, Entry>>
type TierKey = TierId | 'unranked'

const ATTR_LABEL: Record<Attribute, string> = {
  strength: 'Strength',
  agility: 'Agility',
  intelligence: 'Intelligence',
  universal: 'Universal',
}

const ALL_TIER_KEYS: TierKey[] = [...TIERS.map((t) => t.id), 'unranked']

function Chip({
  on,
  onClick,
  color,
  children,
}: {
  on: boolean
  onClick: () => void
  color?: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-base font-medium transition-colors ${
        on ? 'text-ink' : 'text-dim hover:text-ink'
      }`}
      style={{
        backgroundColor: on
          ? `color-mix(in srgb, ${color ?? 'var(--accent)'} 30%, transparent)`
          : 'var(--panel-2)',
      }}
    >
      {children}
    </button>
  )
}

function Check({
  checked,
  onChange,
  children,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  children: React.ReactNode
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-lg text-ink">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 accent-[var(--accent)]"
      />
      {children}
    </label>
  )
}

export function Randomizer({
  heroes,
  viewer,
  ranks,
}: {
  heroes: HeroLite[]
  viewer: Author
  ranks: RankMap
}) {
  const heroBySlug = useMemo(() => new Map(heroes.map((h) => [h.slug, h])), [heroes])

  const [attrs, setAttrs] = useState<Set<Attribute>>(new Set())
  const [tierPerson, setTierPerson] = useState<Author>(viewer)
  const [tierKeys, setTierKeys] = useState<Set<TierKey>>(new Set(ALL_TIER_KEYS))
  const [onlyUnranked, setOnlyUnranked] = useState(false)
  const [rollEach, setRollEach] = useState(false)
  // The roll pool as an explicit selection. Changing a filter resets it to the heroes that
  // match; clicking any hero in the grid toggles just that one -- so you can add a hero from
  // outside the current filter (e.g. one Strength hero while filtered to Agility).
  const [selected, setSelected] = useState<Set<string>>(() => new Set(heroes.map((h) => h.slug)))

  const tierOf = (author: Author, slug: string): TierKey => ranks[author][slug]?.tier ?? 'unranked'

  // What the filters select, before manual clicks.
  const filtered = useMemo(() => {
    let list = heroes
    if (attrs.size > 0) list = list.filter((h) => attrs.has(h.attribute))
    if (onlyUnranked) {
      list = list.filter((h) => !ranks.james[h.slug]?.tier && !ranks.liam[h.slug]?.tier)
    } else if (tierKeys.size < ALL_TIER_KEYS.length) {
      list = list.filter((h) => tierKeys.has(tierOf(tierPerson, h.slug)))
    }
    return list
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heroes, attrs, onlyUnranked, tierKeys, tierPerson, ranks])

  // Whenever the filters change, reset the selection to exactly what they match.
  useEffect(() => {
    setSelected(new Set(filtered.map((h) => h.slug)))
  }, [filtered])

  const pool = useMemo(() => heroes.filter((h) => selected.has(h.slug)), [heroes, selected])

  const [rolling, setRolling] = useState(false)
  const [result, setResult] = useState<Record<Author, string> | { shared: string } | null>(null)
  const [face, setFace] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => () => void (timer.current && clearInterval(timer.current)), [])

  function pickRandom(from: HeroLite[], exclude?: string): string {
    const options = exclude && from.length > 1 ? from.filter((h) => h.slug !== exclude) : from
    return options[Math.floor(Math.random() * options.length)].slug
  }

  function roll() {
    if (pool.length === 0 || rolling) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const settle = () => {
      if (rollEach) {
        const a = pickRandom(pool)
        const b = pickRandom(pool, a)
        setResult({ james: a, liam: b } as Record<Author, string>)
      } else {
        setResult({ shared: pickRandom(pool) })
      }
      setRolling(false)
      setFace(null)
    }

    if (reduce) {
      settle()
      return
    }

    setResult(null)
    setRolling(true)
    let ticks = 0
    timer.current = setInterval(() => {
      setFace(pool[Math.floor(Math.random() * pool.length)].slug)
      ticks += 1
      if (ticks > 16) {
        if (timer.current) clearInterval(timer.current)
        settle()
      }
    }, 60)
  }

  function toggleSet<T>(set: Set<T>, value: T): Set<T> {
    const next = new Set(set)
    if (next.has(value)) next.delete(value)
    else next.add(value)
    return next
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="card space-y-6 p-6">
        <section>
          <p className="mb-3 text-lg font-semibold text-ink">Attribute</p>
          <div className="flex flex-wrap gap-2">
            {ATTRIBUTES.map((attribute) => (
              <Chip
                key={attribute}
                on={attrs.has(attribute)}
                color={ATTRIBUTE_COLOR[attribute]}
                onClick={() => setAttrs((s) => toggleSet(s, attribute))}
              >
                {ATTR_LABEL[attribute]}
              </Chip>
            ))}
          </div>
          <p className="mt-2 text-base text-dim">None selected = all attributes.</p>
        </section>

        <section className={onlyUnranked ? 'opacity-40' : ''}>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-lg font-semibold text-ink">Tiers</p>
            <div className="flex gap-3">
              {AUTHORS.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setTierPerson(a)}
                  className={`text-base ${tierPerson === a ? 'font-semibold text-ink' : 'text-dim'}`}
                >
                  {AUTHOR_NAME[a]}
                  {a === viewer ? ' (you)' : ''}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {TIERS.map((t) => (
              <Chip
                key={t.id}
                on={tierKeys.has(t.id)}
                color={t.color}
                onClick={() => setTierKeys((s) => toggleSet(s, t.id))}
              >
                {t.label}
              </Chip>
            ))}
            <Chip on={tierKeys.has('unranked')} onClick={() => setTierKeys((s) => toggleSet(s, 'unranked'))}>
              Unranked
            </Chip>
          </div>
        </section>

        <section className="flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-5">
          <Check checked={onlyUnranked} onChange={setOnlyUnranked}>
            Only heroes neither of you has ranked
          </Check>
          <Check checked={rollEach} onChange={setRollEach}>
            Roll one hero for each of us
          </Check>
        </section>
      </div>

      {/* Roll */}
      <div className="flex flex-wrap items-center gap-5">
        <button
          type="button"
          onClick={roll}
          disabled={pool.length === 0 || rolling}
          className="rounded-2xl bg-accent px-12 py-4 text-xl font-bold text-white transition-colors hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {rolling ? 'Rolling…' : 'Roll'}
        </button>
        <span className="text-lg text-dim">{pool.length} in pool</span>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setSelected(new Set(heroes.map((h) => h.slug)))}
            className="text-lg text-accent hover:underline"
          >
            Select all
          </button>
          <button
            type="button"
            onClick={() => setSelected(new Set())}
            className="text-lg text-dim hover:text-ink"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Result */}
      {rolling && face && heroBySlug.get(face) && (
        <div className="flex justify-center">
          <RolledHero hero={heroBySlug.get(face)!} spinning />
        </div>
      )}
      {!rolling && result && 'shared' in result && heroBySlug.get(result.shared) && (
        <div className="flex justify-center">
          <ResultCard hero={heroBySlug.get(result.shared)!} ranks={ranks} />
        </div>
      )}
      {!rolling && result && !('shared' in result) && (
        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          {AUTHORS.map((a) => {
            const hero = heroBySlug.get(result[a])
            return hero ? (
              <div key={a}>
                <p className="mb-3 text-center text-lg font-semibold text-dim">{AUTHOR_NAME[a]}</p>
                <ResultCard hero={hero} ranks={ranks} />
              </div>
            ) : null
          })}
        </div>
      )}

      {/* Pool — every hero, grouped by attribute. Filters preselect; click any to toggle. */}
      <div>
        <div className="mb-1 flex items-baseline gap-3">
          <h2 className="text-xl font-bold text-ink">Pool</h2>
          <span className="text-base text-dim">{pool.length} selected</span>
        </div>
        <p className="mb-4 text-base text-dim">
          Filters preselect heroes. Click any hero to add or remove it — even one outside the filter.
        </p>
        <div className="card space-y-7 p-5">
          {ATTRIBUTES.map((attr) => {
            const group = heroes.filter((h) => h.attribute === attr)
            return (
              <section key={attr}>
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: ATTRIBUTE_COLOR[attr] }} />
                  <h3 className="text-lg font-semibold" style={{ color: ATTRIBUTE_COLOR[attr] }}>
                    {ATTR_LABEL[attr]}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {group.map((hero) => {
                    const on = selected.has(hero.slug)
                    return (
                      <button
                        key={hero.slug}
                        type="button"
                        onClick={() => setSelected((s) => toggleSet(s, hero.slug))}
                        title={on ? `Remove ${hero.name}` : `Add ${hero.name}`}
                        className="w-20 text-left"
                      >
                        <div
                          className={`relative aspect-[3/4] overflow-hidden rounded-xl ring-2 transition ${
                            on ? 'hover:-translate-y-0.5' : 'opacity-30 grayscale'
                          }`}
                          style={{ '--tw-ring-color': ATTRIBUTE_COLOR[hero.attribute] } as React.CSSProperties}
                        >
                          <Image src={portraitUrl(hero.slug)} alt={hero.name} fill sizes="80px" className="object-cover" />
                        </div>
                        <p className={`mt-1.5 truncate text-center text-sm ${on ? 'text-dim' : 'text-dim/60'}`}>
                          {hero.name}
                        </p>
                      </button>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function RolledHero({ hero, spinning }: { hero: HeroLite; spinning?: boolean }) {
  return (
    <div
      className={`relative h-72 w-56 overflow-hidden rounded-2xl ring-4 ${spinning ? 'blur-[1px]' : ''}`}
      style={{ '--tw-ring-color': ATTRIBUTE_COLOR[hero.attribute] } as React.CSSProperties}
    >
      <Image src={portraitUrl(hero.slug)} alt={hero.name} fill sizes="224px" className="object-cover" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-3 pt-8 pb-3">
        <p className="text-center text-2xl font-bold text-white">{hero.name}</p>
      </div>
    </div>
  )
}

function ResultCard({ hero, ranks }: { hero: HeroLite; ranks: RankMap }) {
  const shards = legendaryShardsForHero(hero.slug)
  return (
    <div className="card w-full max-w-md overflow-hidden">
      <div className="flex justify-center p-5 pb-0">
        <RolledHero hero={hero} />
      </div>
      <div className="px-5 py-5">
        <div className="flex flex-wrap gap-2">
          {AUTHORS.map((a) => {
            const t = ranks[a][hero.slug]?.tier ?? null
            return (
              <span
                key={a}
                className="rounded-full px-3 py-1 text-base"
                style={{
                  color: t ? tierDef(t).color : 'var(--dim)',
                  backgroundColor: t
                    ? `color-mix(in srgb, ${tierDef(t).color} 18%, transparent)`
                    : 'var(--panel-2)',
                }}
              >
                {AUTHOR_NAME[a]}: {t ? tierDef(t).label : 'unranked'}
              </span>
            )
          })}
        </div>

        {shards.length > 0 && (
          <>
            <p className="mt-4 mb-2 text-sm font-semibold tracking-wide text-dim">Legendary Shards</p>
            <ul className="max-h-64 space-y-3 overflow-y-auto pr-1">
              {shards.map((shard) => (
                <ShardRow key={shard.id} shard={shard} />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}
