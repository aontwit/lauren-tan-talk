import type { Ctx } from './draw'

export interface SlideDef {
  id: string
  /** Short name for the presenter view. */
  name: string
  /** Index into SECTIONS for the footer breadcrumb, or -1 for none. */
  section: number
  /** Show the page number in the footer. */
  numbered?: boolean
  /** Speaker notes. */
  notes: string
  draw: (c: Ctx) => void
}
