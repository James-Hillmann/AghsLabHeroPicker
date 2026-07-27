import Image from 'next/image'

/** An opening `[[kind]]` / `[[kind:param]]`, or the universal `[[/]]` close. */
const TOKEN = /\[\[(?:(\/)|([a-z]+)(?::([^\]]+))?)\]\]/gi

/**
 * An icon marker's parameter is a path stem under public/, e.g. `tooltip/aghs-shard`. Checked
 * rather than trusted: it goes straight into a `src`, and the generator is the only thing that
 * should ever be writing one.
 */
const ICON_PATH = /^[a-z0-9-]+\/[a-z0-9-]+$/

type Frame = { kind: string; param?: string; nodes: React.ReactNode[] }

function wrap(frame: Frame, key: number): React.ReactNode {
  if (frame.kind === 'color' && frame.param) {
    return (
      <span key={key} style={{ color: frame.param }}>
        {frame.nodes}
      </span>
    )
  }
  if (frame.kind === 'value') {
    return (
      <span key={key} className="font-semibold tabular-nums" style={{ color: 'var(--value)' }}>
        {frame.nodes}
      </span>
    )
  }
  if (frame.kind === 'ref') {
    return (
      <span key={key} className="underline decoration-dotted underline-offset-2">
        {frame.nodes}
      </span>
    )
  }
  if (frame.kind === 'head') {
    // Item tooltips break themselves into "Active: …" / "Passive: …" sections with an inline
    // heading the other catalogues' strings don't use. Rendered as its own line so the header
    // reads as a header rather than running into the sentence after it.
    return (
      <span key={key} className="mt-2 block text-[0.95em] font-semibold text-dim first:mt-0">
        {frame.nodes}
      </span>
    )
  }
  if (frame.kind === 'icon' && frame.param && ICON_PATH.test(frame.param)) {
    // The game draws these inline and writes around them -- "converted into <shard>" means
    // nothing without the picture. Sized in em so it tracks the surrounding text at any font
    // size, and nudged down onto the baseline rather than sitting on top of it. The label
    // carries the meaning for anyone the picture doesn't reach.
    // alt/title take a string, and a label is always plain text out of the generator -- but
    // filter rather than join blindly, so a stray nested marker can't render "[object Object]".
    const label = frame.nodes.filter((node) => typeof node === 'string').join('')
    return (
      <Image
        key={key}
        src={`/${frame.param}.png`}
        alt={label}
        title={label}
        width={32}
        height={32}
        className="mx-0.5 inline-block h-[1.15em] w-auto align-[-0.2em]"
      />
    )
  }
  // An unknown marker still shouldn't eat its contents.
  return <span key={key}>{frame.nodes}</span>
}

/**
 * Renders the `[[color:#hex]]...[[/]]` / `[[value]]...[[/]]` / `[[ref]]...[[/]]` /
 * `[[head]]...[[/]]` / `[[icon:path]]label[[/]]` markers the generators embed in catalogue text (see
 * `resolveTemplate` in scripts/lib/text.mjs) as styled spans, mirroring the game's own tooltip
 * highlighting -- element keywords in their real color, substituted numbers glowing,
 * self-references underlined, and the pictures the game draws inline. Every
 * description/note/special field that comes out of a generator must render through this rather
 * than as plain text, or the marker syntax shows up literally.
 *
 * Markers nest: a colored keyword can contain a substituted number, as in Battery Assault's
 * "up to [[color:#f0ad4e]][[value]]4[[/]] enemies[[/]]". That's why this walks a stack instead
 * of matching a non-greedy regex -- a lazy match closes the outer marker on the *inner* `[[/]]`
 * and spills the rest of the run onto the page as literal text.
 *
 * Malformed input degrades rather than throwing: an unmatched close is dropped, and anything
 * left open at the end is closed implicitly, so its text still renders.
 */
export function RichText({ text }: { text: string }) {
  const root: Frame = { kind: 'root', nodes: [] }
  const stack: Frame[] = [root]
  let cursor = 0
  let key = 0

  const close = () => {
    const frame = stack.pop()
    if (frame) stack[stack.length - 1].nodes.push(wrap(frame, key++))
  }

  for (const match of text.matchAll(TOKEN)) {
    const [whole, isClose, kind, param] = match
    const index = match.index ?? 0

    if (index > cursor) stack[stack.length - 1].nodes.push(text.slice(cursor, index))
    cursor = index + whole.length

    if (isClose) {
      // A close with nothing open is the generator's problem, not the reader's -- drop it.
      if (stack.length > 1) close()
    } else {
      stack.push({ kind, param, nodes: [] })
    }
  }

  if (cursor < text.length) stack[stack.length - 1].nodes.push(text.slice(cursor))
  while (stack.length > 1) close()

  return <>{root.nodes}</>
}
