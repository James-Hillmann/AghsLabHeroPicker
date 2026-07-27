'use client'

import Image from 'next/image'

import { ATTRIBUTE_COLOR, portraitUrl, type Attribute } from '@/lib/heroes'
import { type Build, isBuildEmpty } from '@/lib/rankings'
import { legendaryShardsForHero, shardsByIds } from '@/lib/shards'
import { tier as tierDef, type TierId } from '@/lib/tiers'
import { ArtifactRow, RelicRow, ShardRow } from './catalogue'

function Heading({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 mb-2 text-sm font-semibold tracking-wide text-dim first:mt-0">{children}</p>
}

export function BuildCard({
  heroSlug,
  name,
  attribute,
  tier,
  build,
  personName,
}: {
  heroSlug: string
  name: string
  attribute: Attribute
  tier: TierId | null
  build: Build
  personName: string
}) {
  const allShards = legendaryShardsForHero(heroSlug)
  const keyShards = shardsByIds(heroSlug, build.keyShards)
  const keyIds = new Set(build.keyShards)
  const otherShards = allShards.filter((shard) => !keyIds.has(shard.id))
  const empty = isBuildEmpty(build)

  return (
    <div className="card w-[26rem] max-w-[92vw] overflow-hidden shadow-2xl">
      <div className="flex items-center gap-4 border-b border-line px-5 py-4">
        <div
          className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg ring-2"
          style={{ '--tw-ring-color': ATTRIBUTE_COLOR[attribute] } as React.CSSProperties}
        >
          <Image src={portraitUrl(heroSlug)} alt={name} fill sizes="80px" className="object-cover" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-xl font-bold text-ink">{name}</p>
          {tier ? (
            <span className="text-base font-medium" style={{ color: tierDef(tier).color }}>
              {personName}: {tierDef(tier).label}
            </span>
          ) : (
            <span className="text-base text-dim">{personName}: unranked</span>
          )}
        </div>
      </div>

      <div className="max-h-[64vh] overflow-y-auto px-5 py-4">
        {empty ? (
          <p className="text-base text-dim">No build noted yet.</p>
        ) : (
          <>
            {keyShards.length > 0 && (
              <>
                <Heading>Key Shards</Heading>
                <ul className="space-y-3">
                  {keyShards.map((shard) => (
                    <ShardRow key={shard.id} shard={shard} />
                  ))}
                </ul>
              </>
            )}
            {build.relics.length > 0 && (
              <>
                <Heading>Relics</Heading>
                <ul className="space-y-3">
                  {build.relics.map((slug) => (
                    <RelicRow key={slug} slug={slug} />
                  ))}
                </ul>
              </>
            )}
            {build.artifacts.length > 0 && (
              <>
                <Heading>Artifacts</Heading>
                <ul className="space-y-3">
                  {build.artifacts.map((slug) => (
                    <ArtifactRow key={slug} slug={slug} />
                  ))}
                </ul>
              </>
            )}
            {build.notes.trim() && (
              <>
                <Heading>Notes</Heading>
                <p className="text-base leading-snug whitespace-pre-wrap text-ink/90">{build.notes}</p>
              </>
            )}
          </>
        )}

        {otherShards.length > 0 && (
          <>
            <Heading>{keyShards.length ? 'Other Legendary Shards' : 'Legendary Shards'}</Heading>
            <ul className="flex flex-wrap gap-1.5">
              {otherShards.map((shard) => (
                <li
                  key={shard.id}
                  className="rounded-md bg-[var(--panel-2)] px-2.5 py-1 text-sm text-ink/80"
                >
                  {shard.name}
                </li>
              ))}
            </ul>
          </>
        )}
        {allShards.length === 0 && (
          <p className="mt-4 text-base text-dim">No legendary shard data for this hero.</p>
        )}
      </div>
    </div>
  )
}
