'use client'

// Presentational helpers shared by the hover card and the result card: resolve a slug/id into
// its catalogue entry and render it with the game's own highlighting.

import Image from 'next/image'

import { RichText } from '@/components/RichText'
import { abilityIconUrl } from '@/lib/heroes'
import { getArtifact } from '@/lib/artifacts'
import { getRelic } from '@/lib/relics'
import { type LegendaryShard } from '@/lib/shards'

/** Best one-line description the game gives an artifact. */
export function artifactBlurb(slug: string): string | null {
  const artifact = getArtifact(slug)
  return artifact?.unique?.description ?? artifact?.second?.description ?? artifact?.flavor ?? null
}

function Row({
  icon,
  name,
  nameColor,
  description,
}: {
  icon: string | null
  name: string
  nameColor: string
  description: string | null
}) {
  return (
    <li className="flex gap-3">
      {icon ? (
        <Image
          src={icon}
          alt=""
          width={40}
          height={40}
          className="mt-0.5 h-10 w-10 shrink-0 rounded-lg ring-1 ring-line"
        />
      ) : (
        <span className="mt-0.5 h-10 w-10 shrink-0 rounded-lg bg-[var(--panel-2)]" />
      )}
      <div className="min-w-0">
        <p className="text-base font-semibold" style={{ color: nameColor }}>
          {name}
        </p>
        {description ? (
          <p className="text-[0.95rem] leading-snug text-ink/85">
            <RichText text={description} />
          </p>
        ) : null}
      </div>
    </li>
  )
}

export function ShardRow({ shard }: { shard: LegendaryShard }) {
  return (
    <Row
      icon={shard.iconName ? abilityIconUrl(shard.iconName) : null}
      name={shard.name}
      nameColor="#e7c15a"
      description={shard.description}
    />
  )
}

export function RelicRow({ slug }: { slug: string }) {
  const relic = getRelic(slug)
  if (!relic) return null
  return <Row icon={relic.icon} name={relic.name} nameColor="#7dd3fc" description={relic.description} />
}

export function ArtifactRow({ slug }: { slug: string }) {
  const artifact = getArtifact(slug)
  if (!artifact) return null
  return (
    <Row icon={artifact.icon} name={artifact.name} nameColor="#c98ee0" description={artifactBlurb(slug)} />
  )
}
