import { arrow, at, numeral, box, card, custom, line, text, title } from '../deck/draw'
import { L, W } from '../deck/theme'
import type { SlideDef } from '../deck/types'

export const cover: SlideDef = {
  id: 'cover',
  name: 'ปก',
  section: -1,
  notes:
    'เปิดด้วยคำถาม: ใครเคยให้ agent ทำงานแล้วต้องนั่งเฝ้าตลอดบ้าง วันนี้จะเล่าแนวคิดของ Lauren Tan (@poteto) ที่ทำให้ไว้ใจ agent ได้มากพอจะปล่อยหลายตัวพร้อมกัน แล้วดูว่าฉันลองทำแบบนั้นด้วย Claude Code ยังไง สไลด์ทั้งชุดวาดบน tldraw แบบเดียวกับที่ Lauren ใช้ในเวิร์กช็อป',
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
    'ตั้งคำถามเดียวของวันนี้ก่อน แล้วปูพื้นให้ทุกตำแหน่งตามทัน agent ในที่นี้ไม่ใช่แชตบอตที่ตอบคำถาม แต่เป็น AI ที่ลงมือทำงานเอง เช่น แก้โค้ด เปิดเว็บ รัน test แล้วรายงานผล ทำไมต้องฟัง Lauren Tan (@poteto): ตอนนี้เธอทำ Grok Bot และ Cursor ที่ SpaceXAI (xAI รวมเข้ากับ SpaceX ในเดือนพฤษภาคม 2026 และ SpaceX ซื้อ Cursor เสร็จในเดือนสิงหาคม 2026) ก่อนหน้านี้อยู่ทีม React Compiler และเคยเป็น engineering manager ที่ Netflix Grok Bot คือ bot ของ xAI ที่ต่อกับเครื่องมืออย่าง Slack, Sentry, Datadog แล้วสั่งงาน agent บน cloud ได้เอง เธอใช้ agent ทำงานจริงทุกวันจนปล่อยให้ merge เองข้ามคืนได้ และเปิดวิธีของเธอให้ใช้ฟรีในชื่อ pstack ข้อมูลมาจากเวิร์กช็อปของเธอ (youtube ONeM6YDmvqA) และไลฟ์กับ Matt Pocock วันนี้เล่า 3 ช่วง: ปัญหาที่ Lauren เจอ วิธีของเธอ และที่ฉันเอามาใช้กับงาน web ของเรา หน้าถัดไป: เริ่มที่ปัญหาเดียวกับที่ Lauren ใช้เปิดเวิร์กช็อป',
  draw(c) {
    text(c, L, 96, 'คำถามของวันนี้', { kind: 'small', tone: 'accent' })
    text(c, L, 150, 'ทำยังไงให้ปล่อย agent หลายตัวทำงานพร้อมกัน\nโดยไม่ต้องนั่งเฝ้า', { kind: 'title', w: W })
    const cards: [string, string, string][] = [
      ['agent คืออะไร', 'AI ที่ลงมือทำงานเอง', 'แก้โค้ด เปิดเว็บ รัน test แล้วรายงานผล ไม่ใช่แค่ตอบแชต'],
      ['ทำไมต้องฟัง Lauren Tan', 'ทำ Grok Bot และ Cursor\nที่ SpaceXAI', 'ใช้ agent ทำงานจริงทุกวัน จนปล่อยให้ทำงานข้ามคืนได้ และเปิดวิธีของเธอให้ใช้ฟรี'],
      ['วันนี้เล่า 3 ช่วง', 'ปัญหา → วิธีของ Lauren\n→ ที่ฉันเอามาใช้', 'ปิดท้ายด้วยสิ่งที่แต่ละตำแหน่งช่วยได้'],
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
    'Lauren เปิดเวิร์กช็อปด้วยคำถามว่า how do you trust it เธอเล่าว่า agent มักจะ winging it คือเดาและ hallucinate แล้วรายงานอย่างมั่นใจว่า found the smoking gun ทั้งที่ไม่ใช่ปัญหาจริง พอเจอบ่อยเข้าเราก็เสียความไว้ใจ และใช้ agent ได้ไม่เต็มที่ เธอเทียบกับตอนเป็น engineering manager ที่ Netflix ว่าเหมือนหัวหน้าที่ไม่ไว้ใจลูกทีม เลยต้อง micromanage ทุกอย่าง ผลคือเราต้องอ่านทุกคำตอบเอง และเปิดหลาย agent พร้อมกันไม่ได้ คำว่า you are the bottleneck เธอพูดตอนเล่าเรื่องตัวตรวจ หน้านี้ตอบข้อ 1 ของหน้าก่อน กดทีละครั้งให้กล่องขึ้นทีละกล่อง หน้าถัดไป: เธอวาดกราฟเพื่ออธิบายเรื่องนี้',
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
    'Lauren วาดกราฟนี้บน tldraw และบอกเองว่าไม่ใช่กราฟวิทยาศาสตร์ แกนตั้งคือความไว้ใจ แกนนอนคือจำนวน agent จาก 1 ตัว ไป 1 ถึง 5, 5 ถึง 10, 10 ถึง 20 ไปจนหลักร้อยและหลักพัน ช่วงล่างคือคนที่ยังต้องดูทุก output ของ agent ไม่กี่ตัว และทำงานขนานไม่ได้ ประโยคหลักของเธอคือ you can’t go to a 100 agents when you don’t even trust the output of one agent ประโยคที่อยากให้จำคือหลักของจำนวน: จะปล่อย agent ได้กี่ตัว ขึ้นกับความไว้ใจ ไม่ได้ขึ้นกับเงินหรือเครื่อง ซื้อเครื่องเพิ่มแล้วเปิด 10 ตัว ก็ยังต้องนั่งอ่านทั้ง 10 ตัวอยู่ดี ปลายบนของเส้นคือตัวเธอตอนนี้ ตื่นมาเจอ PR ราว 20 ตัวที่ agent merge เองข้ามคืน แล้วค่อยตรวจบน main ข้างกราฟเธอเขียนว่า how do i trust my agents more พร้อม 3 คำตอบตามลำดับนี้ 3 ข้อนี้คือโครงของทั้ง talk ส่วน evals ไม่ได้อยู่ในรายการนี้ เธอพูดถึงทีหลังตอนผู้ดำเนินรายการถามว่าดูแล skill ยังไง หน้าถัดไป: เส้นนี้ไม่ใช่แค่ทฤษฎี ดูงานจริงของเธอ',
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
        ['skill ที่สอนให้ทำงานแบบวิศวกร', 'high quality skills that teach agents to work like real software engineers: eg pstack'],
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
    'Lauren เปิดกราฟ GitHub ของเธอ เขียนกำกับว่า i shipped 3000+ PRs in 5 months บนจอเป็นกราฟ commit ราว 3,159 commits เธอบอกว่าไม่ได้โชว์เพื่ออวด แต่ให้เห็นเส้นทาง รูปของกราฟเดินตาม trust curve ในหน้าก่อน เดือนแรกแทบไม่มีงาน เพราะยังเรียน codebase และยังไม่ไว้ใจ agent แล้วงานค่อยขึ้นตามความไว้ใจ เธอเล่าว่าเดือนก่อนส่งไปราว 1,000 PR และยอมรับเองว่าคนจะถามว่าโค้ดพวกนี้ดีจริงไหม ซึ่งเป็นคำถามที่ยุติธรรม ความสูงของแท่งวาดใหม่ให้ใกล้กับที่เห็นบนจอ ไม่ใช่ตัวเลขจริงรายเดือน หน้าถัดไป: ข้อแรกและสำคัญที่สุด คือตัวตรวจ',
  draw(c) {
    title(c, 'ยิ่งไว้ใจได้มาก งานก็ยิ่งออก\nLauren ส่ง 3,000+ PR ใน 5 เดือน', 2)
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
