/**
 * Plain-Thai meanings for the English terms in the speaker notes. The
 * presenter window shows each meaning in brackets the first time a term
 * appears in the talk, so the speaker can explain it to PM, UX, support and
 * test people in the same breath. Longer terms are listed before the shorter
 * terms they contain.
 */
export const GLOSSARY: [term: string, meaning: string][] = [
  // quotes from Lauren
  ['how do you trust it', 'จะไว้ใจมันได้ยังไง'],
  ['how do i trust my agents more', 'จะไว้ใจ agent ให้มากขึ้นได้ยังไง'],
  ['found the smoking gun', 'เจอต้นเหตุแล้ว ทั้งที่ยังไม่ได้ตรวจจริง'],
  ['winging it', 'ทำไปเดาไป ไม่ได้เช็กของจริง'],
  ['you are the bottleneck', 'คุณนั่นแหละคือคอขวด'],
  ['even trust the output of one agent', 'ขนาดผลงานของ agent ตัวเดียวยังไม่ไว้ใจ'],
  ['the most important skill', 'skill ที่สำคัญที่สุด'],
  ['closes the loop', 'ปิดวง คือ agent รู้ผลงานตัวเองได้ ไม่ต้องรอคนบอก'],
  ['a third part', 'ส่วนที่สาม'],
  ['shortest path is the best path', 'ทางที่สั้นที่สุดต้องเป็นทางที่ถูก'],
  ['agents love to copy existing patterns', 'agent ชอบลอกแบบที่มีอยู่แล้วในโค้ด'],
  ['agents can still forget', 'agent ยังลืมได้อยู่ดี'],
  ['there is really no shortcut', 'ไม่มีทางลัดจริง ๆ'],
  ['empowerment promise', 'ประโยคเปิดที่บอกว่าคนฟังจะได้อะไรกลับไป'],

  // working with agents
  ['agent', 'AI ที่ลงมือทำงานเองได้ เช่น Claude Code ที่อ่านโค้ด แก้ไฟล์ และรันคำสั่งเอง'],
  ['SOP', 'เอกสารขั้นตอนการทำงานมาตรฐาน เช่น คู่มือรับพนักงานใหม่'],
  ['staging', 'ระบบจำลองสำหรับทดสอบ หน้าตาเหมือนของจริงแต่ข้อมูลไม่ใช่ของจริง'],
  ['subagent', 'agent ลูกที่ agent หลักส่งงานย่อยไปให้ทำ'],
  ['Claude Code', 'เครื่องมือ AI เขียนโค้ดของ Anthropic ที่ทำงานใน terminal'],
  ['hallucinate', 'AI แต่งเรื่องขึ้นมาเองอย่างมั่นใจ เช่น อ้างฟังก์ชันที่ไม่มีอยู่จริง'],
  ['micromanage', 'คุมทุกรายละเอียด ต้องดูทุกอย่างเอง'],
  ['engineering manager', 'หัวหน้าทีมวิศวกร'],
  ['trust curve', 'กราฟที่บอกว่ายิ่งไว้ใจมาก ยิ่งปล่อย agent ได้หลายตัว'],
  ['create-verification-skill', 'skill ใน pstack ที่ช่วยสร้างตัวตรวจของแอป'],
  ['maintain-verification-skill', 'skill ใน pstack ที่ช่วยดูแลตัวตรวจให้ทันโค้ด'],
  ['verification', 'การพิสูจน์ว่างานใช้ได้จริง เช่น เปิดเว็บแล้วกดซื้อดูเอง'],
  ['verify skill', 'skill ที่สอน agent ให้ตรวจแอปจริง เช่น เปิด browser แล้วกดตามผู้ใช้'],
  ['verifier', 'agent อีกตัวที่มีหน้าที่ตรวจงานอย่างเดียว ไม่ได้เป็นคนเขียน'],
  ['control-glass', 'ชื่อ verify skill ของ Lauren ที่ขับแอป Cursor'],
  ['feature map', 'ไฟล์อธิบายแต่ละ feature จากมุมผู้ใช้ ให้ agent รู้ทางไปถึงหน้านั้น'],
  ['Playwright', 'เครื่องมือสั่ง browser ด้วยโค้ด ให้คลิก พิมพ์ และถ่ายภาพหน้าจอได้'],
  ['accessibility tree', 'โครงหน้าเว็บแบบที่โปรแกรมอ่านหน้าจออ่าน บอกว่ามีปุ่มอะไรตรงไหน'],
  ['console error', 'ข้อความ error ที่ browser แสดงเมื่อหน้าเว็บมีปัญหา'],
  ['doctor', 'คำสั่งตรวจความพร้อมก่อนเริ่มงาน'],
  ['overnight', 'ปล่อย agent ทำงานข้ามคืน'],
  ['loop', 'วงรอบที่ agent ทำซ้ำเอง: ดู → แก้ → ตรวจ → จด'],
  ['pstack', 'ชุด skill ของ Lauren ที่สอนวิธีทำงานแบบวิศวกรอาวุโส'],
  ['skill', 'คู่มือที่เป็นไฟล์ข้อความ agent อ่านก่อนทำงาน เช่น ขั้นตอนตรวจหน้าเว็บ'],
  ['SKILL.md', 'ไฟล์ของ skill หนึ่งตัว'],
  ['CLAUDE.md', 'ไฟล์คู่มือของ repo ที่ Claude Code อ่านทุกครั้งที่เริ่มงาน'],
  ['onboard', 'สอนงานให้รู้บริบท เหมือนรับพนักงานใหม่'],
  ['markdown', 'ไฟล์ข้อความธรรมดาที่มีหัวข้อและลิสต์'],
  ['evals', 'ข้อสอบของ agent เช่น ให้ทำงานเดิมแล้วให้คะแนนว่าทำตาม skill ไหม'],
  ['eval', 'ข้อสอบของ agent เช่น ให้ทำงานเดิมแล้วให้คะแนนว่าทำตาม skill ไหม'],
  ['model', 'สมองของ AI แต่ละรุ่น'],
  ['sonnet', 'model รุ่นกลางของ Claude เร็วและถูกกว่า'],
  ['opus', 'model รุ่นใหญ่ของ Claude คิดลึกกว่า'],
  ['token', 'หน่วยนับข้อความที่ AI อ่านและเขียน ใช้คิดค่าใช้จ่าย'],
  ['cloud', 'เครื่องบนเซิร์ฟเวอร์ ไม่ใช่เครื่องเรา'],
  ['plugin', 'ส่วนเสริมที่ติดตั้งเพิ่มให้ Claude Code'],
  ['gardening', 'งานเก็บกวาด เช่น ลบโค้ดเก่า อัปเดต library แก้บั๊กเล็ก'],
  ['vibe code', 'ให้ AI เขียนโค้ดตามความรู้สึก โดยไม่ได้วางโครงหรือตรวจจริงจัง'],
  ['apply when', 'บรรทัดในไฟล์หลักการที่บอกว่าต้องใช้หลักนี้ตอนไหน'],
  ['laziness-protocol', 'หลักการใน pstack ที่กันไม่ให้ agent ทำแบบขอไปที'],
  ['test-behavior-not-implementation', 'หลักการว่า test ต้องตรวจผลลัพธ์ ไม่ผูกกับวิธีเขียนข้างใน'],
  ['Agent-friendly architecture', 'เอกสารของ Dune ว่าด้วยการออกแบบโค้ดให้ agent ทำผิดยาก'],
  ['Dune', 'ชื่อสถาปัตยกรรมของ Grok Bot ที่ Lauren ออกแบบให้ agent เขียน'],
  ['Cursor', 'โปรแกรมเขียนโค้ดที่มี AI ในตัว ที่ Lauren เคยทำงาน'],
  ['tldraw', 'กระดานวาดรูปออนไลน์ที่ Lauren ใช้ทำสไลด์'],

  // ideas from software engineering
  ['Domain-Driven Design', 'ออกแบบโค้ดตามภาษาและกฎของธุรกิจจริง'],
  ['make illegal states unrepresentable', 'ออกแบบชนิดข้อมูลจนสถานะผิด ๆ เขียนออกมาไม่ได้'],
  ['hexagonal architecture', 'แยกแกนธุรกิจออกจากของภายนอก เช่น ฐานข้อมูลหรือ API'],
  ['functional core imperative shell', 'งานคำนวณอยู่ข้างใน ส่วนที่แตะโลกภายนอกอยู่ขอบนอก'],
  ['shared-nothing', 'แต่ละส่วนไม่ใช้ข้อมูลร่วมกัน จึงไม่ชนกัน'],
  ['mutation testing', 'ลองแกล้งทำโค้ดพัง แล้วดูว่า test จับได้ไหม'],
  ['working set', 'ชุดข้อมูลที่กำลังใช้อยู่จริงตอนนั้น'],
  ['poka-yoke', 'การออกแบบกันพลาดแบบญี่ปุ่น เช่น ปลั๊กที่เสียบกลับด้านไม่ได้'],
  ['5 Whys', 'ถามว่าทำไมซ้ำหลายรอบจนเจอต้นเหตุ'],
  ['refactor', 'จัดโครงโค้ดใหม่โดยพฤติกรรมเหมือนเดิม'],
  ['rewrite', 'เขียนใหม่ทั้งส่วน'],
  ['framework', 'โครงสำเร็จรูปที่กำหนดวิธีเขียนโค้ดทั้งแอป'],
  ['useEffect', 'คำสั่งหนึ่งใน React ที่ทำให้เกิดบั๊กง่ายถ้าใช้ผิด'],
  ['import graph', 'แผนผังว่าไฟล์ไหนเรียกใช้ไฟล์ไหน'],
  ['static analysis', 'ตรวจโค้ดโดยไม่ต้องรัน เช่น lint และ typecheck'],
  ['compiler', 'ตัวแปลโค้ด ที่ฟ้องเมื่อชนิดข้อมูลผิด'],
  ['bugbot', 'bot ที่ช่วย review โค้ดใน PR อัตโนมัติ'],
  ['style guide', 'คู่มือสไตล์การเขียนโค้ดของทีม'],
  ['code review', 'ให้อีกคนอ่านตรวจโค้ดก่อนรวมเข้าระบบ'],
  ['unit test', 'test ของชิ้นเล็ก ๆ เช่น ฟังก์ชันเดียว'],
  ['test', 'โค้ดที่เขียนไว้ตรวจว่าโค้ดทำงานถูก'],
  ['lint', 'เครื่องมือตรวจรูปแบบโค้ด เช่น ฟ้องเมื่อใช้คำสั่งที่ทีมห้าม'],
  ['typecheck', 'ตรวจว่าชนิดข้อมูลในโค้ดถูกต้อง'],
  ['build', 'แปลงโค้ดเป็นแอปที่รันได้จริง'],
  ['hook', 'คำสั่งที่รันเองอัตโนมัติเมื่อเกิดเหตุการณ์ เช่น ทุกครั้งที่แก้ไฟล์'],
  ['CI', 'ระบบที่รันการตรวจอัตโนมัติทุกครั้งที่ส่งโค้ด ไม่ผ่านจะขึ้นสีแดง'],

  // git and delivery
  ['repo', 'ที่เก็บโค้ดของโปรเจกต์หนึ่ง เช่น repo ของเว็บ marketplace'],
  ['PR', 'Pull Request คือคำขอรวมโค้ดที่แก้ ให้คนหรือระบบตรวจก่อนรวม'],
  ['commit', 'การบันทึกการแก้โค้ดหนึ่งครั้ง'],
  ['branch', 'สำเนาโค้ดที่แยกไว้ทำงาน ไม่กระทบตัวหลัก'],
  ['merge', 'รวมโค้ดจาก branch หนึ่งเข้าอีก branch'],
  ['conflict', 'โค้ดสองชุดแก้ที่เดียวกัน ต้องเลือกว่าจะเอาแบบไหน'],
  ['worktree', 'โฟลเดอร์ทำงานแยกของ repo เดียวกัน ให้ agent หลายตัวทำคนละงานไม่ชนกัน'],
  ['develop', 'branch ที่รวมงานระหว่างพัฒนา'],
  ['release', 'branch ที่เตรียมปล่อยให้ผู้ใช้'],
  ['prod', 'ระบบจริงที่ผู้ใช้ใช้อยู่'],
  ['gh pr merge', 'คำสั่ง merge PR จาก terminal'],
  ['no-verify', 'ตัวเลือกที่ข้ามการตรวจก่อน commit'],
  ['check:pr-body', 'script ที่ตรวจว่าคำอธิบาย PR มีตารางผลตรวจครบ'],
  ['Per-game branching', 'check ใน CI ที่กันโค้ดแยกเงื่อนไขตามเกมกระจัดกระจาย'],
  ['Not done yet', 'หัวข้อใน PR ที่บอกว่าข้อไหนยังตรวจไม่ได้'],
  ['audit', 'script ตรวจเรื่องเฉพาะที่ทีมตั้งเอง เช่น หาแบบโค้ดที่ห้ามใช้'],

  // the web apps
  ['wallet', 'กระเป๋าเงินคริปโตใน browser ต้องกดยืนยันทุกธุรกรรม'],
  ['MetaMask', 'wallet คริปโตยอดนิยมที่ติดตั้งใน browser'],
  ['pair run', 'คนกับ agent ทำงานคู่กัน คนกดเฉพาะขั้นที่ต้องใช้คน'],
  ['port', 'ช่องที่เว็บในเครื่องเปิดรอ เช่น localhost:3000'],
  ['CORS', 'กฎของ browser ที่กำหนดว่าเว็บไหนเรียก API นี้ได้'],
  ['verify-mkp', 'verify skill ของเว็บ marketplace'],
  ['agent-loop.md', 'ไฟล์กติกาของ pitwall ในแต่ละ repo'],
  ['decisions', 'โฟลเดอร์ที่ agent จดเหตุผลการตัดสินใจ'],
  ['pit wall', 'แถวริมสนาม F1 ที่ทีมนั่งดูข้อมูลและสั่งนักขับทางวิทยุ'],
]

export interface Piece {
  text: string
  meaning?: string
}

function escape(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** Matches a term on its own, not inside a longer English word or path. */
function matcher(term: string) {
  return new RegExp(`(?<![A-Za-z0-9_\\-/.:])${escape(term)}(?![A-Za-z0-9_\\-])`, 'i')
}

/**
 * Splits a note into pieces, marking the first occurrence of each glossary
 * term that has not been explained earlier in the talk. `seen` is updated.
 */
export function glossNote(note: string, seen: Set<string>): Piece[] {
  const hits: { start: number; end: number; meaning: string; term: string }[] = []
  for (const [term, meaning] of GLOSSARY) {
    if (seen.has(term.toLowerCase())) continue
    const m = matcher(term).exec(note)
    if (!m) continue
    const start = m.index
    const end = start + m[0].length
    if (hits.some((h) => start < h.end && end > h.start)) continue
    hits.push({ start, end, meaning, term })
  }
  hits.sort((a, b) => a.start - b.start)
  const pieces: Piece[] = []
  let at = 0
  for (const h of hits) {
    seen.add(h.term.toLowerCase())
    if (h.start > at) pieces.push({ text: note.slice(at, h.start) })
    pieces.push({ text: note.slice(h.start, h.end), meaning: h.meaning })
    at = h.end
  }
  if (at < note.length) pieces.push({ text: note.slice(at) })
  return pieces
}

/** Glossed notes for every slide, explaining each term once, in talk order. */
export function glossAll(notes: string[]): Piece[][] {
  const seen = new Set<string>()
  return notes.map((n) => glossNote(n, seen))
}
