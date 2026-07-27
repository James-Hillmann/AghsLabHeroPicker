import 'server-only'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { type Author } from './authors'
import { SESSION_COOKIE, readSession } from './session'

export async function getAuthor(): Promise<Author | null> {
  const cookieStore = await cookies()
  const session = await readSession(cookieStore.get(SESSION_COOKIE)?.value)
  return session?.user ?? null
}

export async function hasSession(): Promise<boolean> {
  return (await getAuthor()) !== null
}

/**
 * Call at the top of every protected page and Server Function. The proxy already
 * redirects unauthenticated browsers, but Server Functions can sit outside its matcher,
 * so each entry point verifies for itself.
 *
 * Returns who is signed in -- writes should take the author from here, never from the
 * request body.
 */
export async function requireSession(): Promise<Author> {
  const author = await getAuthor()
  if (!author) redirect('/')
  return author
}
