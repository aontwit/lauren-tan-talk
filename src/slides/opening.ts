import { arrow, at, numeral, box, card, custom, line, text, title } from '../deck/draw'
import { L, W } from '../deck/theme'
import type { SlideDef } from '../deck/types'

export const cover: SlideDef = {
  id: 'cover',
  name: 'ปก',
  section: -1,
  notes:
    'ขอเริ่มด้วยคำถามหนึ่งข้อ ใครเคยให้ agent ทำงาน แล้วต้องนั่งเฝ้ามันตลอดบ้าง\nวันนี้ผมจะเล่าวิธีคิดของ Lauren Tan ที่ทำให้เธอไว้ใจ agent ได้มากพอจะปล่อยหลายตัวทำงานพร้อมกัน แล้วเล่าต่อว่าผมลองทำแบบเดียวกันกับ Claude Code ยังไง\nสไลด์ชุดนี้วาดบน tldraw แบบเดียวกับที่ Lauren ใช้ในเวิร์กช็อปของเธอ\nที่มา: เวิร์กช็อปของ Lauren Tan (@poteto)\nหน้าถัดไป: คำถามของวันนี้ และ agent คืออะไร',
  draw(c) {
    text(c, L, 150, 'knowledge sharing', { kind: 'small', tone: 'accent' })
    text(c, L, 330, 'กองทัพ Agent แบบ Lauren Tan', { kind: 'display', w: W })
    line(c, L + 6, 492, 1180, 484, { tone: 'accent', bend: -10, bold: true })
    text(c, L, 540, 'ทำยังไงให้ไว้ใจ AI agent จนกล้าปล่อยให้ทำงานเอง', { kind: 'lead', w: W })
    text(c, L, 880, 'Apiwit Thammachai', { kind: 'body', tone: 'muted' })
    // Photo: put your own image file at public/lauren-tan.jpg
    custom(c, 'portrait', 1490, 600, { w: 300, h: 340, src: 'lauren-tan.jpg', initials: 'LT' })
    text(c, 1490, 952, 'Lauren Tan · @poteto', { kind: 'tiny', tone: 'muted', w: 300, align: 'middle' })
  },
}

export const promise: SlideDef = {
  id: 'promise',
  name: 'คำถามของวันนี้',
  section: -1,
  notes:
    'คำถามเดียวของวันนี้คือ ทำยังไงให้ปล่อย agent หลายตัวทำงานพร้อมกัน โดยไม่ต้องนั่งเฝ้า\nก่อนอื่นขอปูพื้นให้ทุกคนตรงกัน agent ที่พูดถึงวันนี้ไม่ใช่แชตบอตที่ถามแล้วตอบ แต่เป็น AI ที่ลงมือทำงานเอง เช่น แก้โค้ด เปิดเว็บ รัน test แล้วรายงานผลกลับมา\nทำไมต้องฟัง Lauren ตอนนี้เธอทำ Grok Bot กับ Cursor อยู่ที่ SpaceXAI ก่อนหน้านั้นเธออยู่ทีม React Compiler และเคยเป็น engineering manager ที่ Netflix\nGrok Bot คือ bot ของ xAI ที่ต่อกับเครื่องมืออย่าง Slack, Sentry และ Datadog แล้วสั่งงาน agent บน cloud ได้เอง\nเธอใช้ agent ทำงานจริงทุกวัน จนปล่อยให้มัน merge งานเองข้ามคืนได้ แล้วก็เปิดวิธีทำงานของเธอให้ทุกคนใช้ฟรี ในชื่อ pstack\nวันนี้ผมแบ่งเป็น 3 ช่วง คือ ปัญหาที่ Lauren เจอ วิธีแก้ของเธอ และส่วนที่ผมเอามาใช้กับงาน web ของผม\nที่มา: เวิร์กช็อปของ Lauren (YouTube ONeM6YDmvqA) และไลฟ์กับ Matt Pocock ส่วน SpaceXAI คือ xAI ที่รวมกับ SpaceX ในเดือนพฤษภาคม 2026 และ SpaceX ซื้อ Cursor เสร็จในเดือนสิงหาคม 2026\nหน้าถัดไป: ปัญหาเดียวกับที่ Lauren ใช้เปิดเวิร์กช็อป',
  draw(c) {
    text(c, L, 96, 'คำถามของวันนี้', { kind: 'small', tone: 'accent' })
    text(c, L, 150, 'ทำยังไงให้ปล่อย agent หลายตัวทำงานพร้อมกัน\nโดยไม่ต้องนั่งเฝ้า', { kind: 'title', w: W })
    const cards: [string, string, string][] = [
      ['agent คืออะไร', 'AI ที่ลงมือทำงานเอง', 'แก้โค้ด เปิดเว็บ รัน test แล้วรายงานผล ไม่ใช่แค่ตอบแชต'],
      ['ทำไมต้องฟัง Lauren Tan', 'ทำ Grok Bot และ Cursor\nที่ SpaceXAI', 'ใช้ agent ทำงานจริงทุกวัน จนปล่อยให้ทำงานข้ามคืนได้ และเปิดวิธีของเธอให้ใช้ฟรี'],
      ['วันนี้เล่า 3 ช่วง', 'ปัญหา → วิธีของ Lauren\n→ ที่ผมเอามาใช้', 'ปิดท้ายด้วยสิ่งที่แต่ละตำแหน่งช่วยได้'],
    ]
    cards.forEach(([k, h, b], i) =>
      at(c, i, () => card(c, L + i * 567, 400, 530, 400, { kick: k, head: h, headKind: 'lead', body: b, bodyKind: 'body', tone: i === 2 ? 'accent' : 'ink', fill: i === 2 ? 'tint' : 'paper' })),
    )
  },
}

export const problem: SlideDef = {
  id: 'problem',
  name: 'ปัญหาที่ Lauren เปิด',
  section: -1,
  notes:
    'Lauren เปิดเวิร์กช็อปด้วยคำถามว่า "how do you trust it" แปลว่า เราจะไว้ใจมันได้ยังไง\nเธอเล่าว่า agent ชอบ "winging it" คือทำไปเดาไป เดาผิดแต่รายงานอย่างมั่นใจว่า "found the smoking gun" เจอต้นเหตุแล้ว ทั้งที่ยังไม่ใช่ต้นเหตุจริง\nเจอแบบนี้บ่อยเข้า เราก็ไม่กล้าเชื่อมัน เลยใช้ agent ได้ไม่เต็มที่\nเธอเทียบกับตอนเป็นหัวหน้าทีมที่ Netflix ว่าเหมือนหัวหน้าที่ไม่ไว้ใจลูกทีม เลยต้องคุมทุกรายละเอียดเอง\nสุดท้ายเราต้องอ่านทุกคำตอบเอง และเปิด agent หลายตัวพร้อมกันไม่ได้ เพราะเรากลายเป็นคอขวดเสียเอง\nเพราะฉะนั้น ตัวที่ฉุดเราไว้ไม่ใช่จำนวน agent แต่เป็นความไว้ใจ\nที่มา: เวิร์กช็อปของ Lauren ส่วนคำว่า "you are the bottleneck" เธอพูดตอนเล่าเรื่องตัวตรวจ\nหน้าถัดไป: กราฟที่เธอวาดอธิบายเรื่องนี้',
  draw(c) {
    title(c, 'Lauren เปิดด้วยปัญหานี้: agent ตอบผิดอย่างมั่นใจ\nเราเลยต้องคอยเฝ้าทุกคำตอบ', 2)
    const y = 340
    const h = 300
    card(c, L, y, 470, h, {
      kick: '“I found the smoking gun!”',
      kickTone: 'alert',
      head: 'agent เดาเอา แต่รายงานเหมือนรู้จริง',
      headKind: 'lead',
      headLines: 2,
      body: 'ซึ่งไม่ใช่ต้นเหตุจริง',
    })
    at(c, 1, () => {
      arrow(c, 612, y + 150, 712, y + 150, { bend: -14 })
      card(c, 725, y, 470, h, {
        kick: 'micromanage',
        head: 'เราไม่กล้าเชื่อ ต้องอ่านเองทุกคำตอบ',
        headKind: 'lead',
        headLines: 2,
        body: 'เหมือนหัวหน้าที่ไม่ไว้ใจลูกทีม',
      })
    })
    at(c, 2, () => {
      arrow(c, 1209, y + 150, 1309, y + 150, { bend: -14 })
      card(c, 1322, y, 470, h, {
        kick: 'bottleneck',
        head: 'เรากลายเป็นคอขวด',
        headKind: 'lead',
        headLines: 2,
        body: 'เปิด agent เพิ่มเท่าไร งานก็ไม่เร็วขึ้น',
        tone: 'accent',
        fill: 'tint',
      })
    })
    at(c, 3, () => {
      text(c, L, 720, 'สิ่งที่ฉุดเราไว้ไม่ใช่จำนวน agent แต่คือ **ความไว้ใจ**', { kind: 'lead', w: W })
    })
  },
}

export const trustCurve: SlideDef = {
  id: 'trust-curve',
  name: 'trust curve',
  section: -1,
  notes:
    'Lauren วาดกราฟนี้เอง และบอกไว้ก่อนว่าไม่ใช่กราฟวิทยาศาสตร์\nแกนตั้งคือความไว้ใจ แกนนอนคือจำนวน agent เริ่มจาก 1 ตัว ไป 5 ตัว 10 ตัว 20 ตัว จนถึงหลักร้อยและหลักพัน\nตรงล่างซ้ายคือคนที่ยังต้องอ่านทุกอย่างที่ agent ส่งมา เลยใช้ได้แค่ไม่กี่ตัว และให้ทำงานพร้อมกันไม่ได้\nประโยคหลักของเธอคือ "you can’t go to a 100 agents when you don’t even trust the output of one agent" ถ้ายังไว้ใจงานของ agent ตัวเดียวไม่ได้ ก็อย่าหวังจะไปถึง 100 ตัว\nสิ่งที่อยากให้จำจากหน้านี้คือ จะปล่อย agent ได้กี่ตัว ขึ้นกับความไว้ใจ ไม่ได้ขึ้นกับเงินหรือจำนวนเครื่อง ซื้อเครื่องเพิ่มแล้วเปิด 10 ตัว เราก็ยังต้องนั่งอ่านงานทั้ง 10 ตัวอยู่ดี\nปลายบนของเส้นคือตัว Lauren ตอนนี้ ตื่นเช้ามาเจอ PR ราว 20 ตัวที่ agent merge เองตอนกลางคืน แล้วเธอค่อยตรวจบน main\nข้างกราฟเธอเขียนว่า "how do i trust my agents more" แล้วตอบไว้ 3 ข้อตามลำดับนี้ คือ ตัวตรวจ skill คุณภาพสูง และโค้ดที่ทำผิดได้ยาก ทั้ง 3 ข้อนี้คือโครงของ talk วันนี้\nที่มา: เวิร์กช็อปของ Lauren เรื่อง evals ไม่ได้อยู่ใน 3 ข้อนี้ เธอพูดถึงทีหลังตอนผู้ดำเนินรายการถามว่าดูแล skill ยังไง\nหน้าถัดไป: เส้นนี้ไม่ใช่แค่ทฤษฎี ดูงานจริงของเธอ',
  draw(c) {
    title(c, 'ถ้ายังไว้ใจ agent ตัวเดียวไม่ได้ ก็อย่าหวังจะปล่อย 100 ตัว')
    // axes
    const ox = 240
    const oy = 820
    arrow(c, ox, oy, ox, 300)
    arrow(c, ox, oy, 1010, oy)
    line(c, ox + 14, oy - 20, 990, 360, { tone: 'accent', bend: -150, bold: true })
    const ticks: [number, string][] = [
      [260, '1'],
      [360, '1–5'],
      [470, '5–10'],
      [590, '10–20'],
      [770, 'hundreds'],
      [930, 'thousands'],
    ]
    for (const [x, s] of ticks) text(c, x - 70, oy + 18, s, { kind: 'tiny', w: 140, align: 'middle' })
    text(c, ox + 180, oy + 66, 'number of agents', { kind: 'small', w: 420, align: 'middle' })
    text(c, ox - 92, 660, 'trust', { kind: 'small', rotation: -Math.PI / 2 })
    at(c, 1, () => {
      text(c, 300, 640, 'watching every output', { kind: 'tiny', tone: 'muted' })
      arrow(c, 330, 690, 272, 768, { tone: 'muted', bend: 10 })
      text(c, 620, 300, '~20 PRs merged overnight', { kind: 'tiny', tone: 'muted' })
    })
    at(c, 2, () => {
      box(c, 1090, 290, 702, 580)
      text(c, 1130, 322, 'how do i trust my agents more?', { kind: 'body', tone: 'accent', w: 630 })
      const rows: [string, string][] = [
        ['ตัวตรวจ', 'verification'],
        ['skill คุณภาพสูง', 'high quality skills that teach agents to work like real software engineers: eg pstack'],
        ['โค้ดที่ทำผิดได้ยาก', 'refactoring/rewriting architecture to be agent friendly (greenfield vs brownfield)'],
      ]
      rows.forEach(([th, en], i) => {
        const y = 420 + i * 145
        numeral(c, 1130, y, String(i + 1), 64)
        text(c, 1220, y - 4, th, { kind: 'body', w: 540 })
        text(c, 1220, y + 46, en, { kind: 'tiny', tone: 'muted', w: 540 })
      })
    })
    at(c, 3, () => text(c, L, 935, '**หลักของจำนวน:** จะปล่อย agent ได้กี่ตัว ขึ้นกับว่าไว้ใจได้แค่ไหน ไม่ได้ขึ้นกับเงินหรือจำนวนเครื่อง', { kind: 'body', tone: 'accent', w: W }))
  },
}

export const shipped: SlideDef = {
  id: 'shipped',
  name: 'กราฟ 3,000+ PR',
  section: -1,
  notes:
    'นี่คือกราฟ GitHub ของ Lauren เธอเขียนกำกับไว้ว่า "i shipped 3000+ PRs in 5 months" คือส่ง PR ไปกว่า 3,000 ตัวใน 5 เดือน บนจอนับ commit ได้ราว 3,159\nเธอบอกว่าไม่ได้เอามาอวด แต่อยากให้เห็นเส้นทาง รูปกราฟเดินตาม trust curve เมื่อกี้เลย\nเดือนแรกแทบไม่มีงาน เพราะเธอยังเรียนรู้ codebase อยู่ และยังไม่ไว้ใจ agent พอไว้ใจมากขึ้น งานก็ค่อย ๆ ขึ้นตาม\nเธอเล่าว่าเดือนก่อนเดือนเดียวก็ส่งไปราว 1,000 PR และยอมรับเองว่าคนต้องถามแน่ว่าโค้ดพวกนี้ดีจริงไหม ซึ่งเธอบอกว่าเป็นคำถามที่ยุติธรรม\nที่มา: เวิร์กช็อปของ Lauren แท่งกราฟในสไลด์วาดใหม่ให้ใกล้กับที่เห็นบนจอ ไม่ใช่ตัวเลขจริงรายเดือน\nหน้าถัดไป: ข้อแรกและสำคัญที่สุด คือตัวตรวจ',
  draw(c) {
    title(c, 'ยิ่งไว้ใจได้มาก งานก็ยิ่งออก\nLauren เขียนบนจอว่าส่ง 3,000+ PR ใน 5 เดือน', 2)
    text(c, L, 310, 'i shipped 3000+ PRs in 5 months', { kind: 'lead' })
    const base = 850
    line(c, L, base, 1070, base)
    line(c, 150, base - 8, 770, base - 12, { tone: 'muted' })
    const bars = [30, 90, 140, 200, 430]
    bars.forEach((h, i) => box(c, 800 + i * 50, base - h, 36, h, { tone: 'accent', fill: 'tint' }))
    const years: [number, string, boolean][] = [
      [180, '2023', false],
      [410, '2024', false],
      [640, '2025', false],
      [900, '2026', true],
    ]
    for (const [x, s, hot] of years) text(c, x - 60, base + 18, s, { kind: 'tiny', tone: hot ? 'accent' : 'muted', w: 120, align: 'middle' })
    text(c, L, 930, 'วาดใหม่จากกราฟ GitHub ที่ Lauren แชร์บนจอ (ความสูงแท่งเป็นค่าประมาณ)', { kind: 'tiny', tone: 'muted', w: 1000 })
    at(c, 1, () => {
      text(c, 470, 590, 'first month:\nlearning the codebase', { kind: 'tiny', tone: 'muted' })
      arrow(c, 700, 680, 802, 800, { tone: 'muted', bend: -16 })
    })
    const rx = 1130
    const rw = 662
    text(c, rx, 360, 'เธอบอกว่าไม่ได้เอามาอวด\nแต่อยากให้เห็น **เส้นทาง**', { kind: 'body', w: rw })
    text(c, rx, 520, 'งานโตตามความไว้ใจ\nไม่ได้โตตามจำนวน agent', { kind: 'body', w: rw })
    at(c, 2, () => {
      text(c, rx, 680, 'ตัวช่วยที่ใหญ่ที่สุด\nคือข้อแรก: **ตัวตรวจ**', { kind: 'lead', tone: 'accent', w: rw })
    })
  },
}
