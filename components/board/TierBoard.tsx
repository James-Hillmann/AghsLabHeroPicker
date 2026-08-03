'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  pointerWithin,
  rectIntersection,
  useDroppable,
  useSensor,
  useSensors,
  type CollisionDetection,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { SortableContext, arrayMove, rectSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { AUTHOR_NAME, AUTHORS, type Author } from '@/lib/authors'
import { ATTRIBUTES, ATTRIBUTE_COLOR, portraitUrl, type Attribute } from '@/lib/heroes'
import { type Build } from '@/lib/rankings'
import { setTier } from '@/app/actions/rankings'
import { isStaleForPatch, PATCH_VERSION, patchForHero, type HeroPatch } from '@/lib/patch'
import { TIERS, TIER_IDS, type TierId } from '@/lib/tiers'
import { BuildCard } from './BuildCard'

export type HeroLite = { slug: string; name: string; attribute: Attribute }
type Entry = {
  tier: TierId | null
  position: number
  build: Build
  updatedAt: string
  patchVersion: string | null
}
type PersonData = Record<string, Entry>
type AllData = Record<Author, PersonData>
type ContainerId = 'tray' | TierId
type Containers = Record<ContainerId, string[]>

// Derived from the tier list so adding/removing a tier is a one-file change in lib/tiers.ts.
const CONTAINER_IDS: ContainerId[] = [...TIER_IDS, 'tray']

// The read-only hover build card is switched off for the initial release. Everything for it is
// still wired up -- flip this to `true` to bring it back (no other change needed).
const SHOW_HOVER_CARD = false

const ATTR_LABEL: Record<Attribute, string> = {
  strength: 'Strength',
  agility: 'Agility',
  intelligence: 'Intelligence',
  universal: 'Universal',
}

function buildContainers(heroes: HeroLite[], data: PersonData): Containers {
  const out = Object.fromEntries(CONTAINER_IDS.map((id) => [id, [] as string[]])) as Containers
  for (const hero of heroes) {
    const entry = data[hero.slug]
    const cid: ContainerId = entry?.tier ?? 'tray'
    out[cid].push(hero.slug)
  }
  for (const tier of TIERS) {
    out[tier.id].sort((a, b) => (data[a]?.position ?? 0) - (data[b]?.position ?? 0))
  }
  return out
}

// Pointer-first collision detection. The default corner/center strategies measure the dragged
// item's own rect, so once a hero is sitting in one lane that lane keeps "winning" and snaps it
// back when you drag toward the adjacent lane. Detecting by the cursor's position instead lets
// whichever lane the pointer is actually over take the hero. rectIntersection is the fallback for
// the rare frame where the pointer sits in a gap between droppables.
const collisionDetection: CollisionDetection = (args) => {
  const pointerCollisions = pointerWithin(args)
  return pointerCollisions.length > 0 ? pointerCollisions : rectIntersection(args)
}

// ---------------------------------------------------------------------------

function TileVisual({
  hero,
  dragging,
  patch,
  onBadgeEnter,
  onBadgeLeave,
}: {
  hero: HeroLite
  dragging?: boolean
  patch?: HeroPatch | null
  onBadgeEnter?: (rect: DOMRect) => void
  onBadgeLeave?: () => void
}) {
  return (
    <div className={`relative w-20 ${dragging ? 'opacity-40' : ''}`}>
      {patch && (
        <span
          onMouseEnter={(e) => onBadgeEnter?.(e.currentTarget.getBoundingClientRect())}
          onMouseLeave={onBadgeLeave}
          className="patch-badge absolute -right-2 -top-2 z-10 grid h-6 w-6 place-items-center rounded-full text-sm font-extrabold text-black"
          aria-label={`Changed in patch ${PATCH_VERSION}`}
        >
          !
        </span>
      )}
      <div
        className="relative aspect-[3/4] overflow-hidden rounded-xl ring-2 transition-transform duration-150 hover:-translate-y-0.5"
        style={{ '--tw-ring-color': ATTRIBUTE_COLOR[hero.attribute] } as React.CSSProperties}
      >
        <Image src={portraitUrl(hero.slug)} alt={hero.name} fill sizes="80px" className="object-cover" />
      </div>
      <p className="mt-1.5 truncate text-center text-sm text-dim">{hero.name}</p>
    </div>
  )
}

function SortableTile({
  hero,
  editable,
  patch,
  onHover,
  onLeave,
  onOpen,
  onBadgeEnter,
  onBadgeLeave,
}: {
  hero: HeroLite
  editable: boolean
  patch: HeroPatch | null
  onHover: (slug: string, rect: DOMRect) => void
  onLeave: () => void
  onOpen: (slug: string, rect: DOMRect) => void
  onBadgeEnter: (slug: string, rect: DOMRect) => void
  onBadgeLeave: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: hero.slug,
    disabled: !editable,
  })
  const style = { transform: CSS.Translate.toString(transform), transition }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseEnter={
        SHOW_HOVER_CARD ? (e) => onHover(hero.slug, e.currentTarget.getBoundingClientRect()) : undefined
      }
      onMouseLeave={SHOW_HOVER_CARD ? onLeave : undefined}
      onClick={(e) => editable && onOpen(hero.slug, e.currentTarget.getBoundingClientRect())}
      className={editable ? 'cursor-grab touch-none active:cursor-grabbing' : 'cursor-default'}
    >
      <TileVisual
        hero={hero}
        dragging={isDragging}
        patch={patch}
        onBadgeEnter={(rect) => onBadgeEnter(hero.slug, rect)}
        onBadgeLeave={onBadgeLeave}
      />
    </div>
  )
}

function useContainerDroppable(id: ContainerId) {
  return useDroppable({ id })
}

type TileHandlers = {
  editable: boolean
  patchFor: (slug: string) => HeroPatch | null
  onHover: (slug: string, rect: DOMRect) => void
  onLeave: () => void
  onOpen: (slug: string, rect: DOMRect) => void
  onBadgeEnter: (slug: string, rect: DOMRect) => void
  onBadgeLeave: () => void
}

function Lane({
  tier,
  heroBySlug,
  slugs,
  handlers,
}: {
  tier: (typeof TIERS)[number]
  heroBySlug: Map<string, HeroLite>
  slugs: string[]
  handlers: TileHandlers
}) {
  const { setNodeRef } = useContainerDroppable(tier.id)
  return (
    <div className="card flex overflow-hidden">
      <div
        className="flex w-44 shrink-0 flex-col justify-center gap-1 px-5 py-5"
        style={{ backgroundColor: `color-mix(in srgb, ${tier.color} 15%, transparent)` }}
      >
        <p className="text-xl font-bold" style={{ color: tier.color }}>
          {tier.label}
        </p>
        <p className="text-sm text-dim">{tier.blurb}</p>
      </div>
      <SortableContext items={slugs} strategy={rectSortingStrategy}>
        <div ref={setNodeRef} className="flex min-h-[150px] flex-1 flex-wrap content-start gap-3 p-4">
          {slugs.map((slug) => {
            const hero = heroBySlug.get(slug)
            return hero ? (
              <SortableTile
                key={slug}
                hero={hero}
                editable={handlers.editable}
                patch={handlers.patchFor(slug)}
                onHover={handlers.onHover}
                onLeave={handlers.onLeave}
                onOpen={handlers.onOpen}
                onBadgeEnter={handlers.onBadgeEnter}
                onBadgeLeave={handlers.onBadgeLeave}
              />
            ) : null
          })}
        </div>
      </SortableContext>
    </div>
  )
}

function Tray({
  slugs,
  heroBySlug,
  handlers,
}: {
  slugs: string[]
  heroBySlug: Map<string, HeroLite>
  handlers: TileHandlers
}) {
  const { setNodeRef } = useContainerDroppable('tray')
  const groups = ATTRIBUTES.map((attr) => ({
    attr,
    slugs: slugs.filter((slug) => heroBySlug.get(slug)?.attribute === attr),
  }))

  return (
    <div ref={setNodeRef} className="card space-y-7 p-5">
      {groups.map((group) => (
        <section key={group.attr}>
          <div className="mb-3 flex items-center gap-2.5">
            <span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: ATTRIBUTE_COLOR[group.attr] }} />
            <h3 className="text-lg font-semibold" style={{ color: ATTRIBUTE_COLOR[group.attr] }}>
              {ATTR_LABEL[group.attr]}
            </h3>
            <span className="text-base text-dim">{group.slugs.length}</span>
          </div>
          <SortableContext items={group.slugs} strategy={rectSortingStrategy}>
            <div className="flex flex-wrap gap-3">
              {group.slugs.map((slug) => {
                const hero = heroBySlug.get(slug)
                return hero ? (
                  <SortableTile
                    key={slug}
                    hero={hero}
                    editable={handlers.editable}
                    patch={handlers.patchFor(slug)}
                    onHover={handlers.onHover}
                    onLeave={handlers.onLeave}
                    onOpen={handlers.onOpen}
                    onBadgeEnter={handlers.onBadgeEnter}
                    onBadgeLeave={handlers.onBadgeLeave}
                  />
                ) : null
              })}
              {group.slugs.length === 0 && <p className="text-base text-dim">None unranked.</p>}
            </div>
          </SortableContext>
        </section>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------

export function TierBoard({
  heroes,
  viewer,
  initial,
}: {
  heroes: HeroLite[]
  viewer: Author
  initial: AllData
}) {
  const heroBySlug = useMemo(() => new Map(heroes.map((h) => [h.slug, h])), [heroes])

  const [data, setData] = useState<AllData>(initial)
  const [viewed, setViewed] = useState<Author>(viewer)
  const [containers, setContainers] = useState<Containers>(() => buildContainers(heroes, initial[viewer]))
  const [activeId, setActiveId] = useState<string | null>(null)
  // Clicking a hero opens a small tier picker anchored to it, so you can send it to a tier
  // without dragging (or scrolling up to the lanes).
  const [assign, setAssign] = useState<{ slug: string; rect: DOMRect } | null>(null)

  const draggingRef = useRef(false)
  const editable = viewed === viewer

  // dnd-kit assigns accessibility ids from an internal counter that differs between the server
  // and client render, which trips React's hydration check. Render a static, identical board on
  // the server and first client paint, then swap to the interactive one after mount.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // A mirror of `containers` that updates synchronously, so drag handlers firing in quick
  // succession never read a stale React-state closure. The ref is the logic's source of truth;
  // the state just renders.
  const containersRef = useRef<Containers>(containers)
  const applyBoard = useCallback((next: Containers) => {
    containersRef.current = next
    setContainers(next)
  }, [])

  useEffect(() => {
    if (draggingRef.current) return
    applyBoard(buildContainers(heroes, data[viewed]))
  }, [heroes, data, viewed, applyBoard])

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

  const findContainer = useCallback((id: string): ContainerId | null => {
    if ((CONTAINER_IDS as string[]).includes(id)) return id as ContainerId
    const board = containersRef.current
    return (CONTAINER_IDS.find((cid) => board[cid].includes(id)) ?? null) as ContainerId | null
  }, [])

  const [hover, setHover] = useState<{ slug: string; rect: DOMRect } | null>(null)
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const onHover = useCallback((slug: string, rect: DOMRect) => {
    if (draggingRef.current) return
    // Unranked heroes (in the tray) have no tier and no build worth showing -- skip the card.
    if (containersRef.current.tray.includes(slug)) return
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => setHover({ slug, rect }), 140)
  }, [])
  const onLeave = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    setHover(null)
  }, [])

  // --- "changed this patch" badge + its hover popover ---
  // A hero shows the badge (for the viewed person) if it changed in the patch and that person
  // hasn't re-ranked it since. The popover is interactive (long change lists scroll), so leaving
  // the badge schedules a close that moving into the popover cancels.
  const patchFor = useCallback(
    (slug: string): HeroPatch | null => {
      const hp = patchForHero(slug)
      if (!hp) return null
      return isStaleForPatch(data[viewed][slug]?.patchVersion) ? hp : null
    },
    [data, viewed],
  )
  const [patchHover, setPatchHover] = useState<{ slug: string; rect: DOMRect } | null>(null)
  const patchTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const keepPatch = useCallback(() => {
    if (patchTimer.current) clearTimeout(patchTimer.current)
  }, [])
  const openPatch = useCallback((slug: string, rect: DOMRect) => {
    if (draggingRef.current) return
    if (patchTimer.current) clearTimeout(patchTimer.current)
    setPatchHover({ slug, rect })
  }, [])
  const closePatch = useCallback(() => {
    if (patchTimer.current) clearTimeout(patchTimer.current)
    patchTimer.current = setTimeout(() => setPatchHover(null), 160)
  }, [])

  function onDragStart(event: DragStartEvent) {
    draggingRef.current = true
    setHover(null)
    setAssign(null)
    if (patchTimer.current) clearTimeout(patchTimer.current)
    setPatchHover(null)
    setActiveId(String(event.active.id))
  }

  // Send a hero to a tier (or back to the tray) from the click-to-assign picker. Appends to the
  // end of the target tier. Mirrors onDragEnd's optimistic-write-then-revert.
  function assignTier(slug: string, tier: TierId | null) {
    const mine = data[viewer]
    const position =
      tier === null
        ? 0
        : Math.max(0, ...Object.values(mine).filter((e) => e.tier === tier).map((e) => e.position)) + 1

    const previous = data
    setData((prev) => ({
      ...prev,
      [viewer]: {
        ...prev[viewer],
        [slug]: {
          tier,
          position,
          build: prev[viewer][slug]?.build ?? { keyShards: [], relics: [], artifacts: [], notes: '' },
          updatedAt: new Date().toISOString(),
          patchVersion: PATCH_VERSION,
        },
      },
    }))
    setAssign(null)
    setTier(slug, tier, position).then((result) => {
      if (!result.ok) {
        console.error(result.error)
        setData(previous)
      }
    })
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over) return
    const activeContainer = findContainer(String(active.id))
    const overContainer = findContainer(String(over.id))
    if (!activeContainer || !overContainer || activeContainer === overContainer) return

    const prev = containersRef.current
    const activeItems = prev[activeContainer]
    const overItems = prev[overContainer]
    const overIsContainer = (CONTAINER_IDS as string[]).includes(String(over.id))
    const overIndex = overIsContainer ? overItems.length : overItems.indexOf(String(over.id))
    const insertAt = overIndex < 0 ? overItems.length : overIndex
    applyBoard({
      ...prev,
      [activeContainer]: activeItems.filter((id) => id !== String(active.id)),
      [overContainer]: [...overItems.slice(0, insertAt), String(active.id), ...overItems.slice(insertAt)],
    })
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event
    draggingRef.current = false
    setActiveId(null)
    if (!over) return

    const container = findContainer(String(active.id))
    if (!container) return

    let final = containersRef.current
    const overContainer = findContainer(String(over.id))
    if (overContainer === container && active.id !== over.id) {
      const items = final[container]
      const oldIndex = items.indexOf(String(active.id))
      const newIndex = items.indexOf(String(over.id))
      if (oldIndex >= 0 && newIndex >= 0) {
        final = { ...final, [container]: arrayMove(items, oldIndex, newIndex) }
        applyBoard(final)
      }
    }

    const slug = String(active.id)
    const tier: TierId | null = container === 'tray' ? null : container
    const list = final[container]
    const index = list.indexOf(slug)
    const posOf = (s: string | undefined, fallback: number) =>
      s ? (data[viewer][s]?.position ?? list.indexOf(s)) : fallback
    const left = index > 0 ? posOf(list[index - 1], 0) : null
    const right = index < list.length - 1 ? posOf(list[index + 1], index + 1) : null
    let position: number
    if (left !== null && right !== null) position = (left + right) / 2
    else if (left !== null) position = left + 1
    else if (right !== null) position = right - 1
    else position = 0

    const previous = data
    setData((prev) => ({
      ...prev,
      [viewer]: {
        ...prev[viewer],
        [slug]: {
          tier,
          position,
          build: prev[viewer][slug]?.build ?? { keyShards: [], relics: [], artifacts: [], notes: '' },
          updatedAt: new Date().toISOString(),
          patchVersion: PATCH_VERSION,
        },
      },
    }))

    setTier(slug, tier, position).then((result) => {
      if (!result.ok) {
        console.error(result.error)
        setData(previous)
      }
    })
  }

  const activeHero = activeId ? heroBySlug.get(activeId) : null

  const handlers: TileHandlers = {
    editable,
    patchFor,
    onHover,
    onLeave,
    onOpen: (slug, rect) => setAssign({ slug, rect }),
    onBadgeEnter: openPatch,
    onBadgeLeave: closePatch,
  }

  // Static, non-interactive mirror for SSR + first paint (see `mounted` above).
  if (!mounted) {
    return (
      <div>
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="inline-flex rounded-full border border-line p-1">
            {AUTHORS.map((author) => (
              <span
                key={author}
                className={`rounded-full px-5 py-2 text-base font-medium ${
                  author === viewed ? 'bg-[var(--accent-soft)] text-ink' : 'text-dim'
                }`}
              >
                {AUTHOR_NAME[author]}
                {author === viewer ? ' (you)' : ''}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          {TIERS.map((tier) => (
            <div key={tier.id} className="card flex overflow-hidden">
              <div
                className="flex w-44 shrink-0 flex-col justify-center gap-1 px-5 py-5"
                style={{ backgroundColor: `color-mix(in srgb, ${tier.color} 15%, transparent)` }}
              >
                <p className="text-xl font-bold" style={{ color: tier.color }}>
                  {tier.label}
                </p>
                <p className="text-sm text-dim">{tier.blurb}</p>
              </div>
              <div className="flex min-h-[150px] flex-1 flex-wrap content-start gap-3 p-4">
                {containers[tier.id].map((slug) => {
                  const hero = heroBySlug.get(slug)
                  return hero ? <TileVisual key={slug} hero={hero} patch={patchFor(slug)} /> : null
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold text-ink">
            Unranked <span className="font-medium text-dim">· {containers.tray.length}</span>
          </h2>
          <p className="mb-4 mt-1 text-base text-dim">Grouped by attribute. Drag any hero up into a tier.</p>
          <div className="card space-y-7 p-5">
            {ATTRIBUTES.map((attr) => {
              const slugs = containers.tray.filter((s) => heroBySlug.get(s)?.attribute === attr)
              return (
                <section key={attr}>
                  <div className="mb-3 flex items-center gap-2.5">
                    <span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: ATTRIBUTE_COLOR[attr] }} />
                    <h3 className="text-lg font-semibold" style={{ color: ATTRIBUTE_COLOR[attr] }}>
                      {ATTR_LABEL[attr]}
                    </h3>
                    <span className="text-base text-dim">{slugs.length}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {slugs.map((slug) => {
                      const hero = heroBySlug.get(slug)
                      return hero ? <TileVisual key={slug} hero={hero} patch={patchFor(slug)} /> : null
                    })}
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Person toggle */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="inline-flex rounded-full border border-line p-1">
          {AUTHORS.map((author) => {
            const active = viewed === author
            return (
              <button
                key={author}
                type="button"
                onClick={() => setViewed(author)}
                className={`rounded-full px-5 py-2 text-base font-medium transition-colors ${
                  active ? 'bg-[var(--accent-soft)] text-ink' : 'text-dim hover:text-ink'
                }`}
              >
                {AUTHOR_NAME[author]}
                {author === viewer ? ' (you)' : ''}
              </button>
            )
          })}
        </div>
        <p className="text-base text-dim">
          {editable
            ? 'Drag a hero to a tier, or click it to pick a tier'
            : `Viewing ${AUTHOR_NAME[viewed]}'s board — read only`}
        </p>
      </div>

      <DndContext
        id="tier-board"
        sensors={sensors}
        collisionDetection={collisionDetection}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        onDragCancel={() => {
          draggingRef.current = false
          setActiveId(null)
          applyBoard(buildContainers(heroes, data[viewed]))
        }}
      >
        <div className="space-y-3">
          {TIERS.map((tier) => (
            <Lane
              key={tier.id}
              tier={tier}
              heroBySlug={heroBySlug}
              slugs={containers[tier.id]}
              handlers={handlers}
            />
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-ink">
            Unranked <span className="font-medium text-dim">· {containers.tray.length}</span>
          </h2>
          <p className="mb-4 mt-1 text-base text-dim">
            Grouped by attribute. Click a hero to pick a tier, or drag it up.
          </p>
          <Tray slugs={containers.tray} heroBySlug={heroBySlug} handlers={handlers} />
        </div>

        <DragOverlay>{activeHero ? <TileVisual hero={activeHero} /> : null}</DragOverlay>
      </DndContext>

      {SHOW_HOVER_CARD &&
        hover &&
        heroBySlug.get(hover.slug) &&
        createPortal(
          <HoverCardLayer
            hero={heroBySlug.get(hover.slug)!}
            rect={hover.rect}
            entry={data[viewed][hover.slug]}
            personName={AUTHOR_NAME[viewed]}
          />,
          document.body,
        )}

      {assign &&
        heroBySlug.get(assign.slug) &&
        createPortal(
          <TierPicker
            hero={heroBySlug.get(assign.slug)!}
            rect={assign.rect}
            currentTier={data[viewer][assign.slug]?.tier ?? null}
            onPick={(tier) => assignTier(assign.slug, tier)}
            onClose={() => setAssign(null)}
          />,
          document.body,
        )}

      {patchHover &&
        heroBySlug.get(patchHover.slug) &&
        patchForHero(patchHover.slug) &&
        createPortal(
          <PatchPopover
            hero={heroBySlug.get(patchHover.slug)!}
            rect={patchHover.rect}
            onEnter={keepPatch}
            onLeave={closePatch}
          />,
          document.body,
        )}
    </div>
  )
}

function PatchPopover({
  hero,
  rect,
  onEnter,
  onLeave,
}: {
  hero: HeroLite
  rect: DOMRect
  onEnter: () => void
  onLeave: () => void
}) {
  const patch = patchForHero(hero.slug)!
  const width = 380
  const margin = 12
  const estH = 420
  let left = rect.right + 10
  if (left + width > window.innerWidth) left = rect.left - width - 10
  if (left < margin) left = margin
  let top = rect.top - 8
  if (top + estH > window.innerHeight) top = Math.max(margin, window.innerHeight - estH - margin)

  const tagColor: Record<string, string> = {
    ADDED: '#5fbf7a',
    CHANGED: '#7dd3fc',
    REMOVED: '#e0674a',
    REWORKED: '#e7c15a',
  }

  return (
    <div
      className="card fixed z-50 flex max-h-[70vh] w-[380px] max-w-[92vw] flex-col overflow-hidden shadow-2xl"
      style={{ left, top }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="flex items-baseline justify-between border-b border-line px-5 py-3">
        <p className="text-lg font-bold text-ink">{hero.name}</p>
        <span className="text-sm font-semibold text-[#e7c15a]">Updated · {PATCH_VERSION}</span>
      </div>
      <div className="space-y-4 overflow-y-auto px-5 py-4">
        {patch.sections.map((section) => (
          <div key={section.ability}>
            <p className="mb-1.5 text-base font-semibold text-ink">{section.ability}</p>
            <ul className="space-y-1.5">
              {section.changes.map((change, i) => (
                <li key={i} className="flex gap-2 text-[0.95rem] leading-snug text-ink/85">
                  <span
                    className="mt-0.5 shrink-0 text-xs font-bold"
                    style={{ color: tagColor[change.kind] }}
                  >
                    {change.kind}
                  </span>
                  <span>{change.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

function TierPicker({
  hero,
  rect,
  currentTier,
  onPick,
  onClose,
}: {
  hero: HeroLite
  rect: DOMRect
  currentTier: TierId | null
  onPick: (tier: TierId | null) => void
  onClose: () => void
}) {
  const width = 240
  const margin = 12
  const estH = 340
  let left = rect.left + rect.width / 2 - width / 2
  if (left + width > window.innerWidth) left = window.innerWidth - width - margin
  if (left < margin) left = margin
  let top = rect.bottom + 8
  if (top + estH > window.innerHeight) top = Math.max(margin, rect.top - estH - 8)

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        className="card fixed z-50 p-3 shadow-2xl"
        style={{ left, top, width }}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="mb-2 px-1 text-base font-semibold text-ink">{hero.name}</p>
        <div className="flex flex-col gap-1.5">
          {TIERS.map((t) => {
            const active = currentTier === t.id
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onPick(t.id)}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-base font-medium transition-colors hover:brightness-125"
                style={{ backgroundColor: `color-mix(in srgb, ${t.color} ${active ? 34 : 16}%, transparent)`, color: t.color }}
              >
                <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: t.color }} />
                {t.label}
                {active && <span className="ml-auto text-sm">current</span>}
              </button>
            )
          })}
          {currentTier && (
            <button
              type="button"
              onClick={() => onPick(null)}
              className="mt-1 rounded-lg px-3 py-2 text-left text-base text-dim transition-colors hover:bg-white/5 hover:text-ink"
            >
              Remove from tiers
            </button>
          )}
        </div>
      </div>
    </>
  )
}

function HoverCardLayer({
  hero,
  rect,
  entry,
  personName,
}: {
  hero: HeroLite
  rect: DOMRect
  entry: Entry | undefined
  personName: string
}) {
  const cardW = 416
  const margin = 14
  let left = rect.right + margin
  if (left + cardW > window.innerWidth) left = rect.left - cardW - margin
  if (left < margin) left = margin
  let top = rect.top
  const estH = 460
  if (top + estH > window.innerHeight) top = Math.max(margin, window.innerHeight - estH - margin)

  return (
    <div className="pointer-events-none fixed z-40" style={{ left, top }}>
      <BuildCard
        heroSlug={hero.slug}
        name={hero.name}
        attribute={hero.attribute}
        tier={entry?.tier ?? null}
        build={entry?.build ?? { keyShards: [], relics: [], artifacts: [], notes: '' }}
        personName={personName}
      />
    </div>
  )
}
