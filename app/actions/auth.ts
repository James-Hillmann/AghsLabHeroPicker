'use server'

import { createHash, timingSafeEqual } from 'node:crypto'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { AUTHORS, type Author } from '@/lib/authors'
import { SESSION_COOKIE, SESSION_MAX_AGE, createSessionToken } from '@/lib/session'

export type GateState = { error: string | null }

const ATTEMPT_LIMIT = 8
const ATTEMPT_WINDOW_MS = 60_000

// Fixed-window limiter so a passphrase can't be brute forced from one address. Lives in
// module memory, so it resets when a serverless instance recycles and isn't shared across
// instances -- good enough for a two-person private site.
const attempts = new Map<string, { count: number; resetAt: number }>()

function rateLimit(key: string): boolean {
  const now = Date.now()
  const entry = attempts.get(key)
  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + ATTEMPT_WINDOW_MS })
    return true
  }
  entry.count += 1
  return entry.count <= ATTEMPT_LIMIT
}

/** One passphrase each, so the site knows whose ranking it's saving. They must differ. */
function credentials(): Record<Author, string> | null {
  const james = process.env.SITE_PASSWORD_JAMES
  const liam = process.env.SITE_PASSWORD_LIAM
  if (!james || !liam) return null
  if (james === liam) return null
  return { james, liam }
}

/** Length-independent constant-time comparison. */
function matches(input: string, expected: string): boolean {
  const a = createHash('sha256').update(input).digest()
  const b = createHash('sha256').update(expected).digest()
  return timingSafeEqual(a, b)
}

/**
 * Checks every passphrase without stopping at the first hit, so timing doesn't reveal which
 * was entered. The passphrases must differ, so at most one matches.
 */
function identify(password: string, expected: Record<Author, string>): Author | null {
  let found: Author | null = null
  for (const author of AUTHORS) {
    if (matches(password, expected[author])) found = author
  }
  return found
}

export async function enterSite(_prev: GateState, formData: FormData): Promise<GateState> {
  const password = formData.get('password')
  const expected = credentials()

  if (!expected) {
    console.error(
      'SITE_PASSWORD_JAMES and SITE_PASSWORD_LIAM must both be set, and must differ -- refusing every attempt.',
    )
    return { error: 'The site is not configured yet. Set both passphrases and redeploy.' }
  }

  const headerList = await headers()
  const ip = headerList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local'

  if (!rateLimit(ip)) {
    return { error: 'Too many attempts. Wait a minute and try again.' }
  }

  const author = typeof password === 'string' ? identify(password, expected) : null
  if (!author) {
    return { error: "That passphrase doesn't open the door." }
  }

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, await createSessionToken(author), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })

  // redirect() throws internally, so it must not sit inside a try/catch.
  redirect('/tiers')
}

export async function leaveSite() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
  redirect('/')
}
