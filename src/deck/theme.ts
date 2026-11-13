import type { TLDefaultColorStyle, TLDefaultSizeStyle } from 'tldraw'

/**
 * The only colors a slide may use. Slides pick a tone, never a raw color,
 * and scripts/check-theme.mjs fails the build if a slide file names a color.
 */
export const TONE = {
  ink: 'black',
  accent: 'orange',
  muted: 'grey',
  alert: 'red',
  ok: 'green',
  note: 'yellow',
} as const satisfies Record<string, TLDefaultColorStyle>
export type Tone = keyof typeof TONE

/** tldraw's light palette, for custom SVG shapes that draw outside tldraw's styles. */
export const PALETTE = {
  bg: '#f9fafb',
  paper: '#fcfffe',
  ink: '#1d1d1d',
  inkTint: '#e8e8e8',
  muted: '#9fa8b2',
  mutedTint: '#eceef0',
  accent: '#e16919',
  accentTint: '#f8e2d4',
  alert: '#e03131',
  alertTint: '#f4dadb',
  note: '#f1ac4b',
  noteTint: '#f9f0e6',
} as const

/** Text roles. [tldraw size, scale]. tldraw draw font sizes: s 18, m 24, l 36, xl 44. */
export const TEXT = {
  chapter: ['xl', 6], // ~264px, row names seen in the overview
  display: ['xl', 2.3], // ~101px
  title: ['xl', 1.45], // ~64px
  lead: ['l', 1.1], // ~40px
  body: ['l', 0.92], // ~33px
  small: ['m', 1.08], // ~26px
  tiny: ['s', 1.28], // ~23px
} as const satisfies Record<string, readonly [TLDefaultSizeStyle, number]>
export type TextKind = keyof typeof TEXT

/** Line height of each role in canvas units (tldraw uses 1.35). */
export const LINE: Record<TextKind, number> = {
  chapter: 356,
  display: 136,
  title: 86,
  lead: 54,
  body: 45,
  small: 35,
  tiny: 31,
}

/** Boxes and arrows share one stroke weight so the board reads as one hand. */
export const STROKE_SCALE = 1.4
export const BOLD_STROKE_SCALE = 2.4

/** Slide geometry on the canvas. Slides sit in a grid like one big board. */
export const SLIDE = {
  w: 1920,
  h: 1080,
  pad: 128,
  gapX: 2600,
  gapY: 1800,
  cols: 6,
} as const

export const L = SLIDE.pad
export const R = SLIDE.w - SLIDE.pad
export const W = R - L
export const TOP = 96
export const FOOT = 1008

export const SECTIONS = ['ตัวตรวจ', 'skill คุณภาพสูง', 'โค้ดที่ทำผิดได้ยาก', 'pitwall ของฉัน', 'เริ่มยังไง'] as const
