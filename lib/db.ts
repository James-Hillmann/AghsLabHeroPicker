import 'server-only'

import { neon } from '@neondatabase/serverless'

/**
 * Neon's HTTP driver rather than a pooled TCP client: each query is a one-shot fetch,
 * which is what serverless wants -- no connections to leak between invocations.
 *
 * DATABASE_URL comes from the Neon integration (`vercel env pull` to get it locally).
 */
let cached: ReturnType<typeof neon> | null = null

export function sql() {
  if (!cached) {
    const url = process.env.DATABASE_URL
    if (!url) {
      throw new DatabaseNotConfiguredError()
    }
    cached = neon(url)
  }
  return cached
}

/**
 * Thrown instead of a raw driver error so the takes UI can say "the database isn't
 * hooked up yet" rather than crashing the whole hero page.
 */
export class DatabaseNotConfiguredError extends Error {
  constructor() {
    super('DATABASE_URL is not set. Add the Neon integration and run `vercel env pull .env.local`.')
    this.name = 'DatabaseNotConfiguredError'
  }
}

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL)
}

/**
 * Postgres 42P01, `undefined_table`. Means the migration hasn't been run -- distinct from a
 * transient failure, because retrying will never fix it.
 */
export function isMissingTableError(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'code' in error && error.code === '42P01'
}

/**
 * Reads degrade to empty instead of throwing.
 *
 * isDatabaseConfigured() only checks that DATABASE_URL is set, not that anything is
 * reachable behind it or that the schema exists. Between deploying and running
 * db/schema.sql every query raises `relation does not exist` (42P01), and an unreachable
 * host fails just as hard -- either way an uncaught throw in a Server Component takes the
 * whole route down with a 500. An empty page is a far better failure than a dead one, and
 * the cause goes to the server log.
 *
 * Writes deliberately do NOT use this: if a save fails, the person needs to be told.
 */
export async function read<T>(what: string, fallback: T, run: () => Promise<T>): Promise<T> {
  if (!isDatabaseConfigured()) return fallback

  try {
    return await run()
  } catch (error) {
    console.error(`Failed to read ${what} -- has db/schema.sql been run?`, error)
    return fallback
  }
}
