import { redirect } from 'next/navigation'

import { PasswordGate } from '@/components/PasswordGate'
import { hasSession } from '@/lib/auth-guard'

export default async function GatePage() {
  if (await hasSession()) redirect('/tiers')

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      <div className="mb-10 text-center">
        <p className="text-base font-medium tracking-wide text-accent">Aghanim&rsquo;s Labyrinth</p>
        <h1 className="mt-3 text-5xl font-extrabold tracking-tight text-ink">Hero Picker</h1>
        <p className="mx-auto mt-4 max-w-sm text-lg text-dim">
          Rank the roster, compare your calls, and random your next run.
        </p>
      </div>
      <PasswordGate />
    </main>
  )
}
