// A parser for Valve KeyValues, the format the game's .kv and localization files use.
//
// The subset that actually appears in these files is small -- quoted keys, either a quoted
// value or a nested block, // line comments -- so this is a short recursive-descent parser
// rather than a dependency.
//
// Duplicate keys: Valve's own files do contain them, and the game keeps the first. parseKv
// does the same, so the values here match what the game reads.

/**
 * @returns a plain object; leaves are strings, blocks are nested objects.
 */
export function parseKv(text) {
  let i = 0

  const skipTrivia = () => {
    for (;;) {
      while (i < text.length && /\s/.test(text[i])) i++
      if (text[i] === '/' && text[i + 1] === '/') {
        while (i < text.length && text[i] !== '\n') i++
        continue
      }
      return
    }
  }

  const readToken = () => {
    skipTrivia()
    if (i >= text.length) return null

    if (text[i] === '{' || text[i] === '}') return text[i++]

    if (text[i] === '"') {
      i++
      const start = i
      while (i < text.length && text[i] !== '"') {
        // Valve escapes are rare here, but a backslash still swallows the next character --
        // without this an escaped quote would end the token early.
        if (text[i] === '\\') i++
        i++
      }
      const value = text.slice(start, i)
      i++
      return value
    }

    // Unquoted token: runs to the next whitespace or brace.
    const start = i
    while (i < text.length && !/[\s{}]/.test(text[i])) i++
    return text.slice(start, i)
  }

  const parseBlock = () => {
    const block = {}

    for (;;) {
      const key = readToken()
      if (key === null || key === '}') return block

      if (key === '{') throw new Error(`unexpected { at offset ${i}`)

      const next = readToken()
      if (next === null) throw new Error(`unexpected end of file after key "${key}"`)

      const value = next === '{' ? parseBlock() : next

      // First occurrence wins, matching the game's own behaviour.
      if (!(key in block)) block[key] = value
    }
  }

  skipTrivia()
  const root = parseBlock()

  // These files wrap everything in a single root block ("KeyValue" { ... }); unwrap it so
  // callers index straight into the entries.
  const keys = Object.keys(root)
  if (keys.length === 1 && typeof root[keys[0]] === 'object') return root[keys[0]]
  return root
}

/**
 * Valve localization files are `"token" "text"` pairs. They're parsed with the same reader
 * but returned flat, since nesting never appears and callers only ever look tokens up.
 */
export function parseLocalization(text) {
  const parsed = parseKv(text)
  const out = new Map()

  const walk = (node) => {
    for (const [key, value] of Object.entries(node)) {
      if (typeof value === 'string') out.set(key, value)
      else walk(value)
    }
  }
  walk(parsed)

  return out
}
