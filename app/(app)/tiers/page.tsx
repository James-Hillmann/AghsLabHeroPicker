import { TierBoard, type HeroLite } from '@/components/board/TierBoard'
import { requireSession } from '@/lib/auth-guard'
import { type Author } from '@/lib/authors'
import { getHeroes } from '@/lib/heroes'
import { type Build } from '@/lib/rankings'
import { getAllRankings } from '@/lib/rankings-db'
import { type TierId } from '@/lib/tiers'

type Entry = { tier: TierId | null; position: number; build: Build }

export default async function TiersPage() {
  const viewer = await requireSession()
  const rankings = await getAllRankings()

  const heroes: HeroLite[] = getHeroes().map((hero) => ({
    slug: hero.slug,
    name: hero.name,
    attribute: hero.attribute,
  }))

  const initial: Record<Author, Record<string, Entry>> = { james: {}, liam: {} }
  for (const ranking of rankings) {
    initial[ranking.author][ranking.heroSlug] = {
      tier: ranking.tier,
      position: ranking.position,
      build: ranking.build,
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink">Tier List</h1>
        <p className="mt-1 text-lg text-dim">
          Rank what you&rsquo;ve played &mdash; drag heroes in, or click one to pick a tier.
        </p>
      </div>
      <TierBoard heroes={heroes} viewer={viewer} initial={initial} />
    </div>
  )
}
