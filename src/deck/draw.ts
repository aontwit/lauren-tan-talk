import { createShapeId, type Editor, type TLShape, type TLShapeId, type TLShapePartial } from 'tldraw'
import { BOLD_STROKE_SCALE, L, LINE, STROKE_SCALE, TEXT, TONE, TOP, W, type TextKind, type Tone } from './theme'

export type Fill = 'paper' | 'tint' | 'none'
export type Dash = 'draw' | 'dashed' | 'dotted' | 'solid'
export type Align = 'start' | 'middle' | 'end'

export interface ShapeRecord {
  id: TLShapeId
  type: string
  step: number
}

/** Drawing context for one slide. Coordinates are slide-local (0..1920, 0..1080). */
export interface Ctx {
  slideId: string
  ox: number
  oy: number
  step: number
  n: number
  shapes: TLShapePartial[]
  records: ShapeRecord[]
}

export function makeCtx(slideId: string, ox: number, oy: number): Ctx {
  return { slideId, ox, oy, step: 0, n: 0, shapes: [], records: [] }
}

/** Everything drawn inside fn appears on click number `step` (0 = on arrival). */
export function at(c: Ctx, step: number, fn: () => void) {
  const prev = c.step
  c.step = step
  fn()
  c.step = prev
}

function push(c: Ctx, type: string, x: number, y: number, props: Record<string, unknown>, extra: Record<string, unknown> = {}) {
  const id = createShapeId(`${c.slideId}-${c.n++}`)
  c.shapes.push({
    id,
    type,
    x: c.ox + x,
    y: c.oy + y,
    opacity: 1,
    meta: { slide: c.slideId, step: c.step },
    props,
    ...extra,
  } as TLShapePartial)
  c.records.push({ id, type, step: c.step })
  return id
}

/*
 * Thai line breaks. Chrome finds Thai word boundaries with ICU's dictionary,
 * which gets common words wrong ("ทุกรอบ" breaks as "ทุกร|อบ"). So Thai is
 * broken the way slides are typeset by hand: at the spaces between phrases.
 * Inside a phrase every letter is glued with WORD JOINER (U+2060, invisible).
 * A phrase too long for one line may also break between dictionary words,
 * but never next to a piece shorter than 3 letters, which is where the
 * dictionary's mistakes show up.
 */
const THAI = /[\u0E00-\u0E7F]/
// Thai letters that start a new cell; combining vowels and tone marks (and ำ) are left alone
const GLUE = /([\u0E00-\u0E7F])(?=[\u0E01-\u0E30\u0E32\u0E3F-\u0E46\u0E4F-\u0E5B])/g
const LONG_PHRASE = 18
// compounds the dictionary splits but a reader sees as one word
const KEEP = new Set(['เก็บกวาด', 'ตัวเล็ก', 'ตัวใหญ่'])
const segmenter = typeof Intl !== 'undefined' && 'Segmenter' in Intl ? new Intl.Segmenter('th', { granularity: 'word' }) : null

export function thaiBreaks(src: string) {
  return src
    .split(/(\s+)/)
    .map((run) => {
      if (!THAI.test(run)) return run
      let pieces = [run]
      if (run.length > LONG_PHRASE && segmenter) {
        pieces = []
        for (const { segment } of segmenter.segment(run)) {
          const prev = pieces[pieces.length - 1]
          if (prev !== undefined && (segment.length < 3 || prev.length < 3 || KEEP.has(prev + segment))) pieces[pieces.length - 1] = prev + segment
          else pieces.push(segment)
        }
      }
      return pieces.map((p) => p.replace(GLUE, '$1\u2060')).join('\u200B')
    })
    .join('')
}

/**
 * Rich text for tldraw. "\n" starts a new paragraph, **text** is bold.
 */
export function rt(src: string) {
  const content = src.split('\n').map((line) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g).filter(Boolean)
    const inline = parts.map((p) =>
      p.startsWith('**') && p.endsWith('**')
        ? { type: 'text', text: thaiBreaks(p.slice(2, -2)), marks: [{ type: 'bold' }] }
        : { type: 'text', text: thaiBreaks(p) },
    )
    return inline.length ? { type: 'paragraph', content: inline } : { type: 'paragraph' }
  })
  return { type: 'doc', content }
}

export interface TextOpts {
  w?: number
  kind?: TextKind
  tone?: Tone
  align?: Align
  rotation?: number
}

export function text(c: Ctx, x: number, y: number, s: string, o: TextOpts = {}) {
  const [size, scale] = TEXT[o.kind ?? 'body']
  const fixed = o.w !== undefined
  return push(
    c,
    'text',
    x,
    y,
    {
      richText: rt(s),
      size,
      scale,
      color: TONE[o.tone ?? 'ink'],
      font: 'draw',
      textAlign: o.align ?? 'start',
      autoSize: !fixed,
      w: fixed ? o.w! / scale : 8,
    },
    o.rotation ? { rotation: o.rotation } : {},
  )
}

export interface BoxOpts {
  tone?: Tone
  fill?: Fill
  dash?: Dash
  geo?: 'rectangle' | 'ellipse' | 'oval' | 'cloud' | 'diamond'
  label?: string
}

/** A hand-drawn box. Labels are always one size, so boxes never compete on type. */
export function box(c: Ctx, x: number, y: number, w: number, h: number, o: BoxOpts = {}) {
  return push(c, 'geo', x, y, {
    geo: o.geo ?? 'rectangle',
    w,
    h,
    color: TONE[o.tone ?? 'ink'],
    labelColor: 'black',
    // tldraw: 'semi' fills with paper white, 'solid' fills with the color's light tint.
    fill: o.fill === 'tint' ? 'solid' : o.fill === 'none' ? 'none' : 'semi',
    dash: o.dash ?? 'draw',
    size: 'm',
    font: 'draw',
    richText: rt(o.label ?? ''),
    align: 'middle',
    verticalAlign: 'middle',
    scale: STROKE_SCALE,
  })
}

/**
 * A step number written by hand, the way Lauren numbers things on her
 * canvas. No circle around it: numbered bubbles read as template filler.
 * d is the old bubble size, kept so callers can say "big" or "small".
 */
export function numeral(c: Ctx, x: number, y: number, label: string, d = 72, tone: Tone = 'accent') {
  const big = d >= 100
  return text(c, x, y - (big ? 18 : 8), `**${label}**`, { kind: big ? 'display' : 'title', tone })
}

export interface ArrowOpts {
  tone?: Tone
  bend?: number
  head?: boolean
  dash?: Dash
  bold?: boolean
}

export function arrow(c: Ctx, x1: number, y1: number, x2: number, y2: number, o: ArrowOpts = {}) {
  return push(c, 'arrow', x1, y1, {
    start: { x: 0, y: 0 },
    end: { x: x2 - x1, y: y2 - y1 },
    bend: o.bend ?? 0,
    color: TONE[o.tone ?? 'ink'],
    dash: o.dash ?? 'draw',
    size: 'm',
    arrowheadStart: 'none',
    arrowheadEnd: o.head === false ? 'none' : 'arrow',
    scale: o.bold ? BOLD_STROKE_SCALE : STROKE_SCALE,
  })
}

/** A plain hand-drawn line (an arrow without heads). */
export function line(c: Ctx, x1: number, y1: number, x2: number, y2: number, o: Omit<ArrowOpts, 'head'> = {}) {
  return arrow(c, x1, y1, x2, y2, { ...o, head: false })
}

export function note(c: Ctx, x: number, y: number, s: string, tone: Tone = 'note', scale = 1.5) {
  return push(c, 'note', x, y, {
    color: TONE[tone],
    size: 'm',
    font: 'draw',
    richText: rt(s),
    align: 'middle',
    verticalAlign: 'middle',
    scale,
  })
}

export function custom(c: Ctx, type: string, x: number, y: number, props: Record<string, unknown>) {
  return push(c, type, x, y, props)
}

/* ---------- layout helpers built on the primitives ---------- */

/** Slide title. Returns the y where content can start. */
export function title(c: Ctx, s: string, lines = 1) {
  text(c, L, TOP, s, { kind: 'title', w: W })
  return TOP + LINE.title * lines + 28
}

/** One line under the title that states the problem Lauren raised. */
export function kicker(c: Ctx, y: number, s: string) {
  text(c, L, y, s, { kind: 'small', w: W, tone: 'ink' })
  return y + LINE.small + 28
}

export interface CardOpts {
  kick?: string
  kickTone?: Tone
  head?: string
  headKind?: TextKind
  headLines?: number
  body?: string
  bodyKind?: TextKind
  tone?: Tone
  fill?: Fill
  dash?: Dash
  pad?: number
  /** extra room above the text, e.g. for a step number drawn separately */
  top?: number
}

/** A box with an optional kicker, heading and body stacked inside. */
export function card(c: Ctx, x: number, y: number, w: number, h: number, o: CardOpts) {
  const key = `${c.slideId}-card-${c.n}`
  stack(c, box(c, x, y, w, h, { tone: o.tone ?? 'ink', fill: o.fill ?? 'paper', dash: o.dash }), key, 'box')
  const pad = o.pad ?? 36
  const iw = w - pad * 2
  let cy = y + pad - 6 + (o.top ?? 0)
  if (o.kick) {
    stack(c, text(c, x + pad, cy, o.kick, { kind: 'small', tone: o.kickTone ?? 'accent', w: iw }), key)
    cy += LINE.small + 14
  }
  if (o.head) {
    const k = o.headKind ?? 'body'
    stack(c, text(c, x + pad, cy, o.head, { kind: k, w: iw }), key)
    cy += LINE[k] * (o.headLines ?? 1) + 14
  }
  if (o.body) stack(c, text(c, x + pad, cy, o.body, { kind: o.bodyKind ?? 'small', w: iw }), key)
}

/**
 * Card text is stacked by line count, but a Thai heading can wrap to one more
 * line than planned and land on the body. Marking the pieces lets
 * reflowStacks() push each one below the real, measured height of the one
 * above, so wrapped text never collides.
 */
function stack(c: Ctx, id: TLShapeId, key: string, role: 'box' | 'item' = 'item') {
  const s = c.shapes.find((r) => r.id === id)
  if (s) s.meta = { ...s.meta, stack: key, stackRole: role }
}

const STACK_GAP = 14

/** Run once after the deck's shapes exist (fonts must already be loaded). */
export function reflowStacks(editor: Editor) {
  const groups = new Map<string, TLShape[]>()
  for (const s of editor.getCurrentPageShapes()) {
    const key = s.meta.stack as string | undefined
    if (!key) continue
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(s)
  }
  const updates: TLShapePartial[] = []
  for (const [key, list] of groups) {
    const frame = list.find((s) => s.meta.stackRole === 'box')
    const items = list.filter((s) => s.meta.stackRole !== 'box').sort((a, b) => a.y - b.y)
    let floor = -Infinity
    for (const s of items) {
      const y = Math.max(s.y, floor)
      if (y !== s.y) updates.push({ id: s.id, type: s.type, y })
      const h = editor.getShapePageBounds(s)?.h ?? 0
      floor = y + h + STACK_GAP
    }
    if (frame && import.meta.env.DEV) {
      const fb = editor.getShapePageBounds(frame)
      if (fb && floor - STACK_GAP > fb.maxY - 8) console.warn('[deck] card text runs past its box:', key)
    }
  }
  if (updates.length) editor.updateShapes(updates)
}

/** DEV check: text shapes on the same slide whose boxes overlap. */
export function findCollisions(editor: Editor) {
  const texts = editor
    .getCurrentPageShapes()
    .filter((s) => s.type === 'text')
    .map((s) => ({ s, b: editor.getShapePageBounds(s)! }))
  const hits: string[] = []
  for (let i = 0; i < texts.length; i++)
    for (let j = i + 1; j < texts.length; j++) {
      const a = texts[i], b = texts[j]
      if (a.s.meta.slide !== b.s.meta.slide) continue
      const ox = Math.min(a.b.maxX, b.b.maxX) - Math.max(a.b.minX, b.b.minX)
      const oy = Math.min(a.b.maxY, b.b.maxY) - Math.max(a.b.minY, b.b.minY)
      if (ox > 4 && oy > 4) hits.push(`${a.s.meta.slide}: ${a.s.id} × ${b.s.id} (${Math.round(oy)}px)`)
    }
  return hits
}
