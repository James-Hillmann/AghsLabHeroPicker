// A VPK v1/v2 directory reader -- enough to list an archive's contents and pull single files
// out of it. Written rather than pulled from npm because the format's directory tree is a few
// dozen lines and the alternative is a dependency that would only ever be used here.
//
// Layout: header, then a three-level tree of null-terminated strings --
//   extension\0 { path\0 { filename\0 <18-byte entry> } } -- each level ended by an empty
// string.
//
// Entry data lives either in this same file (archiveIndex 0x7fff, how the workshop VPK is
// packed) or in a numbered sibling -- pak01_dir.vpk's entries point at pak01_042.vpk and so
// on. Dota's own paks are split that way, so both cases are handled.

import { closeSync, existsSync, openSync, readSync, statSync } from 'node:fs'

const VPK_SIGNATURE = 0x55aa1234

/** archiveIndex value meaning "the bytes are in this same file, after the tree". */
const SAME_FILE = 0x7fff

export function readVpk(file) {
  const fd = openSync(file, 'r')

  const header = Buffer.alloc(28)
  readSync(fd, header, 0, 28, 0)

  if (header.readUInt32LE(0) !== VPK_SIGNATURE) {
    throw new Error(`${file}: not a VPK (bad signature)`)
  }

  const version = header.readUInt32LE(4)
  const treeSize = header.readUInt32LE(8)
  const headerSize = version === 2 ? 28 : 12

  const tree = Buffer.alloc(treeSize)
  readSync(fd, tree, 0, treeSize, headerSize)

  let cursor = 0
  const readString = () => {
    const start = cursor
    while (tree[cursor] !== 0) cursor++
    const value = tree.toString('latin1', start, cursor)
    cursor++
    return value
  }

  const entries = []

  for (;;) {
    const extension = readString()
    if (!extension) break

    for (;;) {
      const directory = readString()
      if (!directory) break

      for (;;) {
        const name = readString()
        if (!name) break

        cursor += 4 // crc, unused -- we're not verifying integrity
        const preloadBytes = tree.readUInt16LE(cursor); cursor += 2
        const archiveIndex = tree.readUInt16LE(cursor); cursor += 2
        const entryOffset = tree.readUInt32LE(cursor); cursor += 4
        const entryLength = tree.readUInt32LE(cursor); cursor += 4
        cursor += 2 // terminator

        // Small files are stored inline in the tree rather than in the data section.
        const preloadOffset = headerSize + cursor
        cursor += preloadBytes

        // ' ' is the format's stand-in for "no directory" / "no extension".
        const path =
          (directory === ' ' ? '' : `${directory}/`) +
          name +
          (extension === ' ' ? '' : `.${extension}`)

        entries.push({
          path,
          preloadBytes,
          preloadOffset,
          archiveIndex,
          entryOffset,
          entryLength,
          size: preloadBytes + entryLength,
        })
      }
    }
  }

  const dataStart = headerSize + treeSize

  // Numbered siblings are opened lazily and kept -- a single localization read touches one
  // archive, but a bulk extract would otherwise reopen the same file thousands of times.
  const splitFds = new Map()

  const splitFd = (index) => {
    if (splitFds.has(index)) return splitFds.get(index)

    // ".../pak01_dir.vpk" -> ".../pak01_042.vpk"
    const sibling = file.replace(/_dir\.vpk$/i, `_${String(index).padStart(3, '0')}.vpk`)
    if (sibling === file || !existsSync(sibling)) {
      throw new Error(`${file}: entry needs split archive ${index}, but ${sibling} is missing`)
    }

    const handle = openSync(sibling, 'r')
    splitFds.set(index, handle)
    return handle
  }

  const read = (entry) => {
    const out = Buffer.alloc(entry.size)

    if (entry.preloadBytes) {
      readSync(fd, out, 0, entry.preloadBytes, entry.preloadOffset)
    }

    if (entry.entryLength) {
      const inSameFile = entry.archiveIndex === SAME_FILE
      readSync(
        inSameFile ? fd : splitFd(entry.archiveIndex),
        out,
        entry.preloadBytes,
        entry.entryLength,
        inSameFile ? dataStart + entry.entryOffset : entry.entryOffset,
      )
    }

    return out
  }

  const close = () => {
    closeSync(fd)
    for (const handle of splitFds.values()) closeSync(handle)
    splitFds.clear()
  }

  /** Read one file by exact path. Throws rather than returning undefined -- every caller here
      wants a known file, and a silent undefined turns into a confusing failure later. */
  const readPath = (path) => {
    const entry = entries.find((candidate) => candidate.path === path)
    if (!entry) throw new Error(`${file}: no entry at ${path}`)
    return read(entry)
  }

  return { version, entries, read, readPath, close, fileSize: statSync(file).size }
}
