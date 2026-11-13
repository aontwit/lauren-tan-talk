import { arrow, at, numeral, box, card, custom, kicker, line, text, title } from '../deck/draw'
import { L, R, W } from '../deck/theme'
import type { SlideDef } from '../deck/types'

export const caseIntro: SlideDef = {
  id: 'case-intro',
  name: 'งาน frontend ของฉันก็เจอ',
  section: 3,
  notes:
    'จบเรื่องของ Lauren แล้ว ต่อไปคือของฉัน ตัวอย่างทั้งหมดมาจาก 2 repo จริง คือ maxion-nft-marketplace-interface ซึ่งเป็น marketplace ที่ขายไอเทมของ 5 เกม (Ragnarok Landverse Thailand หรือ ROLTH, Dragonica Landverse, Ragnarok Landverse Genesis, Ragnarok Landverse America และ Ragnarok Landverse Classic) บน Next.js 16 และ ragnarok-playground-interface ซึ่งเป็นเว็บ BiFrost บน Vite + React ปัญหาแรก เครื่องตรวจอัตโนมัติอย่าง typecheck, lint, build ไม่เห็นหน้าจอ หน้าอาจล้นที่จอมือถือ 393 px หรือมี console error ที่ไม่เคยมี ปัญหาที่สอง ขั้นที่ต้องยืนยันใน MetaMask หรือ Ronin Wallet agent กดแทนคนไม่ได้ และไม่ควรกด ปัญหาที่สาม เว็บเดียวรองรับหลายเกม ทุก PR ต้องทำให้เกมเดิมเหมือนเดิม นี่คือปัญหาเดียวกับที่ Lauren เปิดไว้: agent บอกว่าเสร็จ แต่เราไม่กล้าเชื่อ หน้าถัดไป: ฉันเลยเอา 3 ข้อของ Lauren มาประกอบเป็นเครื่องมือของตัวเอง',
  draw(c) {
    const y0 = title(c, 'งาน frontend ของฉันก็เจอแบบเดียวกัน\nตรวจผ่านหมด แต่ผู้ใช้ใช้ไม่ได้', 2)
    kicker(c, y0, 'ตัวอย่างจาก 2 repo ที่ฉันดูแล: maxion-nft-marketplace-interface (ขายไอเทม 5 เกม) และ ragnarok-playground-interface (BiFrost)')
    const cards: [string, string][] = [
      ['ตรวจผ่าน แต่จอพัง', 'ผ่านเครื่องตรวจทุกตัว แต่บนมือถือหน้าล้น หรือมี error ซ่อนอยู่'],
      ['บางขั้นต้องใช้คน', 'ล็อกอิน ซื้อ ขาย ต้องกดยืนยันในกระเป๋าเงินคริปโต (wallet)'],
      ['เว็บเดียว 5 เกม', 'แก้หน้าให้เกมหนึ่ง อีกเกมอาจพังโดยไม่มีใครเห็น'],
    ]
    cards.forEach(([h, b], i) => {
      at(c, i, () => card(c, L + i * 567, 380, 530, 290, { head: h, headKind: 'lead', body: b, bodyKind: 'body' }))
    })
    at(c, 3, () => text(c, L, 730, 'เครื่องตรวจอัตโนมัติมองไม่เห็นปัญหาพวกนี้\nต้องมี**ตัวตรวจแบบ Lauren** และขั้นที่คนทำคู่กับ agent', { kind: 'lead', w: W }))
  },
}

export const caseMap: SlideDef = {
  id: 'case-map',
  name: 'หลักของ pitwall',
  section: 3,
  notes:
    'ก่อนดูว่าใช้ยังไง ดูหลักก่อน ชื่อ pitwall มาจาก pit wall ในการแข่ง F1 คือแถวริมสนามที่หัวหน้าทีมกับวิศวกรนั่งดูข้อมูลจากรถทุกวินาที แล้วสั่งนักขับผ่านวิทยุ คนบน pit wall ไม่ได้ขับรถเอง แต่ตัดสินใจเรื่องกลยุทธ์ ว่าจะวิ่งต่อหรือเรียกเข้าพิท ภาพนี้คือหลักทั้ง 3 ข้อ ข้อแรก คนคุมเกม agent ลงมือ ฉันวางแผนและตัดสินใจ ไม่ได้เขียนโค้ดเองทุกบรรทัด ข้อสอง ไม่มีหลักฐานไม่นับว่าเสร็จ คือข้อหนึ่งของ Lauren ทุกชิ้นต้องผ่านตัวตรวจก่อนถึงมือคน ข้อสาม ไม่มั่นใจให้พัก ไม่เดา agent จะไม่ฟันธงเอง แต่จดเหตุผลแล้วพักงานไว้ให้คนตัดสิน ตรงกับปัญหาที่ Lauren เปิดไว้ว่า agent ชอบตอบผิดอย่างมั่นใจ pitwall เป็น plugin ของ Claude Code ที่ฉันประกอบจากชิ้นส่วนของ pstack verify skill ของฉันดัดแปลงจาก create-verification-skill ทีมรีวิวมาจากการแจกงานให้ subagent และหลักการหลายข้ออยู่ในกฎของ repo หน้าถัดไป: หลัก 3 ข้อนี้กลายเป็นขั้นตอนของงานหนึ่งชิ้นยังไง',
  draw(c) {
    title(c, 'pitwall คือคำตอบของ Lauren ที่ฉันประกอบใส่งาน web\nหลักคือ ฉันคุมเกม agent ลงมือ', 2)
    custom(c, 'pitscene', L, 300, { w: 1000, h: 600 })
    text(c, L + 530, 298, 'pit wall · watches data, radios the driver', { kind: 'tiny', tone: 'accent', w: 480 })
    text(c, L + 20, 910, 'car · the agent drives', { kind: 'tiny', tone: 'muted' })
    const rules: [string, string][] = [
      ['ฉันคุมเกม agent ลงมือ', 'ฉันวางแผนและตัดสินใจ agent เขียนโค้ด เหมือนคนบน pit wall กับนักขับ'],
      ['ไม่มีหลักฐาน ไม่นับว่าเสร็จ', 'ทุกชิ้นต้องผ่านตัวตรวจก่อนถึงมือคน'],
      ['ไม่มั่นใจ ให้พัก ไม่เดา', 'agent จดเหตุผลแล้วพักงานไว้ ให้คนเป็นคนตัดสิน'],
    ]
    rules.forEach(([h, b], i) => {
      const y = 320 + i * 170
      at(c, i, () => {
        numeral(c, 1180, y, String(i + 1), 72)
        text(c, 1260, y + 8, `**${h}**`, { kind: 'body', w: R - 1260 })
        text(c, 1260, y + 62, b, { kind: 'small', w: R - 1260 })
      })
    })
    at(c, 3, () => text(c, 1180, 850, 'ประกอบจาก pstack: verify skill, ทีมรีวิว และหลักการในกฎของ repo', { kind: 'small', tone: 'muted', w: R - 1180 }))
  },
}

export const caseVerify: SlideDef = {
  id: 'case-verify',
  name: 'วัดผล 3 ระดับ',
  section: 3,
  notes:
    'นี่คือการตรวจชั้นแรกจากหน้าที่แล้ว และตรงกับสิ่งที่ Lauren แชร์จอ คือ verify skill ที่ขับแอปจริง และ feature map ที่เขียนทุก feature จากมุมผู้ใช้ โฟลเดอร์ features ของ verify-mkp ใช้หลักเดียวกัน แบ่ง 3 ระดับตามไฟล์ที่แก้ ระดับ A คือเครื่องตรวจอัตโนมัติ agent รันเองได้ทุกเมื่อ สำหรับ dev คือ yarn typecheck, lint, test, check:i18n, build และ script ที่ขึ้นต้นด้วย audit ระดับ B คือ skill ชื่อ verify-mkp ที่ดัดแปลงจาก create-verification-skill ของ pstack เปิดเว็บที่ port 3000 แล้วกดตามที่ผู้ใช้กด ตรวจที่จอ 393 และ 1366 px และ console error ต้องเป็น 0 หรือเท่ากับที่ develop มี ระดับ C คือขั้นที่ต้องยืนยันใน wallet เราเรียกว่า pair run คือ agent บอกขั้นตอนครั้งเดียว คนกดแค่ใน popup แล้ว agent ดูผลและไปต่อเอง ถ้าตรวจไม่ได้ ต้องเขียนเป็นข้อที่รอคนใต้หัวข้อ Not done yet และ script check:pr-body จะไม่ยอมให้เปิด PR ถ้าไม่มี หน้าถัดไป: พอทุกชิ้นผ่านการตรวจทั้ง 2 ชั้นแล้ว ก็ไม่ต้องนั่งเฝ้า',
  draw(c) {
    title(c, 'ตรวจชั้นที่ 1: วัดผล 3 ระดับก่อนบอกว่าเสร็จ\nagent ทำเองสองระดับ อีกระดับทำคู่กับคน', 2)
    const levels: [string, string, string, string][] = [
      ['A', 'เครื่องตรวจอัตโนมัติ', 'ชนิดข้อมูล มาตรฐานโค้ด test และ build', 'agent รันเองได้ทุกเมื่อ'],
      ['B', 'agent เปิดเว็บจริง', 'กดตามผู้ใช้ ทั้งบนมือถือและจอคอม โดย error ต้องไม่เพิ่มจากเดิม', 'agent ทำเอง'],
      ['C', 'คนกดยืนยันใน wallet', 'คนกดแค่ปุ่มยืนยัน แล้ว agent ทำส่วนที่เหลือต่อเอง', 'คนกับ agent ทำคู่กัน'],
    ]
    levels.forEach(([k, h, b, who], i) => {
      const x = L + i * 567
      const hot = i === 2
      at(c, i, () => {
        box(c, x, 320, 530, 460, { tone: hot ? 'accent' : 'ink', fill: hot ? 'tint' : 'paper' })
        numeral(c, x + 36, 350, k, 90)
        text(c, x + 36, 470, h, { kind: 'lead', w: 458 })
        text(c, x + 36, 540, b, { kind: 'small', w: 458 })
        text(c, x + 36, 700, `**${who}**`, { kind: 'small', w: 458 })
      })
    })
    at(c, 3, () => text(c, L, 830, 'ข้อไหนตรวจไม่ได้ ต้องเขียนว่า **“ยังไม่ได้ตรวจ”** พร้อมเหตุผล ห้ามเขียนว่าผ่าน', { kind: 'lead', w: W }))
  },
}

export const ucDaytime: SlideDef = {
  id: 'uc-daytime',
  name: 'งานหนึ่งชิ้น',
  section: 3,
  notes:
    'นี่คือ 1 รอบของ pitwall ตั้งแต่รับงานจนส่ง ชื่อคำสั่งด้านขวาตั้งตามสนามแข่ง ข้อ 1 คือ /pitwall:queue อ่านแผนงานแล้วถามทุกข้อที่ไม่ชัดแบบติ๊กรอบเดียวตอนเช้า ระหว่างวิ่งจะไม่หยุดถาม ข้อที่ไม่มีคำตอบและมั่นใจไม่ถึง 95% จะถูกพักไว้ ข้อ 2 /pitwall:lap ทำทีละชิ้น หรือ /pitwall:drive ปล่อยวิ่งจนหมดคิว agent สร้าง branch ชื่อ agent/... แล้วเลือกคู่มือตามชนิดงาน ข้อ 3 คือกองทัพ ตัวเขียนใช้ sonnet ถ้าทำตามแบบเดิม ใช้ opus ถ้าต้องออกแบบ ส่วน review ใช้ทั้งสอง model แล้วรวมผล ข้อ 4 คือการตรวจชั้นแรก /pitwall:gauge วัดผล 3 ระดับ ซึ่งจะดูละเอียดในหน้าถัดไป ข้อ 5 คือการตรวจชั้นที่สอง verifier ที่เป็น agent ตัวใหม่ทุกครั้ง อ่านอย่างเดียว ความเป็นอิสระมาจากการที่มันไม่เห็นงานมาก่อน ผลตรวจผูกกับเวอร์ชันของโค้ด ถ้าโค้ดเปลี่ยนหลังตรวจ ผลนั้นใช้ไม่ได้ สุดท้าย script check:pr-body จะไม่ยอมให้เปิด PR ถ้าไม่มีแถวผลตรวจ ถ้าต้องหยุดกลางทาง /pitwall:stop จบงานนี้ก่อน /pitwall:brake หยุดทันที กดทีละครั้งให้ขึ้นทีละขั้น หน้าถัดไป: ตรวจชั้นแรก 3 ระดับ',
  draw(c) {
    title(c, 'งานหนึ่งชิ้นผ่านการตรวจ 2 ชั้นก่อนถึงมือคน')
    const rows: [string, string][] = [
      ['ตอนเช้า ฉันใส่งานเข้าคิวและตอบข้อสงสัยทีเดียว ข้อไหน agent ไม่มั่นใจจะพักไว้', 'queue'],
      ['agent แยก branch ออกไปทำ แล้วเลือกคู่มือให้ตรงกับงาน', 'lap · drive'],
      ['agent ตัวหนึ่งเขียน อีก 2 ตัวช่วยกัน review', ''],
      ['**ตรวจชั้นที่ 1:** วัดผล 3 ระดับ ส่วนที่ต้องใช้คนทำคู่กัน (หน้าถัดไป)', 'gauge'],
      ['**ตรวจชั้นที่ 2:** agent ตัวใหม่ที่ไม่เคยเห็นงานนี้ ตรวจซ้ำ แล้วค่อยส่งงาน', 'verifier'],
    ]
    rows.forEach(([s, cmd], i) => {
      const y = 250 + i * 118
      at(c, i, () => {
        numeral(c, L, y, String(i + 1), 72, i >= 3 ? 'accent' : 'muted')
        text(c, L + 110, y + 12, s, { kind: 'body', w: W - 110 - 220 })
        if (cmd) text(c, R - 200, y + 18, cmd, { kind: 'tiny', tone: 'muted', w: 200, align: 'end' })
      })
    })
    at(c, 5, () => box(c, L, 860, W, 110, { label: 'ไม่มีหลักฐานการตรวจ ก็ส่งงานไม่ได้ เพราะมี script บังคับ ไม่ใช่แค่ขอร้อง', tone: 'accent', fill: 'tint' }))
  },
}

export const morning: SlideDef = {
  id: 'morning',
  name: 'ตอนเช้าอ่านบันทึก',
  section: 3,
  notes:
    'ก่อนปล่อยวิ่ง เช็กว่าไม่มีใครทำงานอยู่ในเครื่องเดียวกัน เพราะ agent จะสลับ branch เอง และ browser ที่มี wallet ต้องต่ออยู่ แล้วสั่ง /pitwall:drive agent จะทำงานในคิวทีละชิ้น ถ้าผ่านทุกด่าน คือผลตรวจซ้ำผ่านที่โค้ดเวอร์ชันล่าสุด check ใน GitHub ผ่าน และไม่มี conflict จะ merge เข้า develop เองผ่าน script ตัวเดียว ส่วน release และ prod ยังเป็นคน merge เสมอ ตอนเช้าเราไม่ชิมทุกจาน แต่สุ่มตรวจงานที่เข้าไปแล้ว เหมือนที่ Lauren เล่าในไลฟ์กับ Matt Pocock ว่าตอนเช้าเธอดู commit history ถ้าเจอปัญหาก็ revert หรือแก้ แล้วเพิ่ม lint rule ทุก 30 วัน agent จะใส่งานดูแลตัวตรวจเข้าคิวเอง เพื่อให้ตัวตรวจไม่เก่า หน้าถัดไป: ย้อนกลับไปที่ 3 คำตอบของ Lauren ว่าฉันทำถึงไหนแล้ว',
  draw(c) {
    title(c, 'ตอนเช้าฉันอ่านบันทึก ไม่ต้องไล่อ่านทุกบรรทัด')
    card(c, L, 280, 812, 400, {
      kick: 'ระหว่างคืน',
      body: '· agent ทำงานในคิวทีละชิ้น\n· ผ่านทุกด่าน → merge เข้า develop เอง\n· release และ prod ยังเป็นคนกดเสมอ\n· สั่งหยุดได้: จบงานนี้ก่อน หรือหยุดทันที',
      bodyKind: 'body',
    })
    at(c, 1, () => {
      card(c, 980, 280, 812, 400, {
        kick: 'ตอนเช้า',
        body: '· สุ่มตรวจงานที่ merge แล้ว พลาดก็ revert\n· กดยืนยัน wallet ในขั้นที่รอคน\n· อ่านเหตุผลของงานที่ถูกพักไว้\n· เจอปัญหาซ้ำ → แก้ที่ระบบ',
        bodyKind: 'body',
        tone: 'accent',
        fill: 'tint',
      })
    })
    at(c, 2, () => text(c, L, 740, '**อ่านบันทึก ไม่ใช่อ่านแชตทั้งคืน** เหมือนที่ Lauren สุ่มตรวจ commit ตอนเช้า', { kind: 'body', w: W }))
  },
}
