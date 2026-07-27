'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { leaveSite } from '@/app/actions/auth'
import { AUTHOR_COLOR, AUTHOR_NAME, type Author } from '@/lib/authors'

const TABS = [
  { href: '/tiers', label: 'Tier List' },
  { href: '/random', label: 'Randomizer' },
]

export function SiteHeader({ author }: { author: Author }) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-8 px-5">
        <Link href="/tiers" className="text-lg font-bold tracking-tight text-ink">
          Hero&nbsp;Picker
        </Link>

        <nav className="flex items-center gap-2">
          {TABS.map((tab) => {
            const active = pathname === tab.href
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-full px-4 py-2 text-base font-medium transition-colors ${
                  active
                    ? 'bg-[var(--accent-soft)] text-ink'
                    : 'text-dim hover:bg-white/5 hover:text-ink'
                }`}
              >
                {tab.label}
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <span className="flex items-center gap-2 text-base text-dim">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: AUTHOR_COLOR[author] }} />
            {AUTHOR_NAME[author]}
          </span>
          <form action={leaveSite}>
            <button type="submit" className="text-base text-dim transition-colors hover:text-ink">
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}
