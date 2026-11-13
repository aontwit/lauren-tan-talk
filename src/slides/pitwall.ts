import { arrow, at, numeral, box, card, custom, kicker, line, text, title } from '../deck/draw'
import { L, R, W } from '../deck/theme'
import type { SlideDef } from '../deck/types'

export const caseIntro: SlideDef = {
  id: 'case-intro',
  name: 'งาน frontend ของผมก็เจอ',
  section: 3,
  notes:
    'จบเรื่องของ Lauren แล้ว ต่อไปเป็นเรื่องของผมเอง\nตัวอย่างทั้งหมดมาจาก 2 repo ที่ผมดูแลจริง\nตัวแรกคือ maxion-nft-marketplace-interface เป็น marketplace ขายไอเทมของ 5 เกม คือ Ragnarok Landverse Thailand หรือ ROLTH, Dragonica Landverse, Ragnarok Landverse Genesis, Ragnarok Landverse America และ Ragnarok Landverse Classic ตัวนี้เขียนด้วย Next.js 16\nตัวที่สองคือ ragnarok-playground-interface เป็นเว็บ BiFrost เขียนด้วย Vite กับ React\nปัญหาแรก เครื่องตรวจอัตโนมัติ เช่น ตัวเช็กชนิดข้อมูล ตัวเช็กมาตรฐานโค้ด และการ build มองไม่เห็นหน้าจอ\nหน้าเว็บอาจล้นบนจอมือถือกว้าง 393 px หรือมี error ใหม่โผล่ขึ้นมาใน browser โดยที่ทุกอย่างยังขึ้นว่าผ่าน\nปัญหาที่สอง บางขั้นต้องกดยืนยันในกระเป๋าเงินคริปโต อย่าง MetaMask หรือ Ronin Wallet ขั้นนี้ agent กดแทนคนไม่ได้ และไม่ควรกดด้วย\nปัญหาที่สาม เว็บเดียวรองรับหลายเกม ทุกครั้งที่แก้ เกมเดิมต้องยังทำงานเหมือนเดิม\nทั้งหมดนี้คือปัญหาเดียวกับที่ Lauren เปิดไว้ agent บอกว่าเสร็จแล้ว แต่ผมไม่กล้าเชื่อ\nที่มา: repo maxion-nft-marketplace-interface และ ragnarok-playground-interface เครื่องตรวจที่พูดถึงคือ typecheck, lint และ build ส่วน error คือ console error ใน browser\nหน้าถัดไป: ผมเลยเอา 3 ข้อของ Lauren มาประกอบเป็นเครื่องมือของตัวเอง',
  draw(c) {
    const y0 = title(c, 'งาน frontend ของผมก็เจอแบบเดียวกัน\nตรวจผ่านหมด แต่ผู้ใช้ใช้ไม่ได้', 2)
    kicker(c, y0, 'ตัวอย่างจาก 2 repo ที่ผมดูแล: maxion-nft-marketplace-interface (ขายไอเทม 5 เกม) และ ragnarok-playground-interface (BiFrost)')
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
    'ก่อนดูว่าใช้ยังไง ขอเล่าหลักก่อน\nชื่อ pitwall มาจาก pit wall ในการแข่ง F1 คือแถวริมสนามที่หัวหน้าทีมกับวิศวกรนั่งดูข้อมูลจากรถทุกวินาที แล้วสั่งนักขับผ่านวิทยุ\nคนบน pit wall ไม่ได้ขับรถเอง แต่เป็นคนตัดสินใจเรื่องกลยุทธ์ ว่าจะให้วิ่งต่อ หรือเรียกเข้าพิท\nภาพนี้คือหลักทั้ง 3 ข้อของผม\nข้อแรก ผมคุมเกม agent ลงมือ ผมวางแผนและตัดสินใจ ไม่ได้เขียนโค้ดเองทุกบรรทัด\nข้อสอง ไม่มีหลักฐาน ไม่นับว่าเสร็จ นี่คือข้อแรกของ Lauren ทุกชิ้นต้องผ่านตัวตรวจก่อนถึงมือคน\nข้อสาม ไม่มั่นใจให้พัก ไม่เดา agent จะไม่ฟันธงเอง มันจะจดเหตุผลไว้ แล้วพักงานนั้นให้คนเป็นคนตัดสิน ข้อนี้ตอบปัญหาที่ Lauren เปิดไว้ ว่า agent ชอบตอบผิดอย่างมั่นใจ\npitwall เป็น plugin หรือส่วนเสริมของ Claude Code ที่ผมทำเป็น open source ให้ใครก็เอาไปใช้ได้ มีเว็บคู่มืออยู่ที่ pitwall.apiwit.xyz\nตอนนี้เป็นเวอร์ชัน 0.7.0 ยังอยู่ช่วง public beta มี 18 playbook และ 20 หลักการ ส่วนใหญ่ดัดแปลงจากชิ้นส่วนของ pstack\nเช่น skill ที่ใช้ตรวจงานของผมดัดแปลงจาก create-verification-skill ทีมรีวิวมาจากวิธีแจกงานให้ subagent และหลักการหลายข้อก็อยู่ในกฎของ repo\nที่มา: github.com/aontwit/pitwall (MIT License) และ pitwall.apiwit.xyz\nหน้าถัดไป: หลัก 3 ข้อนี้กลายเป็นขั้นตอนของงานหนึ่งชิ้นยังไง',
  draw(c) {
    title(c, 'pitwall คือคำตอบของ Lauren ที่ผมประกอบใส่งาน web\nหลักคือ ผมคุมเกม agent ลงมือ', 2)
    custom(c, 'pitscene', L, 300, { w: 1000, h: 600 })
    text(c, L + 530, 298, 'pit wall · watches data, radios the driver', { kind: 'tiny', tone: 'accent', w: 480 })
    text(c, L + 20, 910, 'car · the agent drives', { kind: 'tiny', tone: 'muted' })
    const rules: [string, string][] = [
      ['ผมคุมเกม agent ลงมือ', 'ผมวางแผนและตัดสินใจ agent เขียนโค้ด เหมือนคนบน pit wall กับนักขับ'],
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
    at(c, 3, () => text(c, 1180, 850, 'pitwall.apiwit.xyz', { kind: 'small', tone: 'muted', w: R - 1180 }))
  },
}

export const caseVerify: SlideDef = {
  id: 'case-verify',
  name: 'วัดผล 3 ระดับ',
  section: 3,
  notes:
    'นี่คือการตรวจชั้นแรกจากหน้าที่แล้ว\nตรงกับสิ่งที่ Lauren แชร์จอให้ดู คือ verify skill ที่ขับแอปจริง และ feature map ที่เขียนทุก feature จากมุมผู้ใช้ โฟลเดอร์ features ของ verify-mkp ก็ใช้หลักเดียวกัน\nการตรวจแบ่งเป็น 3 ระดับ เลือกตามไฟล์ที่แก้\nระดับ A คือเครื่องตรวจอัตโนมัติ agent รันเองได้ทุกเมื่อ ตรวจชนิดข้อมูล มาตรฐานโค้ด test และ build\nระดับ B คือ skill ชื่อ verify-mkp ที่ดัดแปลงจาก create-verification-skill ของ pstack มันเปิดเว็บขึ้นมาจริง แล้วกดตามที่ผู้ใช้กด\nมันตรวจทั้งจอมือถือกว้าง 393 px และจอคอม 1366 px และ error ใน browser ต้องเป็นศูนย์ หรือไม่เกินที่ develop มีอยู่แล้ว\nระดับ C คือขั้นที่ต้องกดยืนยันใน wallet ผมเรียกว่า pair run คือทำคู่กัน agent บอกขั้นตอนครั้งเดียว คนกดแค่ใน popup แล้ว agent ดูผลและทำต่อเอง\nข้อไหนตรวจไม่ได้ ต้องเขียนเป็นข้อที่รอคน ใต้หัวข้อ Not done yet ห้ามเขียนว่าผ่าน\nถ้าไม่มีหัวข้อนี้ script check:pr-body จะไม่ยอมให้เปิด PR\nที่มา: .claude/agent-loop.md และ package.json ของ repo maxion-nft-marketplace-interface ระดับ A สำหรับ dev คือ yarn typecheck, lint, test, check:i18n, build และ script ที่ขึ้นต้นด้วย audit ระดับ B เปิดเว็บที่ port 3000\nหน้าถัดไป: พอทุกชิ้นผ่านการตรวจทั้ง 2 ชั้นแล้ว ก็ไม่ต้องนั่งเฝ้า',
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
    'นี่คือหนึ่งรอบของ pitwall ตั้งแต่รับงานจนส่งงาน ชื่อคำสั่งด้านขวาตั้งตามสนามแข่ง\nข้อ 1 คือ /pitwall:queue agent อ่านแผนงาน แล้วถามทุกข้อที่ยังไม่ชัดในรอบเดียวตอนเช้า ผมแค่ติ๊กตอบ\nระหว่างทำงาน agent จะไม่หยุดถามอีก ข้อไหนไม่มีคำตอบ และมั่นใจไม่ถึง 95% จะถูกพักไว้\nข้อ 2 สั่ง /pitwall:lap ให้ทำทีละชิ้น หรือ /pitwall:drive ให้วิ่งไปจนหมดคิว agent จะแยก branch ของตัวเองชื่อขึ้นต้นด้วย agent/ แล้วเลือกคู่มือให้ตรงกับชนิดงาน\nข้อ 3 คือกองทัพ ถ้างานทำตามแบบเดิม ตัวเขียนใช้ sonnet ซึ่งเร็วและถูกกว่า ถ้าต้องออกแบบใหม่ใช้ opus ซึ่งคิดลึกกว่า ส่วนการ review ใช้ทั้งสอง model แล้วรวมผล\nข้อ 4 คือการตรวจชั้นแรก /pitwall:gauge วัดผล 3 ระดับ เดี๋ยวดูละเอียดในหน้าถัดไป\nข้อ 5 คือการตรวจชั้นที่สอง ตัวตรวจเป็น agent ตัวใหม่ทุกครั้ง อ่านได้อย่างเดียว แก้อะไรไม่ได้ มันเป็นกลางได้เพราะไม่เคยเห็นงานนี้มาก่อน\nผลตรวจผูกกับเวอร์ชันของโค้ด ถ้าโค้ดเปลี่ยนหลังตรวจ ผลนั้นใช้ไม่ได้ต้องตรวจใหม่\nสุดท้าย มี script ชื่อ check:pr-body ที่ไม่ยอมให้เปิด PR ถ้าไม่มีแถวผลตรวจ\nถ้าต้องหยุดกลางทาง /pitwall:stop จะทำงานชิ้นนี้ให้จบก่อนแล้วหยุด ส่วน /pitwall:brake หยุดทันที\nที่มา: กติกาใน .claude/agent-loop.md ของ repo maxion-nft-marketplace-interface\nหน้าถัดไป: ตรวจชั้นแรก 3 ระดับ',
  draw(c) {
    title(c, 'งานหนึ่งชิ้นผ่านการตรวจ 2 ชั้นก่อนถึงมือคน')
    const rows: [string, string][] = [
      ['ตอนเช้า ผมใส่งานเข้าคิวและตอบข้อสงสัยทีเดียว ข้อไหน agent ไม่มั่นใจจะพักไว้', 'queue'],
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
    'ก่อนปล่อยให้ agent ทำงาน ต้องเช็กสองอย่าง\nหนึ่ง ไม่มีใครทำงานอยู่ในเครื่องเดียวกัน เพราะ agent จะสลับ branch เอง\nสอง browser ที่มี wallet ต้องต่ออยู่\nแล้วผมก็สั่ง /pitwall:drive agent จะทำงานในคิวทีละชิ้น\nถ้างานไหนผ่านทุกด่าน คือผลตรวจซ้ำผ่านที่โค้ดเวอร์ชันล่าสุด check ใน GitHub ผ่าน และไม่มีโค้ดชนกัน agent จะ merge เข้า develop เองผ่าน script ตัวเดียว\nฟีเจอร์นี้ของ pitwall ชื่อ merge: auto ใช้ 6 ด่านตามแบบการส่งงานของ pstack\nส่วน release และ prod ยังเป็นคน merge เสมอ\nตอนเช้าผมไม่ได้ชิมทุกจาน แต่สุ่มตรวจงานที่เข้าไปแล้ว\nเหมือนที่ Lauren เล่าว่าตอนเช้าเธอดูประวัติ commit ถ้าเจอปัญหาก็ revert คือถอยงานนั้นออก หรือแก้ แล้วเพิ่มกฎ lint กันไม่ให้พลาดซ้ำ\nทุก 30 วัน agent จะใส่งานดูแลตัวตรวจเข้าคิวเอง ตัวตรวจจะได้ไม่เก่าตามโค้ด\nที่มา: กติกาใน .claude/agent-loop.md ของ repo maxion-nft-marketplace-interface ส่วนเรื่องสุ่มตรวจ commit ตอนเช้า Lauren เล่าในไลฟ์กับ Matt Pocock\nหน้าถัดไป: ย้อนกลับไปที่ 3 คำตอบของ Lauren ว่าผมทำถึงไหนแล้ว',
  draw(c) {
    title(c, 'ตอนเช้าผมอ่านบันทึก ไม่ต้องไล่อ่านทุกบรรทัด')
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
