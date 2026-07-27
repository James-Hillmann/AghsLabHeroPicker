import 'server-only'

import { SignJWT, jwtVerify } from 'jose'

import { isAuthor, type Author } from './authors'

export const SESSION_COOKIE = 'agl_session'

/** 30 days, in seconds. */
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30

/**
 * The site has exactly two readers, and every take is attributed to one of them. The
 * author lives in the signed token rather than in a form field, so a rating can never
 * be filed under the wrong name.
 */
export type Session = { user: Author }

function secret(): Uint8Array {
  const value = process.env.SESSION_SECRET
  if (!value) {
    throw new Error('SESSION_SECRET is not set. Add it to .env.local and to the Vercel project.')
  }
  return new TextEncoder().encode(value)
}

export async function createSessionToken(user: Author): Promise<string> {
  return new SignJWT({ scope: 'compendium', user })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secret())
}

export async function readSession(token: string | undefined): Promise<Session | null> {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, secret())
    // Tokens minted before takes existed carry no author. Treating them as invalid costs
    // one re-login and keeps every downstream caller free of an "unknown user" case.
    return isAuthor(payload.user) ? { user: payload.user } : null
  } catch {
    // Expired, tampered with, or signed by an old SESSION_SECRET.
    return null
  }
}
