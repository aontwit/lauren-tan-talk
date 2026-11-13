import type { TLShapePartial } from 'tldraw'
import type { Row } from '../slides'
import { makeCtx, text, type ShapeRecord } from './draw'
import { FOOT, L, R, SECTIONS, SLIDE } from './theme'
import type { SlideDef } from './types'

export interface BuiltSlide {
  def: SlideDef
  index: number
  row: number
  ox: number
  oy: number
  maxStep: number
  records: ShapeRecord[]
}

export interface BuiltDeck {
  slides: BuiltSlide[]
  shapes: TLShapePartial[]
}

function footer(c: ReturnType<typeof makeCtx>, def: SlideDef, page: number) {
  if (def.section >= 0) {
    const crumbs = SECTIONS.map((s, i) => (i === def.section ? `**${s}**` : s)).join('  ·  ')
    text(c, L, FOOT, crumbs, { kind: 'tiny', tone: 'muted', w: 1400 })
  }
  if (def.numbered !== false && page > 1) {
    text(c, R - 200, FOOT, String(page).padStart(2, '0'), { kind: 'tiny', tone: 'muted', w: 200, align: 'end' })
  }
}

/** Lays slides out one row per part of the talk, with the part's name left of its row. */
export function buildDeck(rows: Row[]): BuiltDeck {
  const shapes: TLShapePartial[] = []
  const slides: BuiltSlide[] = []
  rows.forEach((row, r) => {
    const oy = r * SLIDE.gapY
    const label = makeCtx(`row-${r}`, 0, oy)
    text(label, -4200, 360, row.label, { kind: 'chapter', tone: 'muted', w: 3900, align: 'end' })
    shapes.push(...label.shapes)

    row.slides.forEach((def, col) => {
      const index = slides.length
      const ox = col * SLIDE.gapX
      const c = makeCtx(def.id, ox, oy)
      def.draw(c)
      footer(c, def, index + 1)
      shapes.push(...c.shapes)
      const maxStep = c.records.reduce((m, rec) => Math.max(m, rec.step), 0)
      slides.push({ def, index, row: r, ox, oy, maxStep, records: c.records })
    })
  })
  return { slides, shapes }
}
