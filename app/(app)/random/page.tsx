import { type HeroLite } from '@/components/board/TierBoard'
import { Randomizer } from '@/components/random/Randomizer'
import { requireSession } from '@/lib/auth-guard'
import { type Author } from '@/lib/authors'
import { getHeroes } from '@/lib/heroes'
import { type Build } from '@/lib/rankings'
import { getAllRankings } from '@/lib/rankings-db'
import { type TierId } from '@/lib/tiers'

type Entry = { tier: TierId | null; build: Build }

export default async function RandomPage() {
  const viewer = await requireSession()
  const rankings = await getAllRankings()

  const heroes: HeroLite[] = getHeroes().map((hero) => ({
    slug: hero.slug,
    name: hero.name,
    attribute: hero.attribute,
  }))

  const ranks: Record<Author, Record<string, Entry>> = { james: {}, liam: {} }
  for (const ranking of rankings) {
    ranks[ranking.author][ranking.heroSlug] = { tier: ranking.tier, build: ranking.build }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink">Randomizer</h1>
        <p className="mt-1 text-lg text-dim">Narrow the pool, then roll your next run.</p>
      </div>
      <Randomizer heroes={heroes} viewer={viewer} ranks={ranks} />
    </div>
  )
}
