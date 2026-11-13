import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent } from 'react'
import { ROWS, SLIDES } from '../slides'
import { buildDeck } from './build'
import { glossAll } from './glossary'
import { forgetPass, isLocked, savePass, savedPass, unlockNotes } from './notes'
import { openChannel, type DeckState } from './sync'

/**
 * Speaker view: open with "p" from the deck. Left, the slide exactly as the
 * audience sees it (a live mirror of the deck) with the notes under it; right,
 * the next slide and the controls. Arrow keys here drive the audience window.
 * On the public site the notes are encrypted and unlock with a passphrase.
 */
export function Presenter() {
  const [state, setState] = useState<DeckState>({ slide: 0, step: 0 })
  const channel = useRef<ReturnType<typeof openChannel> | null>(null)
  // The deck this window drives: the one that opened it ("p"), or else the
  // first deck that answers. Other deck tabs are ignored.
  const [deckId, setDeckId] = useState<string | null>(new URLSearchParams(location.search).get('deck'))
  const deckRef = useRef(deckId)
  const [linked, setLinked] = useState(false)

  useEffect(() => {
    channel.current = openChannel((m) => {
      if (m.kind !== 'state') return
      if (!deckRef.current) {
        deckRef.current = m.from
        setDeckId(m.from)
      }
      if (m.from !== deckRef.current) return
      setLinked(true)
      setState(m.state)
    })
    channel.current.send({ kind: 'hello', to: deckRef.current ?? undefined })
    return () => channel.current?.close()
  }, [])

  const send = (cmd: 'next' | 'prev') => deckRef.current && channel.current?.send({ kind: 'cmd', to: deckRef.current, cmd })

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'INPUT') return
      if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(e.key)) {
        e.preventDefault()
        send('next')
      }
      if (['ArrowLeft', 'PageUp', 'Backspace'].includes(e.key)) {
        e.preventDefault()
        send('prev')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Notes: plain in `npm run dev`, encrypted on the public site, or absent.
  const raw = useMemo(() => SLIDES.map((s) => s.notes), [])
  const locked = raw.some(isLocked)
  const empty = raw.every((n) => !n)
  const [notes, setNotes] = useState<string[] | null>(locked ? null : raw)
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')

  const unlock = async (p: string, remember: boolean) => {
    try {
      const plain = await unlockNotes(raw, p)
      if (remember) savePass(p)
      setNotes(plain)
      setError('')
    } catch {
      setError('รหัสไม่ถูก ลองอีกครั้ง')
    }
  }
  useEffect(() => {
    const p = savedPass()
    if (locked && p) void unlock(p, false)
  }, [])
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    void unlock(pass, true)
  }

  const maxSteps = useMemo(() => buildDeck(ROWS).slides.map((s) => s.maxStep), [])
  const glossed = useMemo(() => (notes ? glossAll(notes) : null), [notes])
  const cur = SLIDES[state.slide]
  const nxt = SLIDES[state.slide + 1]
  const left = (maxSteps[state.slide] ?? 0) - state.step
  const note = notes?.[state.slide] ?? ''
  const terms = (glossed?.[state.slide] ?? []).filter((p) => p.meaning)
  const mirror = (offset: number) => `${location.pathname}?follow=${deckId}&offset=${offset}`

  return (
    <div style={page}>
      <header style={bar}>
        <span>
          <b>
            {state.slide + 1} / {SLIDES.length}
          </b>
          {'  '}
          {cur?.name}
          <span style={{ color: left > 0 ? 'var(--deck-accent)' : 'var(--deck-muted)' }}>
            {left > 0 ? `  ·  ยังมีอีก ${left} คลิกในหน้านี้` : '  ·  คลิกถัดไปเปลี่ยนหน้า'}
          </span>
        </span>
        <span style={{ display: 'flex', gap: 16, alignItems: 'baseline', fontSize: 18 }}>
          {locked && notes && (
            <button
              onClick={() => {
                forgetPass()
                setNotes(null)
              }}
              style={{ ...btn, fontSize: 14, padding: '2px 10px', borderWidth: 2 }}
            >
              ล็อกบทพูดและลืมรหัสในเครื่องนี้
            </button>
          )}
          <span style={{ color: linked ? 'var(--deck-muted)' : 'var(--deck-accent)' }}>
            {linked ? '● เชื่อมกับจอคนดูแล้ว' : '○ ยังไม่เจอจอคนดู เปิดเด็คแล้วกด p'}
          </span>
        </span>
      </header>

      <section style={mainCol}>
        <div style={screen}>
          {deckId ? (
            <iframe title="จอที่คนดูเห็น" src={mirror(0)} style={frame} tabIndex={-1} />
          ) : (
            <div style={emptyScreen}>เปิดเด็คในอีกหน้าต่าง แล้วกด p ที่หน้าเด็ค</div>
          )}
        </div>
        <div style={notesBox}>
          {glossed ? (
            note ? (
              <>
                {/* Spoken lines first; "ที่มา:" and "หน้าถัดไป:" lines are for the speaker's eyes only. */}
                {note.split('\n').map((l, i) =>
                  /^(ที่มา|หน้าถัดไป):/.test(l) ? (
                    <p key={i} style={aside}>
                      {l}
                    </p>
                  ) : (
                    <p key={i} style={para}>
                      {l}
                    </p>
                  ),
                )}
                {terms.length > 0 && (
                  <dl style={termList}>
                    {terms.map((t) => (
                      <div key={t.text}>
                        <dt style={{ display: 'inline', fontWeight: 'bold' }}>{t.text}</dt>
                        <dd style={{ display: 'inline', margin: 0 }}> {t.meaning}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </>
            ) : (
              <span style={{ color: 'var(--deck-muted)' }}>{empty ? 'เวอร์ชันนี้ไม่มีบทพูด' : 'หน้านี้ไม่มีบทพูด'}</span>
            )
          ) : (
            <form onSubmit={onSubmit} style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <span>ใส่รหัสเพื่อเปิดบทพูด (เครื่องนี้จะจำไว้)</span>
              <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} autoFocus style={input} />
              <button type="submit" style={btn}>
                เปิด
              </button>
              {error && <span style={{ color: 'var(--deck-accent)' }}>{error}</span>}
            </form>
          )}
        </div>
      </section>

      <aside style={sideCol}>
        <div style={{ fontSize: 18, color: 'var(--deck-muted)' }}>หน้าถัดไป: {nxt ? nxt.name : 'จบแล้ว'}</div>
        <div style={screen}>{deckId && nxt ? <iframe title="หน้าถัดไป" src={mirror(1)} style={frame} tabIndex={-1} /> : null}</div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => send('prev')} style={btn}>
            ← ย้อน
          </button>
          <button onClick={() => send('next')} style={{ ...btn, flex: 1 }}>
            ถัดไป →
          </button>
        </div>
      </aside>
    </div>
  )
}

const page: CSSProperties = {
  position: 'fixed',
  inset: 0,
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 2fr)',
  gridTemplateRows: 'auto minmax(0, 1fr)',
  gap: 24,
  padding: 24,
  boxSizing: 'border-box',
}
const bar: CSSProperties = { gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: 22, gap: 16 }
const mainCol: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 16, minHeight: 0 }
const sideCol: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }
const screen: CSSProperties = { aspectRatio: '16 / 9', width: '100%', border: '3px solid var(--deck-ink)', borderRadius: 12, overflow: 'hidden', background: 'var(--deck-bg)', flexShrink: 0 }
const emptyScreen: CSSProperties = { height: '100%', display: 'grid', placeItems: 'center', fontSize: 22, color: 'var(--deck-muted)' }
const frame: CSSProperties = { width: '100%', height: '100%', border: 0, display: 'block', pointerEvents: 'none' }
const notesBox: CSSProperties = { flex: 1, minHeight: 0, overflow: 'auto', fontSize: 24, lineHeight: 1.55, borderTop: '3px solid var(--deck-ink)', paddingTop: 14 }
const para: CSSProperties = { margin: '0 0 0.7em' }
const aside: CSSProperties = { margin: '0 0 0.3em', fontSize: 18, color: 'var(--deck-muted)' }
const termList: CSSProperties = { margin: '0.8em 0 0', paddingTop: 10, borderTop: '2px dashed var(--deck-muted)', fontSize: 18, color: 'var(--deck-muted)', display: 'grid', gap: 4 }
const btn: CSSProperties = {
  font: 'inherit',
  fontSize: 20,
  padding: '8px 16px',
  border: '3px solid var(--deck-ink)',
  borderRadius: 12,
  background: 'var(--deck-bg)',
  color: 'var(--deck-ink)',
  cursor: 'pointer',
}
const input: CSSProperties = { font: 'inherit', fontSize: 20, padding: '6px 12px', border: '3px solid var(--deck-ink)', borderRadius: 12, background: 'var(--deck-bg)' }
