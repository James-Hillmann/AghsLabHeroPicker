'use client'

import { useMemo, useState, useTransition } from 'react'

import { saveBuild } from '@/app/actions/rankings'
import { ARTIFACTS } from '@/lib/artifacts'
import { RELICS } from '@/lib/relics'
import { type Build } from '@/lib/rankings'
import { legendaryShardsForHero } from '@/lib/shards'

type Option = { id: string; name: string }

function toggle(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
}

function Picker({
  label,
  accent,
  options,
  selected,
  onChange,
  searchable,
}: {
  label: string
  accent: string
  options: Option[]
  selected: string[]
  onChange: (next: string[]) => void
  searchable?: boolean
}) {
  const [query, setQuery] = useState('')
  const byId = useMemo(() => new Map(options.map((o) => [o.id, o])), [options])

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    const pool = q ? options.filter((o) => o.name.toLowerCase().includes(q)) : options
    return pool.slice(0, searchable ? 60 : pool.length)
  }, [options, query, searchable])

  return (
    <div>
      <p className="mb-2 text-base font-semibold" style={{ color: accent }}>
        {label}
      </p>

      {selected.length > 0 && (
        <div className="mb-2.5 flex flex-wrap gap-2">
          {selected.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => onChange(toggle(selected, id))}
              className="group flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[0.95rem] text-ink"
              style={{ backgroundColor: `color-mix(in srgb, ${accent} 26%, transparent)` }}
            >
              {byId.get(id)?.name ?? id}
              <span className="text-dim group-hover:text-ink">×</span>
            </button>
          ))}
        </div>
      )}

      {searchable && (
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={`Search ${label.toLowerCase()}…`}
          className="mb-2.5 w-full rounded-lg border border-line bg-[var(--panel-2)] px-3 py-2 text-base text-ink outline-none placeholder:text-dim focus:border-[var(--line-2)]"
        />
      )}

      <div className="flex max-h-40 flex-wrap gap-1.5 overflow-y-auto pr-1">
        {matches.map((option) => {
          const on = selected.includes(option.id)
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(toggle(selected, option.id))}
              className={`rounded-lg px-3 py-1.5 text-[0.95rem] transition-colors ${
                on ? 'text-ink' : 'text-dim hover:text-ink'
              }`}
              style={{
                backgroundColor: on
                  ? `color-mix(in srgb, ${accent} 30%, transparent)`
                  : 'var(--panel-2)',
              }}
            >
              {option.name}
            </button>
          )
        })}
        {matches.length === 0 && <p className="text-base text-dim">No matches.</p>}
      </div>
    </div>
  )
}

export function BuildEditor({
  heroSlug,
  name,
  initial,
  onClose,
  onSaved,
}: {
  heroSlug: string
  name: string
  initial: Build
  onClose: () => void
  onSaved: (build: Build) => void
}) {
  const [draft, setDraft] = useState<Build>(initial)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const shardOptions = useMemo<Option[]>(
    () => legendaryShardsForHero(heroSlug).map((s) => ({ id: s.id, name: s.name })),
    [heroSlug],
  )
  const relicOptions = useMemo<Option[]>(() => RELICS.map((r) => ({ id: r.slug, name: r.name })), [])
  const artifactOptions = useMemo<Option[]>(
    () => ARTIFACTS.map((a) => ({ id: a.slug, name: a.name })),
    [],
  )

  function save() {
    setError(null)
    startTransition(async () => {
      const result = await saveBuild(heroSlug, draft)
      if (result.ok) {
        onSaved(draft)
        onClose()
      } else {
        setError(result.error ?? 'Could not save.')
      }
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="card flex max-h-[88vh] w-[36rem] max-w-full flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <div>
            <p className="text-base text-dim">Build</p>
            <h2 className="text-2xl font-bold text-ink">{name}</h2>
          </div>
          <button type="button" onClick={onClose} className="text-base text-dim hover:text-ink">
            Close
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
          {shardOptions.length > 0 ? (
            <Picker
              label="Key Legendary Shards"
              accent="#e7c15a"
              options={shardOptions}
              selected={draft.keyShards}
              onChange={(keyShards) => setDraft((d) => ({ ...d, keyShards }))}
            />
          ) : (
            <p className="text-base text-dim">No legendary shard data for this hero.</p>
          )}

          <Picker
            label="Relics"
            accent="#7dd3fc"
            options={relicOptions}
            selected={draft.relics}
            onChange={(relics) => setDraft((d) => ({ ...d, relics }))}
            searchable
          />

          <Picker
            label="Artifacts"
            accent="#c98ee0"
            options={artifactOptions}
            selected={draft.artifacts}
            onChange={(artifacts) => setDraft((d) => ({ ...d, artifacts }))}
            searchable
          />

          <div>
            <p className="mb-2 text-base font-semibold text-ink">Notes</p>
            <textarea
              value={draft.notes}
              onChange={(event) => setDraft((d) => ({ ...d, notes: event.target.value }))}
              rows={3}
              placeholder="What to build around, playstyle, warnings…"
              className="w-full resize-y rounded-lg border border-line bg-[var(--panel-2)] p-3 text-base text-ink outline-none placeholder:text-dim focus:border-[var(--line-2)]"
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-line px-6 py-4">
          <p className="text-base text-[#ff9b8a]">{error}</p>
          <button
            type="button"
            onClick={save}
            disabled={pending}
            className="rounded-xl bg-accent px-7 py-2.5 text-base font-semibold text-white transition-colors hover:brightness-110 disabled:cursor-wait disabled:opacity-60"
          >
            {pending ? 'Saving…' : 'Save build'}
          </button>
        </div>
      </div>
    </div>
  )
}
