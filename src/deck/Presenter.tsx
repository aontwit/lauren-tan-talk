import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { ROWS, SLIDES } from '../slides'
import { buildDeck } from './build'
import { glossAll } from './glossary'
import { openChannel, type DeckState } from './sync'

/**
 * Speaker view: open with "p" from the deck, or /?presenter. Shows notes, with
 * English terms explained in brackets the first time they come up, and the
 * next slide. Arrow keys here drive the audience window.
 */
export function Presenter() {
  const [state, setState] = useState<DeckState>({ slide: 0, step: 0 })
  const channel = useRef<ReturnType<typeof openChannel> | null>(null)
  // The deck this window drives: the one that opened it ("p"), or else the
  // first deck that answers. Other deck tabs are ignored.
  const deckRef = useRef<string | null>(new URLSearchParams(location.search).get('deck'))
  const [linked, setLinked] = useState(false)

  useEffect(() => {
    channel.current = openChannel((m) => {
      if (m.kind !== 'state') return
      if (!deckRef.current) deckRef.current = m.from
      if (m.from !== deckRef.current) return
      setLinked(true)
      setState(m.state)
    })
    channel.current.send({ kind: 'hello', to: deckRef.current ?? undefined })
    return () => channel.current?.close()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const send = (cmd: 'next' | 'prev') => {
        e.preventDefault()
        deckRef.current && channel.current?.send({ kind: 'cmd', to: deckRef.current, cmd })
      }
      if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(e.key)) send('next')
      if (['ArrowLeft', 'PageUp', 'Backspace'].includes(e.key)) send('prev')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const maxSteps = useMemo(() => buildDeck(ROWS).slides.map((s) => s.maxStep), [])
  const cur = SLIDES[state.slide]
  const max = maxSteps[state.slide] ?? 0
  const left = max - state.step
  const nxt = SLIDES[state.slide + 1]
  const glossed = useMemo(() => glossAll(SLIDES.map((s) => s.notes)), [])
  const pieces = glossed[state.slide] ?? []

  return (
    <div style={{ position: 'fixed', inset: 0, display: 'grid', gridTemplateRows: 'auto 1fr auto', gap: 24, padding: 32, boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: 22 }}>
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
      </div>
      <div style={{ overflow: 'auto', fontSize: 26, lineHeight: 1.55, borderTop: '3px solid var(--deck-ink)', paddingTop: 20 }}>
        {pieces.map((p, i) =>
          p.meaning ? (
            <span key={i}>
              <b>{p.text}</b>
              <span style={{ color: 'var(--deck-accent)' }}> ({p.meaning})</span>
            </span>
          ) : (
            <span key={i}>{p.text}</span>
          ),
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 20, color: 'var(--deck-muted)' }}>
        <span>
          หน้าถัดไป: {nxt ? nxt.name : 'จบแล้ว'}
          <span style={{ marginLeft: 24, color: linked ? 'var(--deck-muted)' : 'var(--deck-accent)' }}>
            {linked ? '● เชื่อมกับจอหลักแล้ว' : '○ ยังไม่เจอจอหลัก เปิดเด็คแล้วกด p'}
          </span>
        </span>
        <span>
          <button onClick={() => deckRef.current && channel.current?.send({ kind: 'cmd', to: deckRef.current, cmd: 'prev' })} style={btn}>
            ← ย้อน
          </button>{' '}
          <button onClick={() => deckRef.current && channel.current?.send({ kind: 'cmd', to: deckRef.current, cmd: 'next' })} style={btn}>
            ถัดไป →
          </button>
        </span>
      </div>
    </div>
  )
}

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
