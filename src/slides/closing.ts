import { arrow, at, numeral, box, card, text, title } from '../deck/draw'
import { L, R, W } from '../deck/theme'
import type { SlideDef } from '../deck/types'

export const callback: SlideDef = {
  id: 'callback',
  name: 'เทียบกับ 3 คำตอบ',
  section: 4,
  notes:
    'ปิดวงกลมกลับไปที่คำถามของ Lauren ตอนต้น ว่าจะไว้ใจ agent ให้มากขึ้นได้ยังไง ข้อ 1 ตัวตรวจ ฉันทำแล้ว คือวัดผล 3 ระดับและให้ agent ตัวใหม่ที่ไม่เคยเห็นงานตรวจซ้ำ ข้อ 2 skill คุณภาพสูง ทำแล้ว คือคู่มือตามชนิดงาน และหลักการจาก pstack ที่อยู่ในกฎของ repo ข้อ 3 โค้ดที่เป็นมิตรกับ agent ยังทำได้แค่บางส่วน ใน maxion-nft-marketplace-interface มี script audit และ check ใน CI ชื่อ Per-game branching แต่ยังไม่ถึงระดับ Dune ที่โครงสร้างบังคับทุกอย่าง ข้อนี้คืองานต่อไป ปิดด้วยประโยคหลัก: ไว้ใจก่อน แล้วค่อยขยาย หน้าถัดไป: ข้อ 3 และการเพิ่มความไว้ใจไม่ใช่งานของ dev คนเดียว',
  draw(c) {
    title(c, 'เทียบกับ 3 คำตอบของ Lauren\nฉันทำข้อ 1–2 แล้ว ข้อ 3 เพิ่งเริ่ม', 2)
    const rows: [string, string, boolean][] = [
      ['ข้อ 1  ตัวตรวจ', 'ทำแล้ว: วัดผล 3 ระดับ และ agent ตัวใหม่ตรวจซ้ำ', true],
      ['ข้อ 2  skill คุณภาพสูง', 'ทำแล้ว: คู่มือตามชนิดงาน และหลักการจาก pstack', true],
      ['ข้อ 3  โค้ดที่ทำผิดได้ยาก', 'เริ่มแล้วบางส่วน: เปลี่ยนคำเตือนเป็น script และ check ใน CI', false],
    ]
    rows.forEach(([q, a, done], i) => {
      const y = 330 + i * 160
      at(c, i, () => {
        box(c, L, y, 600, 120, { label: q })
        arrow(c, L + 620, y + 60, 820, y + 60)
        box(c, 840, y, R - 840, 120, { label: a, tone: 'accent', fill: done ? 'tint' : 'paper', dash: done ? 'draw' : 'dashed' })
      })
    })
    at(c, 3, () => text(c, L, 830, 'ไว้ใจก่อน **แล้วค่อยขยาย**', { kind: 'lead', w: W }))
  },
}

export const roles: SlideDef = {
  id: 'roles',
  name: 'ทุกตำแหน่งช่วยได้',
  section: 4,
  notes:
    'หน้านี้สำหรับทุกคนในห้อง ความไว้ใจไม่ได้สร้างโดย dev คนเดียว PM: งานที่บอกแค่ ทำหน้า X agent เดาเอง แต่งานที่บอกว่า เสร็จเมื่อ X แสดงบนมือถือไม่ล้น และกดซื้อได้ agent ตรวจเองได้ UX/UI: ถ้าบอกสภาพหน้าจอที่ต้องเห็นทั้งสองขนาด agent จะเปิดเว็บเทียบให้ได้ Tester: คนที่รู้ดีที่สุดว่าต้องตรวจอะไร สูตรตรวจในโฟลเดอร์ features ของ verify skill คืองานของ tester โดยตรง Support: bug report ที่บอกขั้นตอนทำซ้ำได้ คือของที่ agent หยิบไปแก้ได้เลย DevOps: ให้ CI แดงทันทีเมื่อผิดกฎ ซึ่งเป็นกลไกที่แรงที่สุดตามที่ Lauren เรียง และเครื่องแยกที่ agent หลายตัววิ่งได้โดยไม่ชนใคร Backend: ระบบทดสอบหรือ staging ที่ agent ยิง API ได้จริงโดยไม่แตะข้อมูลจริง เพราะตัวตรวจต้องตรวจกับของจริง Frontend: ทุกครั้งที่ต้องเตือน agent ซ้ำ ให้เปลี่ยนเป็น lint, test หรือ skill ทุกคน: แค่จดว่าเราต้องบอก agent เรื่องเดิมซ้ำตรงไหน หน้าถัดไป: แล้วจะเริ่มยังไง',
  draw(c) {
    title(c, 'ทุกตำแหน่งช่วยได้\nเริ่มจากบอกให้ชัดว่า “เสร็จ” หน้าตาเป็นยังไง', 2)
    const roles: [string, string][] = [
      ['PM', 'เขียนงานให้มีเป้าหมาย และนิยามคำว่าเสร็จที่ตรวจได้'],
      ['UX/UI', 'บอกว่าหน้าจอที่ถูกต้องเป็นแบบไหน ทั้งมือถือและจอคอม'],
      ['Tester', 'เขียนสูตรตรวจให้ agent ทำตาม และออกแบบตัวตรวจ'],
      ['Support', 'ส่ง bug report ที่บอกวิธีทำให้เกิดซ้ำ'],
      ['DevOps', 'ให้ CI แดงเมื่อผิดกฎ และมีเครื่องแยกให้ agent วิ่งโดยไม่ชนใคร'],
      ['Frontend', 'เปลี่ยนคำเตือนที่ต้องบอกซ้ำ เป็นเครื่องตรวจหรือ skill'],
      ['Backend', 'มีระบบทดสอบที่ agent ยิง API ได้จริง โดยไม่แตะข้อมูลจริง'],
      ['ทุกคน', 'จดไว้ว่าต้องบอก agent เรื่องเดิมซ้ำตรงไหน'],
    ]
    roles.forEach(([r, d], i) => {
      const x = L + (i % 4) * 423
      const y = 320 + Math.floor(i / 4) * 300
      const all = i === 7
      card(c, x, y, 395, 270, { kick: r, head: d, headKind: 'small', tone: all ? 'accent' : 'ink', fill: all ? 'tint' : 'paper', pad: 30 })
    })
  },
}

export const rollout: SlideDef = {
  id: 'rollout',
  name: 'ไต่ทีละขั้น',
  section: 4,
  notes:
    'ไต่ความไว้ใจทีละขั้น ตรงกับที่ Lauren บอกในเวิร์กช็อปว่าอย่ากระโดดไปหา agent หลักพันตัวบน cloud เพราะเปลืองโดยเปล่าประโยชน์ และ there is really no shortcut ระยะเวลาในหน้านี้เป็นแค่ตัวประมาณ เกณฑ์จริงคือความไว้ใจ ถ้าสัปดาห์ 3 แล้วเรายังต้องตรวจทุกบรรทัด ให้อยู่ระดับเดิมต่อ ช่วงสัปดาห์ 3–4 อยากให้ทุกคนจดว่า agent พลาดอะไรบ้าง แล้วมารวมกันแปลงเป็นโครงสร้าง กับดักที่เจอบ่อย: สั่งทีละขั้นละเอียดเกินไป ให้บอกเป้าหมายกับวิธีรู้ว่าเสร็จแทน, เงื่อนไขเสร็จที่วัดไม่ได้, หลาย agent ใน worktree เดียว, รับ feedback ของ reviewer ทุกข้อ และดูแค่ build ผ่าน หน้าถัดไป: สรุปสิ่งที่ได้วันนี้',
  draw(c) {
    title(c, 'เริ่มจาก agent ตัวเดียวกับตัวตรวจหนึ่งตัว แล้วค่อยขยาย', 2)
    const steps: [string, string, string, number][] = [
      ['สัปดาห์ 1–2', 'agent ตัวเดียว', 'มีคู่มือ repo และตัวตรวจของ repo', 300],
      ['สัปดาห์ 3–4', 'เก็บความผิดพลาด', 'เปลี่ยนคำเตือนเป็นเครื่องมือ', 380],
      ['เดือน 2', 'รันคู่ขนาน\n2–3 ตัว', 'งานที่ไม่ชนกัน แยก worktree กัน', 460],
      ['เดือน 3 ขึ้นไป', 'งานข้ามคืน', 'นิยามเสร็จชัด และมีบันทึกให้อ่าน', 540],
    ]
    const bottom = 900
    steps.forEach(([k, h, b, hh], i) => {
      const x = L + i * 423
      at(c, i, () => card(c, x, bottom - hh, 395, hh, { kick: k, head: h, headKind: 'lead', body: b, tone: i === 3 ? 'accent' : 'ink', fill: i === 3 ? 'tint' : 'paper', pad: 30 }))
    })
  },
}

export const contributions: SlideDef = {
  id: 'contributions',
  name: 'สิ่งที่ได้วันนี้',
  section: -1,
  numbered: false,
  notes:
    'หน้านี้ค้างไว้ตลอดช่วงถาม-ตอบ ตามแบบ Patrick Winston ที่ให้หน้าสุดท้ายเป็นสิ่งที่คนฟังได้กลับไป ไม่ใช่หน้าขอบคุณ ข้อ 2 คือหัวใจของ pstack ที่เอามาใช้ใน pitwall: agent จะบอกว่าเสร็จได้ก็ต่อเมื่อมีหลักฐานที่ตรงกับสิ่งที่เปลี่ยน ข้อ 3 คือสิ่งที่ทุกคนทำได้ภายใน 10 นาทีหลังจบ talk: เปิดไฟล์กฎของตัวเอง เช่น CLAUDE.md แล้วถามทีละข้อสองคำถาม ข้อนี้มีเงื่อนไขไหมว่าใช้ตอนไหน และข้อนี้มีข้อสอบไหมว่าทำตามแล้วหรือยัง ข้อที่ตอบไม่ได้ทั้งสองคำถามยังไม่ใช่กฎ เป็นแค่คำขอร้องที่ agent จะทำตามบ้างไม่ทำบ้าง แนวคิดสองคำถามมาจากโพสต์ของเพจ Agent Dev Thai ถ้ายังไม่มีใครถาม ให้ถามกลับว่า งานไหนในสัปดาห์นี้ที่อยากลองให้ agent ทำพร้อม verify skill',
  draw(c) {
    title(c, 'ก่อนกลับ อยากให้จำ 3 เรื่องนี้')
    const items: [string, string, string][] = [
      ['1', 'agent จะไว้ใจได้\nต้องมี 3 อย่าง', '· ตัวตรวจ\n· skill คุณภาพสูง\n· โค้ดที่ทำผิดได้ยาก'],
      ['2', 'ไม่มีหลักฐาน\nก็ยังไม่นับว่าเสร็จ', 'agent ต้องโชว์ผลตรวจที่ตรงกับสิ่งที่แก้ ก่อนจะบอกว่าเสร็จ'],
      ['3', 'ลองได้เลยพรุ่งนี้', 'เปิดไฟล์กฎที่ให้ agent อ่าน เช่น CLAUDE.md แล้วถามทีละข้อว่า\n· ใช้ตอนไหน\n· ตรวจยังไงว่าทำตามแล้ว\nข้อที่ตอบไม่ได้ ยังเป็นแค่คำขอร้อง'],
    ]
    items.forEach(([n, h, b], i) => {
      const x = L + i * 567
      const hot = i === 1
      card(c, x, 270, 530, 600, { top: 110, head: h, headKind: 'lead', headLines: 2, body: b, bodyKind: 'body', tone: hot ? 'accent' : 'ink', fill: hot ? 'tint' : 'paper' })
      numeral(c, x + 36, 306, n, 72)
    })
    text(c, L, 920, 'ไว้ใจก่อน แล้วค่อยขยาย', { kind: 'lead', w: W })
  },
}

function faq(c: Parameters<SlideDef['draw']>[0], label: string, heading: string, qa: [string, string][]) {
  text(c, L, 96, label, { kind: 'small', tone: 'accent' })
  text(c, L, 146, heading, { kind: 'title', w: W })
  qa.forEach(([q, a], i) => {
    const x = i % 2 === 0 ? L : 980
    const y = 300 + Math.floor(i / 2) * 330
    card(c, x, y, 812, 300, { head: `**${q}**`, headLines: 2, body: a, bodyKind: 'body' })
  })
}

export const faqStart: SlideDef = {
  id: 'faq-start',
  name: 'FAQ: เริ่มใช้งาน',
  section: -1,
  notes:
    '3 หน้านี้เป็นภาคผนวก ใช้ตอนมีคนถาม เรื่อง pstack: verify-mkp ดัดแปลงจาก create-verification-skill และ maintain-verification-skill ของ pstack ภายใต้ MIT License ส่วนหลักการอย่าง laziness-protocol อยู่ใน .claude/rules เรื่อง repo อื่น: คู่มือคือ CLAUDE.md ตัวตรวจคือ verify skill และกติกาอยู่ใน .claude/agent-loop.md แล้วให้ /pitwall:doctor ตรวจ เรื่องเปิดเครื่อง: Lauren ใช้ agent บน cloud ที่แยกเครื่อง ของฉันยังรันในเครื่องตัวเอง เพราะต้องใช้ browser ที่มี wallet ต่ออยู่ สลับเครื่องได้เพราะ state ฝากไว้ที่ branch agent/_loop-state',
  draw(c) {
    faq(c, 'คำถามที่พบบ่อย · 1/3', 'เริ่มยังไง', [
      ['ต้องลง pstack ไหม?', 'ไม่จำเป็น skill เป็นแค่ไฟล์ข้อความ ยกไปใช้กับ Claude Code ได้ pitwall เองก็หยิบมาเฉพาะส่วนที่ใช้'],
      ['repo อื่นของทีมเริ่มยังไง?', 'เขียนคู่มือ repo → ทำตัวตรวจของ repo → เขียนกติกาว่า agent ส่งงานอะไรได้บ้าง'],
      ['loop ที่สั่งซ้ำจนผ่าน (Ralph) ใช้ได้ไหม?', 'ใช้ได้กับงานที่ตรวจได้เร็ว เช่น ลดจำนวน warning แต่ไม่พอสำหรับงานหน้าจอที่ต้องเห็นของจริง'],
      ['ต้องเปิดเครื่องทิ้งไว้ไหม?', 'ตอนนี้ใช่ agent รันบนเครื่องของฉัน และย้ายไปรันบน Mac หรือ Windows ก็ได้'],
    ])
  },
}

export const faqSafety: SlideDef = {
  id: 'faq-safety',
  name: 'FAQ: ความปลอดภัย',
  section: -1,
  notes:
    'ทุกข้อในหน้านี้มาจากกติกาใน .claude/agent-loop.md และ .claude/rules/confidence-rule.md ของ repo maxion-nft-marketplace-interface ย้ำว่า agent merge ได้แค่ develop และผ่าน script ที่ตรวจด่านเท่านั้น release กับ prod ยังเป็นคนตัดสินใจเสมอ สิ่งที่เปลี่ยนคือเราตรวจจากหลักฐานและสุ่มตรวจ แทนการอ่านทุกบรรทัด เหมือนที่ Lauren บอกในไลฟ์กับ Matt Pocock ว่าชิมทุกจานไม่ไหว ต้องสุ่มตรวจแบบหัวหน้าฝ่ายคุมคุณภาพในโรงงาน คำสั่งที่ห้าม agent ใช้มีทั้ง gh pr merge, git rebase, git reset --hard, push force, ข้าม hook ด้วย --no-verify และการแก้ไฟล์ .env เรื่อง port: backend อนุญาต CORS แค่ localhost:3000',
  draw(c) {
    faq(c, 'คำถามที่พบบ่อย · 2/3', 'ความปลอดภัยและความรับผิดชอบ', [
      ['agent ส่งงานเอง จะพังงานคนอื่นไหม?', 'merge ได้แค่ develop และต้องผ่านทุกด่าน push ตรงหรือข้ามด่านตรวจไม่ได้'],
      ['ถ้า agent ทำผิด ใครรับผิดชอบ?', 'เจ้าของ repo เหมือนเดิม ตอนเช้าสุ่มตรวจ พลาดก็ revert แล้วแก้ที่ระบบ'],
      ['ถ้า agent ไม่มั่นใจ หรือติด?', 'ถ้ามั่นใจไม่ถึง 95% ให้พักงานพร้อมเหตุผล ไม่เดา และลองแต่ละวิธีไม่เกินราว 10 นาทีก่อนส่งต่อให้คน'],
      ['ทำไมงานแต่ละชิ้นยังทำทีละชิ้น?', 'เว็บต้องเปิดที่ port เดียว และ agent สลับ branch เอง ส่วนในงานหนึ่งชิ้นมี agent หลายตัวช่วยกัน'],
    ])
  },
}

export const faqWorth: SlideDef = {
  id: 'faq-worth',
  name: 'FAQ: คุ้มไหม',
  section: -1,
  notes:
    'เรื่องค่าใช้จ่าย อย่าเดาตัวเลขบนเวที ให้ตอบตรง ๆ ว่ายังไม่ได้วัดเป็นเงิน แต่การแบ่ง model ตามหน้าที่ช่วยคุมได้ Lauren ตอบเรื่อง token ในเวิร์กช็อปว่าให้ลงทุน token ตอนต้น เพื่อให้แม้ agent ที่เก่งน้อยที่สุดก็ทำงานได้ดี เรื่อง tester ให้ตอบชัดว่าไม่ได้ถูกแทน เพราะการตรวจที่ดีต้องการคนที่รู้ว่าจะพังตรงไหน เรื่องตัวเลข: ในเวิร์กช็อปกราฟเขียนว่า 3000+ PRs in 5 months ส่วนในไลฟ์กับ Matt เธอพูดถึง 2,000 ถึง 2,500 PR ต่อเดือน และบอกเองว่า 2,500 PR ไม่ได้แปลว่า 2,500 feature งานจำนวนมากคือการเก็บกวาด (gardening) เป้าของเราไม่ใช่จำนวน PR แต่คือเช้าที่อ่านบันทึกแล้วไม่ต้องแก้อะไร',
  draw(c) {
    faq(c, 'คำถามที่พบบ่อย · 3/3', 'คุ้มไหม และงานของแต่ละคนเปลี่ยนไปยังไง', [
      ['ค่าใช้จ่ายเท่าไหร่?', 'ยังไม่ได้วัดเป็นเงิน แต่เลือก model ตามงาน ตัวเล็กทำงานตามแบบและตรวจซ้ำ ตัวใหญ่ไว้ออกแบบและ review'],
      ['wallet ยังต้องใช้คน แล้วประหยัดตรงไหน?', 'คนกดแค่ปุ่มยืนยันใน wallet ที่เหลือ agent ทำเอง และงานที่ไม่แตะ wallet ส่งได้เลย'],
      ['Tester จะถูกแทนไหม?', 'ไม่ tester รู้ดีที่สุดว่าต้องตรวจอะไร บทบาทแค่ขยับมาเป็นคนออกแบบตัวตรวจ'],
      ['3,000+ PR จริงไหม?', 'กราฟของเธอนับได้ 3,159 commit และเธอบอกเองว่า 2,500 PR ไม่ได้แปลว่า 2,500 feature งานจำนวนมากคือการเก็บกวาด'],
    ])
  },
}

export const sources: SlideDef = {
  id: 'sources',
  name: 'แหล่งอ้างอิง',
  section: -1,
  notes:
    'ฝั่งซ้ายเป็นของ Lauren เอง ควรอ่านก่อน โดยเฉพาะคู่มือ 10 บทใน repo และไลฟ์กับ Matt Pocock ฝั่งขวาเป็นบทสรุปจากคนอื่น อ่านเร็วแต่อาจคลาดเคลื่อน วิดีโอเวิร์กช็อปบน YouTube เป็นการอัปโหลดซ้ำจาก Maven lightning lesson และ transcript เป็นคำบรรยายอัตโนมัติ คำพูดที่ยกมาจึงอาจคลาดเล็กน้อย',
  draw(c) {
    title(c, 'อ่านต่อจากต้นทาง')
    text(c, L, 260, '**ต้นทางของ Lauren Tan**', { kind: 'body', tone: 'accent', w: 800 })
    text(
      c,
      L,
      320,
      'pstack · github.com/cursor/plugins/tree/main/pstack\nคู่มือ 10 บท · pstack/docs/guide\nThe Complete Guide to pstack Pt. 1–2 · x.com/poteto\nเวิร์กช็อป Grokbot · youtube.com/watch?v=ONeM6YDmvqA\nไลฟ์กับ Matt Pocock (2 ต.ค. 2026) · youtube.com/live/MN9dGgmLyso',
      { kind: 'small', w: 800 },
    )
    text(c, 980, 260, '**บทสรุปและโพสต์ภาษาไทย**', { kind: 'body', tone: 'accent', w: 812 })
    text(
      c,
      980,
      320,
      'A deep dive into pstack · Flavio Copes\npstack explained · The Neuron\npstack-claude · port สำหรับ Claude Code (ไม่ใช่ของทางการ)\n24 หลักการใน pstack (ตอนนี้เหลือ 20) · Agent Dev Thai\n“skill มันไม่มีอะไรวิเศษ” · DEV แบบกล้วยๆ',
      { kind: 'small', w: 812 },
    )
  },
}
