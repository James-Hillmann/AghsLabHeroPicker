// Who writes the takes. Deliberately not 'server-only': the take cards and the editor
// are client components and need the names and accents too. Nothing secret lives here --
// the passphrases stay in env, and the signed cookie is what actually proves identity.

export const AUTHORS = ['james', 'liam'] as const

export type Author = (typeof AUTHORS)[number]

export const AUTHOR_NAME: Record<Author, string> = {
  james: 'James',
  liam: 'Liam',
}

/**
 * One cold accent and one warm one, so a glance at two cards side by side tells you
 * whose is whose before you've read a word. James keeps the site's own ice glow.
 */
export const AUTHOR_COLOR: Record<Author, string> = {
  james: '#7dd3fc',
  liam: '#e0a35a',
}

export function isAuthor(value: unknown): value is Author {
  return typeof value === 'string' && (AUTHORS as readonly string[]).includes(value)
}
