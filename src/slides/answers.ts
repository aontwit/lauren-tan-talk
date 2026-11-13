import { arrow, at, numeral, box, card, kicker, text, title } from '../deck/draw'
import { L, R, W } from '../deck/theme'
import type { SlideDef } from '../deck/types'

/* ---------- answer 1: verification ---------- */

export const prove: SlideDef = {
  id: 'prove',
  name: 'ตัวตรวจ: พิสูจน์งานตัวเอง',
  section: 0,
  notes:
    'Lauren เรียก verification ว่า the most important skill และเป็น skill แรก ๆ ที่เธอสร้าง ปัญหาที่มันแก้คือ ถ้า agent ตรวจงานตัวเองไม่ได้ เราคือคนตรวจ คือคอขวด ต้องคอยก๊อปภาพหน้าจอส่งกลับไปให้ agent เอง และทำงานขนานไม่ได้ เธอบอกว่าตัวตรวจ closes the loop ทำให้ agent ได้โค้ดที่ถูก 4 กล่องนี้มาจากบทที่ 6 ของคู่มือ pstack ที่บอกว่างานแต่ละชนิดต้องตรวจด้วยของจริงแบบไหน และหลัก prove-it-works บอกว่าหลักฐานที่แรงที่สุดไม่ใช่การเปิดดูด้วยตาครั้งเดียว แต่เป็น script ที่คนรีวิวกดรันซ้ำเองได้ และถ้าตรวจไม่ผ่าน ให้สงสัยวิธีตรวจก่อนสงสัยระบบ ตรงนี้ tester ช่วยได้มากที่สุด หน้าถัดไป: แล้วเธอทำให้ agent ตรวจของจริงได้ยังไง',
  draw(c) {
    const y0 = title(c, 'ข้อแรกและสำคัญที่สุด: agent ต้องพิสูจน์งานตัวเองได้\nเพราะ build ผ่านไม่ได้แปลว่าใช้ได้', 2)
    kicker(c, y0, 'ถ้า agent ตรวจงานตัวเองไม่ได้ เราก็ต้องตรวจแทนทุกครั้ง อย่างที่ Lauren พูดว่า “you are the verifier… the bottleneck”')
    const cards: [string, string][] = [
      ['แก้หน้าเว็บ', 'เปิด browser จริง กดตามที่ผู้ใช้กด'],
      ['แก้ข้อมูลหรือที่เก็บข้อมูล', 'ป้อนข้อมูลชุดเดิมซ้ำ แล้วอ่านค่าที่เขียนลงไปกลับมาดู'],
      ['แก้ความเร็ว', 'วัดก่อนแก้กับหลังแก้ แล้วเทียบกัน'],
      ['แก้ script หรือคำสั่ง', 'รันจริง แล้วดูผลจริง'],
    ]
    cards.forEach(([k, h], i) => {
      const x = i % 2 === 0 ? L : 980
      const y = 390 + Math.floor(i / 2) * 230
      at(c, i === 0 ? 0 : 1, () => card(c, x, y, 812, 200, { kick: k, head: h, headKind: 'lead' }))
    })
    at(c, 2, () => {
      text(c, L, 870, '**ผ่านเครื่องตรวจอัตโนมัติ ยังไม่นับว่าเสร็จ** และถ้าตรวจไม่ผ่าน ให้สงสัยวิธีตรวจก่อนสงสัยระบบ', { kind: 'body', w: W })
    })
  },
}

export const laurenVerify: SlideDef = {
  id: 'lauren-verify',
  name: 'control-glass + feature map',
  section: 0,
  notes:
    'นี่คือสิ่งที่ Lauren เล่าในเวิร์กช็อป สัปดาห์แรกที่ Cursor เธอแก้ปัญหาความเร็วของหน้าต่าง agent (ชื่อภายในว่า glass) ต้องเก็บ trace จาก Chrome DevTools เองแล้วก๊อปส่งให้ agent ซึ่งก็ตอบผิดอย่างมั่นใจ เธอเลยสร้าง skill ชื่อ control-glass เป็น skill แรก ๆ ที่ให้ agent ขับแอปที่รันอยู่ผ่าน Chrome DevTools Protocol ได้เอง เธอบอกว่าตัวโค้ดไม่ได้น่าสนใจ ให้ agent เขียนให้ก็ได้ แต่แค่นั้นยังไม่พอ เพราะ bug report จริงมักเขียนแค่ว่า แถบซ้ายกระตุก หรือแนบภาพมากับเครื่องหมายคำถาม agent ไม่รู้ว่า feature นั้นอยู่ตรงไหน เธอเลยเพิ่มไฟล์ชื่อ feature map ไว้ใน skill บอกว่าแต่ละ feature อยู่ตรงไหนในหน้าจอ เปิดด้วยคีย์ลัดอะไร และต้องเลือก element ไหน ไม่มีไฟล์นี้ skill ก็แทบใช้ไม่ได้ pstack มี create-verification-skill ที่สำรวจโค้ดแล้วร่าง feature map ให้ และ maintain-verification-skill ที่คอยดูแลให้ทันสมัย หน้าถัดไป: พอ agent ตรวจเองได้ ก็ใส่ตัวตรวจเข้าไปในทุกรอบของ loop',
  draw(c) {
    const y0 = title(c, 'Lauren ให้ agent เปิดแอปจริง กดเหมือนผู้ใช้\nและมีแผนที่บอกทางทุก feature', 2)
    kicker(c, y0, 'ปัญหาที่เธอเจอ: bug report เขียนไม่ชัด agent เลยหา feature ที่พังไม่เจอ')
    card(c, L, 380, 812, 470, {
      kick: 'verify skill',
      head: 'ขับแอปที่รันอยู่จริง',
      headKind: 'lead',
      body: '· ต่อกับแอปผ่าน Chrome DevTools\n· คลิก พิมพ์ ดูหน้าจอ เหมือนคนใช้จริง\n· เก็บ trace เพื่อวัดความเร็วเอง',
      bodyKind: 'body',
    })
    at(c, 1, () => {
      card(c, 980, 380, 812, 470, {
        kick: 'feature map',
        head: 'ไฟล์บอกทางไปทุก feature',
        headKind: 'lead',
        body: '· feature อยู่ตรงไหนในหน้าจอ\n· เปิดด้วยคีย์ลัดอะไร\n· agent ต้องเลือก element ไหน\n· ไม่มีไฟล์นี้ skill ก็แทบใช้ไม่ได้',
        bodyKind: 'body',
        tone: 'accent',
        fill: 'tint',
      })
    })
    at(c, 2, () => text(c, L, 890, 'pstack มี skill ที่ช่วยสร้างและดูแลตัวตรวจแบบนี้ให้ทุกแอป', { kind: 'body', w: W }))
  },
}

export const overnight: SlideDef = {
  id: 'overnight',
  name: 'loop ที่ตรวจทุกรอบ',
  section: 0,
  notes:
    'ตัวตรวจต้องอยู่ในทุกรอบของ loop โดยเฉพาะตอนปล่อย agent ทำงานข้ามคืน มาจากบท 07-overnight ของคู่มือ pstack หนึ่งรอบของ agent คือ ดูว่าเสร็จหรือยัง แก้ทีละนิด ตรวจกับของจริง ผ่านก็เก็บ ไม่ผ่านก็ทิ้ง แล้วจดเหตุผล งานที่ไม่ผ่านจะไม่สะสมเป็นขยะ คู่มือ pstack เตือนว่า loop ที่เราไม่ไว้ใจ แค่ผลิตงานที่ไม่มีใครตรวจได้เร็วขึ้น เงื่อนไขว่าเสร็จต้องเป็นสิ่งที่ตรวจได้ เช่น หน้านี้เปิดบนมือถือแล้วไม่ล้น และไม่มี error ไม่ใช่ ทำไป 4 ชั่วโมง หน้าถัดไป: ตัวตรวจบอกได้ว่าโค้ดถูกไหม แต่ไม่ได้บอกว่าโค้ดดีไหม นั่นคือคำตอบข้อสอง',
  draw(c) {
    title(c, 'พอมีตัวตรวจ loop ก็ตัดสินเองได้\nว่างานไหนเก็บ งานไหนทิ้ง', 2)
    // the loop, drawn as Lauren would on the board
    box(c, 410, 330, 300, 100, { label: 'ดูว่าเสร็จหรือยัง' })
    box(c, 690, 560, 300, 100, { label: 'แก้ทีละน้อย' })
    box(c, 410, 790, 300, 100, { label: 'ตรวจกับของจริง', tone: 'accent', fill: 'tint' })
    box(c, 150, 530, 260, 160, { label: 'ผ่านไหม?', geo: 'diamond' })
    arrow(c, 718, 392, 830, 550, { bend: -30 })
    arrow(c, 830, 670, 718, 822, { bend: -30 })
    arrow(c, 402, 840, 282, 700, { bend: -30 })
    // pass: keep the change and go round again
    arrow(c, 282, 520, 402, 398, { bend: -30, tone: 'ok' })
    text(c, 150, 410, 'ผ่าน → เก็บ', { kind: 'small', tone: 'ok' })
    // fail: throw the change away and try a smaller fix
    arrow(c, 418, 610, 682, 610, { tone: 'alert', dash: 'dashed' })
    text(c, 434, 556, 'ไม่ผ่าน → ทิ้ง แก้ใหม่', { kind: 'tiny', tone: 'alert', w: 250 })
    at(c, 1, () => {
      const items: [string, string][] = [
        ['นิยามคำว่าเสร็จให้ตรวจได้', '“ทำครบ 4 ชั่วโมง” ไม่ใช่คำว่าเสร็จ'],
        ['ติดเมื่อไรให้หยุด', 'จดว่าติดตรงไหน แทนที่จะเดาไปเรื่อย ๆ'],
        ['จดทุกรอบ เช้ามาอ่านบันทึก', 'ไม่ต้องไล่อ่านแชตทั้งคืน'],
      ]
      items.forEach(([h, b], i) => {
        const y = 360 + i * 175
        text(c, 1110, y, `**${h}**`, { kind: 'body', w: R - 1110 })
        text(c, 1110, y + 56, b, { kind: 'small', w: R - 1110 })
      })
    })
  },
}

/* ---------- answer 2: high quality skills ---------- */

export const pstack: SlideDef = {
  id: 'pstack',
  name: 'pstack',
  section: 1,
  notes:
    'Lauren ต่อจากตัวตรวจว่า verification ทำให้ได้โค้ดที่ถูก แต่ไม่ได้รับประกันว่าโค้ดดี ปัญหาที่เธอยกคือ agent มักฟันธงต้นเหตุอย่างมั่นใจทั้งที่ยังไม่ได้อ่านโค้ดที่เกี่ยวข้อง เธอเปรียบ agent ว่าเป็นคนเขียนโค้ดเก่งที่ไม่รู้บริบทของงาน วิธีแก้คือ onboard มันด้วย skill ซึ่งก็คือ markdown ธรรมดา สำหรับคนที่ไม่ใช่ dev ให้นึกถึง SOP หรือคู่มือรับพนักงานใหม่ ที่ agent อ่านก่อนลงมือทุกครั้ง pstack เกิดจากการเขียน skill หนึ่งตัวต่อปัญหาหนึ่งแบบที่เธอเห็นซ้ำ เราบอกแค่เป้าหมายกับวิธีรู้ว่าเสร็จ แล้ว pstack จะเลือกคู่มือตามชนิดงาน แจกงานให้ผู้ช่วยที่เหมาะ และบังคับว่าต้องมีหลักฐานก่อนบอกว่าเสร็จ สำหรับ dev: pstack อยู่ใน repo cursor/plugins ใช้ MIT License ตัว plugin ทำมาสำหรับ Cursor แต่ทุก skill เป็นไฟล์ SKILL.md มาตรฐาน ยกไปใช้กับ Claude Code ได้ และมีคนทำ port ไว้แล้ว คู่มือที่เลือกได้มีหลายเล่ม เช่น Bug fix, Feature, Refactoring, Perf issue ตัวเลข 45 skill นับจาก repo เมื่อ พ.ย. 2026 กดทีละครั้งให้ลูกศรเดินไปทีละขั้น หน้าถัดไป: ขั้นแจกงานนี่แหละคือที่มาของคำว่ากองทัพ',
  draw(c) {
    const y0 = title(c, 'ข้อสอง: ตัวตรวจทำให้โค้ดถูก แต่ไม่ได้ทำให้โค้ดดี\nจึงต้องมี skill ที่สอน agent ให้คิดแบบวิศวกรอาวุโส', 2)
    kicker(c, y0, '**skill** คือไฟล์คู่มือที่ agent อ่านก่อนลงมือ เหมือน SOP ของคนในทีม และ **pstack** คือชุด skill 45 ตัวที่ Lauren เปิดให้ใช้ฟรี')
    const steps: [string, string, string][] = [
      ['คุณบอก', 'เป้าหมาย และ\nวิธีรู้ว่าเสร็จ', ''],
      ['เลือกคู่มือ', 'ที่ตรงกับงาน', 'แก้บั๊ก · ทำ feature · ปรับโครง · เร่งความเร็ว'],
      ['แจกงาน', 'ให้ agent\nที่ถนัด', 'ตัวเขียน · ตัวตรวจ · ตัวสืบ'],
      ['ก่อนรายงาน', 'ต้องมีหลักฐาน\nว่าใช้ได้จริง', ''],
    ]
    steps.forEach(([k, h, b], i) => {
      const x = L + i * 431
      at(c, i, () => {
        if (i > 0) arrow(c, x - 54, 545, x - 8, 545)
        card(c, x, 390, 370, 320, { kick: k, head: h, headKind: 'lead', headLines: 2, body: b || undefined, tone: i === 0 ? 'accent' : 'ink', fill: i === 0 ? 'tint' : 'paper' })
      })
    })
    at(c, 3, () =>
      text(c, L, 770, 'pstack ทำ 4 ขั้นนี้ให้ทุกงาน และทุก skill เป็นแค่ไฟล์ข้อความ ยกไปใช้กับ Claude Code ได้', { kind: 'body', w: W }),
    )
  },
}

export const army: SlideDef = {
  id: 'army',
  name: 'กองทัพหน้าตาเป็นยังไง',
  section: 1,
  notes:
    'นี่คือคำว่ากองทัพในชื่อ talk กองทัพไม่ได้แปลว่าเปิด agent ตัวเดียวแล้วสั่งงานเยอะขึ้น แต่คือ agent หลายตัวแบ่งหน้าที่กัน ตัวคุมงานรับเป้าหมายจากเรา แล้วแจกให้ subagent ที่ถนัด ตัวสืบอ่านโค้ดหาต้นเหตุก่อนแก้ ตัวเขียนแก้โค้ด ตัวรีวิวอ่านอย่างเดียวเพื่อหาจุดผิด และตัวตรวจเปิดของจริงพิสูจน์ว่าใช้ได้ ใน pstack คือการส่งงานเขียนโค้ดให้ subagent ใช้ swarm ช่วยตรวจ และใช้ model ต่างค่ายช่วยรีวิว ส่วนชื่อ 4 บทบาทบนสไลด์เป็นชื่อที่ฉันเรียกใน pitwall ซึ่งมีตัวเขียน 1 ตัว ตัวรีวิว 2 ตัว (opus กับ sonnet) และ verifier ตัวใหม่ทุกครั้ง ฝั่งขวาคือกฎที่ทำให้เพิ่มจำนวนได้โดยไม่พัง ข้อแรก แต่ละตัวมีพื้นที่ของตัวเอง เช่นแยก git worktree ไม่แก้ไฟล์ชุดเดียวกัน ข้อสอง ตัวที่ตรวจไม่ใช่ตัวที่เขียน และไม่เคยเห็นงานนั้นมาก่อน จึงไม่เข้าข้างตัวเอง ข้อสาม เพิ่มจำนวนตามความไว้ใจ เริ่มตัวเดียว แล้ว 2 ถึง 3 ตัวพร้อมกัน แล้วค่อยปล่อยข้ามคืน ตรงกับ trust curve ตอนต้น หน้าถัดไป: skill ใน pstack ครึ่งหนึ่งเป็นหลักการ และหลักการพวกนี้ไม่ได้เกิดใหม่',
  draw(c) {
    title(c, 'กองทัพไม่ใช่ agent ตัวเดียวที่เก่งขึ้น\nแต่คือหลายตัวแบ่งหน้าที่ แล้วตรวจกันเอง', 2)
    box(c, L, 330, 400, 130, { label: 'คุณบอกเป้าหมาย\nและวิธีรู้ว่าเสร็จ' })
    arrow(c, L + 200, 470, L + 200, 560)
    box(c, L, 570, 400, 130, { label: 'ตัวคุมงาน\nแจกงานตามหน้าที่', tone: 'accent', fill: 'tint' })
    at(c, 1, () => {
      const roles = ['ตัวสืบ: หาต้นเหตุก่อนแก้', 'ตัวเขียน: แก้โค้ด', 'ตัวรีวิว: อ่านหาจุดผิด', 'ตัวตรวจ: พิสูจน์กับของจริง']
      roles.forEach((r, i) => {
        const y = 300 + i * 140
        arrow(c, L + 410, 635, 640, y + 55, { bend: (1.5 - i) * 12 })
        box(c, 650, y, 420, 110, { label: r, tone: i === 3 ? 'accent' : 'ink' })
      })
    })
    at(c, 2, () => {
      const rules: [string, string][] = [
        ['แต่ละตัวมีพื้นที่ของตัวเอง', 'แยก worktree ไม่แก้ไฟล์ชุดเดียวกัน'],
        ['ตัวที่ตรวจ ไม่ใช่ตัวที่เขียน', 'ไม่เคยเห็นงานมาก่อน จึงไม่เข้าข้างตัวเอง'],
        ['เพิ่มจำนวนตามความไว้ใจ', 'ตัวเดียว → 2–3 ตัว → ข้ามคืน'],
      ]
      rules.forEach(([h, b], i) => {
        const y = 330 + i * 175
        text(c, 1150, y, `**${h}**`, { kind: 'body', w: R - 1150 })
        text(c, 1150, y + 56, b, { kind: 'small', w: R - 1150 })
      })
    })
  },
}

export const roots: SlideDef = {
  id: 'roots',
  name: 'หลักการเก่า ที่รู้ว่าใช้ตอนไหน',
  section: 1,
  notes:
    'ในโฟลเดอร์ skills ของ pstack มี 45 ตัว 20 ตัวเป็นหลักการล้วน (นับเมื่อ พ.ย. 2026) ฝั่งซ้ายคือ prove-it-works ย่อจากไฟล์จริง บรรทัดใช้เมื่อของมันคือ apply after completing a task, before declaring done ฝั่งขวาคือหลักการ 4 ตัวพร้อมบรรทัดใช้เมื่อจริงของแต่ละไฟล์ ได้แก่ model-the-domain, fix-root-causes, separate-before-serializing-shared-state และ encode-lessons-in-structure ตัวไฟล์ใน pstack ไม่ได้อ้างชื่อคนเหล่านี้ แต่เนื้อหาตรงกับแนวคิดที่มีมาก่อน คือ make illegal states unrepresentable ของ Yaron Minsky (บทความ Effective ML Revisited, Jane Street, 2011) 5 Whys ของ Toyota ที่ Taiichi Ohno เรียกว่าพื้นฐานของวิธีคิดแบบ Toyota, The Case for Shared Nothing ของ Michael Stonebraker (1986) และ poka-yoke ที่ Shigeo Shingo ใช้ในระบบการผลิตของ Toyota ช่วงทศวรรษ 1960 การจับคู่นี้ได้ไอเดียจากโพสต์ของเพจ Agent Dev Thai และฉันเทียบกับเนื้อหาในไฟล์แล้ว ของใหม่จริงคือบรรทัดใช้เมื่อ หนังสือไม่รู้ว่าเรากำลังทำอะไร แต่ agent อ่านบรรทัดนี้แล้วหยิบหลักการมาใช้เองเมื่อถึงจังหวะ ใน repo ของฉัน laziness-protocol อยู่ใน .claude/rules/philosophy.md และหลักการทดสอบพฤติกรรมอยู่ใน .claude/rules/testing.md หน้าถัดไป: ถ้าหลักการเป็นของเก่า เราก็เขียน skill ของเราเองได้',
  draw(c) {
    title(c, 'หลักการใน pstack ไม่ใช่ของใหม่\nที่ใหม่คือการบอกว่าต้องใช้ตอนไหน', 2)
    card(c, L, 320, 812, 420, {
      kick: 'โครงของ skill หนึ่งตัว (ย่อ)',
      head: '**prove-it-works**\nใช้เมื่อ: ทำงานเสร็จ ก่อนบอกว่าเสร็จ',
      headKind: 'lead',
      headLines: 2,
      body: '· ตรวจกับของจริงโดยตรง\n· ไม่ใช่ของแทน หรือแค่ compile ผ่าน\n· ดีที่สุดคือ script ที่คนอื่นรันซ้ำได้\n· ตรวจไม่ผ่าน ให้สงสัยวิธีตรวจก่อน',
      bodyKind: 'body',
      tone: 'accent',
      fill: 'tint',
    })
    at(c, 1, () => {
      const items: [string, string, string][] = [
        ['เขียน logic ที่มี state หรือ if เยอะ', 'ข้อมูลผิด ต้องเขียนไม่ได้', 'Minsky 2011'],
        ['ไล่บั๊ก', 'ถามว่าทำไม จนเจอต้นเหตุ', 'Toyota 5 Whys'],
        ['หลายตัวอาจเขียนของชิ้นเดียวกัน', 'แยกของออกจากกันก่อน', 'Stonebraker 1986'],
        ['ต้องเตือนเรื่องเดิมเป็นครั้งที่สอง', 'ย้ายบทเรียนไปไว้ใน lint หรือ script', 'Shingo poka-yoke'],
      ]
      items.forEach(([when, rule, from], i) => {
        const y = 320 + i * 140
        text(c, 1000, y, `ใช้เมื่อ ${when}`, { kind: 'tiny', tone: 'accent', w: R - 1000 })
        text(c, 1000, y + 36, rule, { kind: 'body', w: R - 1000 - 250 })
        text(c, R - 250, y + 44, from, { kind: 'tiny', tone: 'muted', w: 250, align: 'end' })
      })
    })
    at(c, 2, () => text(c, L, 900, 'หนังสือไม่รู้ว่าเรากำลังทำอะไรอยู่ แต่ **skill รู้** เพราะมีบรรทัด “ใช้เมื่อ”', { kind: 'body', w: W }))
  },
}

export const language: SlideDef = {
  id: 'language',
  name: 'skill ก็แค่ภาษา',
  section: 1,
  notes:
    'แล้วจะเขียน skill ของตัวเองยังไง ในเวิร์กช็อป Lauren บอกว่า skill เป็นแค่ markdown และเธอสร้าง pstack ทีละตัวจากสิ่งที่เห็น agent พลาดซ้ำ เช่น เดาแทนที่จะอ่านโค้ด ช่วงท้ายไลฟ์กับ Matt Pocock เธอพูดถึงเคล็ดลับของ Matt ว่าให้กลับไปอ่านแชตเก่า หาจุดที่ต้องคอยแก้หรือแทรก agent ซ้ำ ๆ แล้วเปลี่ยนเป็น skill ที่ใช้ซ้ำได้ แล้วต่อด้วยประโยคบนสไลด์ว่า a skill is just English or language. It’s just markdown. ใน pstack ก็มีคำสั่ง /automate-me ที่อ่านแชตเก่าแล้วร่าง skill ให้ ในเวิร์กช็อปเธอเล่าเพิ่มว่าดูแล skill ด้วย eval ซึ่งเหมือน unit test ของ agent ให้ subagent ลองทำงานในโฟลเดอร์ที่ไม่บอกว่ากำลังถูกสอบ แล้วให้ model อีกตัวเป็นคนให้คะแนน PM, tester, support ก็เขียน skill ได้ เพราะมันคือขั้นตอนการทำงานที่เขียนเป็นภาษาคน ข้อมูลภาษาไทยหน้านี้อ้างจากโพสต์ของเพจ DEV แบบกล้วยๆ หน้าถัดไป: แต่ skill เป็นแค่ตัวหนังสือ agent ลืมได้ คำตอบข้อสามจึงไปที่ตัวโค้ด',
  draw(c) {
    title(c, 'skill ก็แค่ภาษา เขียนเองได้\nเริ่มจากเรื่องที่ต้องเตือน agent ซ้ำ ๆ', 2)
    text(c, L, 300, '“a skill is just English or language. It’s just markdown.”', { kind: 'lead', tone: 'accent', w: W })
    text(c, L, 362, '— Lauren Tan ในไลฟ์กับ Matt Pocock', { kind: 'tiny', tone: 'muted' })
    const steps: [string, string][] = [
      ['เปิดแชตเก่า', 'แชตเก่าคือบันทึกวิธีทำงานจริงของเรา'],
      ['หาเรื่องที่พูดซ้ำ', 'ตรงไหนที่ต้องพิมพ์แก้ หรือเตือนทุกรอบ'],
      ['เขียนเป็น skill', 'เขียนขั้นตอนเป็นภาษาคนครั้งเดียว แล้วใช้ได้ทุกครั้ง'],
    ]
    steps.forEach(([h, b], i) => {
      const x = L + i * 567
      at(c, i, () => {
        box(c, x, 440, 530, 340, { tone: i === 2 ? 'accent' : 'ink', fill: i === 2 ? 'tint' : 'paper' })
        numeral(c, x + 36, 472, String(i + 1), 76)
        text(c, x + 36, 580, h, { kind: 'lead', w: 458 })
        text(c, x + 36, 650, b, { kind: 'small', w: 458 })
      })
    })
    at(c, 3, () => text(c, L, 830, 'ใครในทีมก็เขียนได้ ไม่ต้องเขียนโค้ด แล้วดูแลด้วย **eval** ซึ่งเป็นเหมือน unit test ของ skill', { kind: 'body', w: W }))
  },
}

/* ---------- answer 3: code that is hard to get wrong ---------- */

export const dune: SlideDef = {
  id: 'dune',
  name: 'Dune: ออกแบบรับนิสัย agent',
  section: 2,
  notes:
    'Lauren ต่อจาก skill ด้วยประโยคว่ามี a third part คือการ refactor หรือ rewrite โค้ด ปัญหาที่เธอยกคือโค้ดใหม่ที่ vibe code ขึ้นมาไม่มีราวกั้น agent จะเลือกทางที่สะดวกที่สุดจนโค้ดบานปลาย ต่างจากโค้ดเก่าของบริษัทใหญ่ที่มีราวกั้นสำหรับวิศวกรที่เก่งน้อยที่สุดอยู่แล้ว Grok Bot เริ่มจาก prototype ที่ไม่มีใครอ่านโค้ด เธอเลยใช้ 600 กว่า PR ย้ายมาอยู่บนสถาปัตยกรรมชื่อ Dune ที่เธอเทียบว่าเหมือน Next.js สำหรับแอป Electron ออกแบบให้ agent เขียน ฝั่งซ้ายคือนิสัยที่เธอพูดถึง ฝั่งขวาคือกฎที่เธอยกตัวอย่าง ไม่ใช่รายการครบ หลักของเธอคือ shortest path is the best path และบอกว่า CI ที่เข้มนั้นน่ารำคาญ แต่ agent รับความน่ารำคาญนั้นแทนเรา สำหรับคนที่ไม่ได้เขียนโค้ด: ถ้าออกแบบถนนให้ทางที่ถูกง่ายที่สุด คนขับใหม่ก็ขับถูกเองโดยไม่ต้องเตือน หน้าถัดไป: หลักเดียวกันใช้กับทุกคำเตือนที่เราพิมพ์บอก agent ซ้ำ',
  draw(c) {
    const y0 = title(c, 'ข้อสาม: skill เป็นแค่ตัวหนังสือ agent ลืมได้\nโครงสร้างโค้ดต้องพาไปทางที่ถูกเอง', 2)
    kicker(c, y0, 'ถ้าโค้ดไม่มีราวกั้น agent จะเลือกทางที่สะดวกที่สุดจนโค้ดบานปลาย Lauren เลยใช้ 600+ PR ย้าย Grok Bot มาอยู่บนโครงชื่อ Dune')
    card(c, L, 380, 812, 470, {
      head: '**agent มักจะ…**',
      body: '· ลอกแบบโค้ดที่มีอยู่แล้ว\n· หาทางลัดที่เร็วที่สุด\n· เดาเอาเองมากเกินไป\n· เขียนคอมเมนต์ที่ไม่เกี่ยวกับงาน',
      bodyKind: 'body',
    })
    at(c, 1, () => {
      card(c, 980, 380, 812, 470, {
        head: '**กฎของ Dune ที่เธอยกตัวอย่าง**',
        body: '· ห้ามใช้ useEffect\n· ห้ามเขียนคอมเมนต์\n· CI ตรวจว่าแต่ละส่วน import กันถูกทาง\n· หนึ่ง feature อยู่ในโฟลเดอร์เดียว',
        bodyKind: 'body',
        tone: 'accent',
        fill: 'tint',
      })
    })
    at(c, 2, () => text(c, L, 880, '“shortest path is the best path” ทำให้ทางที่ถูกเป็นทางที่ง่ายที่สุด\nCI ที่เข้มน่ารำคาญสำหรับคน แต่ agent รับความน่ารำคาญนั้นแทนเรา', { kind: 'body', w: W }))
  },
}

export const encode: SlideDef = {
  id: 'encode',
  name: 'เปลี่ยนคำเตือนเป็นกลไก',
  section: 2,
  notes:
    'ช่วงท้ายของเวิร์กช็อป Lauren เรียงความแรงของการบังคับไว้ แรงที่สุดคือตัว codebase เอง เพราะ agents love to copy existing patterns ถัดมาคือ static analysis คือ CI, lint และ compiler ที่ทำให้ CI แดง ส่วน rules, bugbot, skill และ style guide เป็นของอ่อน เพราะ agents can still forget ถ้ามีแค่ของอ่อน สุดท้าย codebase จะเละ ที่แย่ที่สุดคือบังคับกฎผ่านคนคอยเตือนใน code review เธอแนะนำให้เปลี่ยนคอมเมนต์ใน review ทุกข้อเป็น lint หรือ CI rule ลองนึกว่าสัปดาห์ที่แล้วเราพิมพ์บอก agent เรื่องเดิมซ้ำกี่รอบ สำหรับ dev: ระบบรัน test เองคือ hook ใน .claude/settings.json เครื่องตรวจโค้ดคือ lint rule เปิดเว็บจริงคือ verify skill และคู่มือ repo คือ CLAUDE.md ใน repo ของฉัน คำเตือนหลายข้อกลายเป็น script แล้ว เช่น yarn audit:ternary, audit:slop, audit:scroll, audit:color กดทีละครั้งให้ขึ้นทีละแถว หน้าถัดไป: จบเรื่องของ Lauren ทั้ง 3 ข้อแล้ว งาน frontend ของฉันก็เจอปัญหาแบบเดียวกัน',
  draw(c) {
    title(c, 'คำเตือนยังถูกลืมได้\nแต่กลไกในโค้ดบังคับเองทุกครั้ง', 2)
    const rows: [string, string][] = [
      ['“อย่าลืมรัน test นะ”', 'ระบบรัน test ให้เองทุกครั้งที่แก้ไฟล์'],
      ['“อย่าเขียนแบบนี้อีกนะ”', 'lint ฟ้องทันที CI ขึ้นแดง'],
      ['“เช็กหน้าจอมือถือด้วยนะ”', 'agent เปิดเว็บจริงบนจอมือถือเอง'],
      ['“repo นี้ทำแบบนี้นะ”', 'เขียนลงคู่มือ repo ครั้งเดียวจบ'],
    ]
    rows.forEach(([warn, mech], i) => {
      const y = 320 + i * 125
      at(c, i, () => {
        box(c, L, y, 620, 100, { label: warn, dash: 'dashed' })
        arrow(c, L + 640, y + 50, 832, y + 50)
        box(c, 850, y, R - 850, 100, { label: mech, tone: 'accent', fill: 'tint' })
      })
    })
    at(c, 4, () =>
      text(c, L, 840, 'จากแรงสุดไปอ่อนสุดตามที่ Lauren เรียง: **ตัวโค้ดที่ agent ลอกแบบ** → CI / lint / compiler → rules และ bot รีวิว → skill → คู่มือสไตล์ → แย่สุดคือคนคอยเตือนตอน review', { kind: 'small', w: W }),
    )
  },
}
