// Applies db/schema.sql to the database in DATABASE_URL.
//
//   npm run db:push
//
// Every statement in that file is `create table if not exists`, so this is idempotent and
// safe to re-run. It does not drop or alter anything -- schema changes to existing tables
// still need doing by hand in the Neon console, deliberately.

import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { neon } from '@neondatabase/serverless'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

/**
 * Next loads these itself, but a plain Node script doesn't. Later files lose to earlier ones
 * here, matching Next's own precedence (.env.development.local outranks .env.local).
 */
function loadEnv() {
  for (const file of ['.env.development.local', '.env.local']) {
    let contents
    try {
      contents = readFileSync(path.join(ROOT, file), 'utf8')
    } catch {
      continue
    }
    for (const line of contents.split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/)
      if (match && process.env[match[1]] === undefined) {
        process.env[match[1]] = match[2].trim().replace(/^["']|["']$/g, '')
      }
    }
  }
}

loadEnv()

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Run `vercel env pull .env.local` first.')
  process.exit(1)
}

const schema = readFileSync(path.join(ROOT, 'db', 'schema.sql'), 'utf8')

// Comments stripped before splitting so a semicolon inside one can't end a statement early.
const statements = schema
  .replace(/^\s*--.*$/gm, '')
  .split(';')
  .map((statement) => statement.trim())
  .filter(Boolean)

const sql = neon(process.env.DATABASE_URL)

for (const statement of statements) {
  const name = statement.match(/create table if not exists (\w+)/i)?.[1] ?? statement.slice(0, 40)
  await sql.query(statement)
  console.log(`  ok  ${name}`)
}

const tables = await sql.query(
  `select table_name from information_schema.tables
   where table_schema = 'public' order by table_name`,
)

console.log(`\n${statements.length} statements applied.`)
console.log(`tables: ${tables.map((row) => row.table_name).join(', ')}`)
