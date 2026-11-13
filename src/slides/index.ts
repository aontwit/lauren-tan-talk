import type { SlideDef } from '../deck/types'
import { army, dune, encode, language, laurenVerify, overnight, prove, pstack, roots } from './answers'
import { callback, contributions, faqSafety, faqStart, faqWorth, roles, rollout, sources } from './closing'
import { cover, problem, promise, shipped, trustCurve } from './opening'
import { caseIntro, caseMap, caseVerify, morning, ucDaytime } from './pitwall'

export interface Row {
  label: string
  slides: SlideDef[]
}

/**
 * The board, one row per part of the talk. In the overview ("o") each row
 * reads as a chapter, and moving to the next part moves the camera down a row.
 * The opening follows Lauren's workshop: problem → trust curve → PR graph.
 */
export const ROWS: Row[] = [
  { label: 'เปิดเรื่อง', slides: [cover, promise, problem, trustCurve, shipped] },
  { label: 'ข้อแรก · ตัวตรวจ', slides: [prove, laurenVerify, overnight] },
  { label: 'ข้อสอง · skill คุณภาพสูง', slides: [pstack, army, roots, language] },
  { label: 'ข้อสาม · โค้ดที่ทำผิดได้ยาก', slides: [dune, encode] },
  { label: 'pitwall ของฉัน', slides: [caseIntro, caseMap, ucDaytime, caseVerify, morning] },
  { label: 'เริ่มยังไง', slides: [callback, roles, rollout, contributions] },
  { label: 'ภาคผนวก', slides: [faqStart, faqSafety, faqWorth, sources] },
]

export const SLIDES: SlideDef[] = ROWS.flatMap((r) => r.slides)
