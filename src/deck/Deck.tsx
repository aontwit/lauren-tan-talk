import { useCallback, useEffect, useRef, useState, type MouseEvent as RMouseEvent, type PointerEvent as RPointerEvent } from 'react'
import { Box, Tldraw, type Editor, type TLShapePartial } from 'tldraw'
import { ROWS } from '../slides'
import { buildDeck, type BuiltDeck } from './build'
import { findCollisions, reflowStacks } from './draw'

/**
 * "p" opens the speaker window, linked to this deck. On the public site it
 * asks for the passphrase there, on the speaker's own screen, before showing
 * any notes (src/deck/notes.ts). The key is listed in the help only when
 * running locally, so the audience is never told about it.
 */
const LIST_P_IN_HELP = import.meta.env.DEV

/**
 * A deck opened with ?follow=<deck id> is a read-only mirror inside the
 * speaker window: it shows whatever slide that deck shows (offset 1 = the next
 * slide), never sends state, and takes no input.
 */
const params = new URLSearchParams(location.search)
const FOLLOW = params.get('follow')
const OFFSET = Number(params.get('offset') ?? 0)
import { PitSceneUtil } from './shapes/PitScene'
import { PortraitUtil } from './shapes/Portrait'
import { newDeckId, openChannel, readHash, writeHash, type DeckMessage, type DeckState } from './sync'
import { SLIDE } from './theme'

const shapeUtils = [PitSceneUtil, PortraitUtil]
const CAMERA_MS = 750
const FADE_MS = 380
/** A press that moves less than this, in screen pixels, is a click, not a pan. */
const CLICK_SLOP = 6

type Item = { id: TLShapePartial['id']; type: string }

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n))
}

/** Run editor updates without filling the undo stack (tldraw 3: editor.run). */
function quiet(editor: Editor, fn: () => void) {
  const run = (editor as unknown as { run?: (f: () => void, o: object) => void }).run
  if (run) run.call(editor, fn, { history: 'ignore' })
  else fn()
}

function setOpacity(editor: Editor, items: Item[], opacity: number) {
  if (!items.length) return
  quiet(editor, () => editor.updateShapes(items.map((i) => ({ id: i.id, type: i.type, opacity }) as TLShapePartial)))
}

function fadeIn(editor: Editor, items: Item[]) {
  if (document.hidden) return setOpacity(editor, items, 1)
  const t0 = performance.now()
  const tick = (t: number) => {
    const k = clamp((t - t0) / FADE_MS, 0, 1)
    setOpacity(editor, items, 1 - Math.pow(1 - k, 3))
    if (k < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

interface View {
  slide: number
  step: number
  maxStep: number
  overview: boolean
}

export function Deck() {
  const editorRef = useRef<Editor | null>(null)
  const deckRef = useRef<BuiltDeck | null>(null)
  const stateRef = useRef<DeckState>({ slide: 0, step: 0 })
  const overviewRef = useRef(false)
  const channelRef = useRef<ReturnType<typeof openChannel> | null>(null)
  const deckId = useRef(newDeckId()).current
  const pressRef = useRef<{ x: number; y: number } | null>(null)
  const digitsRef = useRef('')

  const [view, setView] = useState<View>({ slide: 0, step: 0, maxStep: 0, overview: false })
  const [digits, setDigits] = useState('')
  const [help, setHelp] = useState(true)
  const total = deckRef.current?.slides.length ?? 1

  const publish = useCallback(() => {
    const deck = deckRef.current
    const { slide, step } = stateRef.current
    document.documentElement.dataset.slide = `${slide + 1}.${step}`
    if (!FOLLOW) {
      writeHash(stateRef.current)
      channelRef.current?.send({ kind: 'state', from: deckId, state: stateRef.current })
    }
    setView({ slide, step, maxStep: deck?.slides[slide].maxStep ?? 0, overview: overviewRef.current })
  }, [])

  const frame = useCallback((slide: number, animate: boolean) => {
    const editor = editorRef.current
    const deck = deckRef.current
    if (!editor || !deck) return
    const s = deck.slides[slide]
    // A hidden tab gets no animation frames, so an animated camera would stall.
    const animated = animate && !document.hidden
    editor.zoomToBounds(new Box(s.ox, s.oy, SLIDE.w, SLIDE.h), {
      inset: 0,
      animation: animated ? { duration: CAMERA_MS } : undefined,
    })
  }, [])

  /** Show a slide at a given step: earlier steps visible, later steps hidden. */
  const show = useCallback(
    (slide: number, step: number, animate: boolean) => {
      const editor = editorRef.current
      const deck = deckRef.current
      if (!editor || !deck) return
      slide = clamp(slide, 0, deck.slides.length - 1)
      const s = deck.slides[slide]
      step = clamp(step, 0, s.maxStep)
      setOpacity(editor, s.records.filter((r) => r.step <= step), 1)
      setOpacity(editor, s.records.filter((r) => r.step > step), 0)
      stateRef.current = { slide, step }
      overviewRef.current = false
      frame(slide, animate)
      publish()
    },
    [frame, publish],
  )

  const next = useCallback(() => {
    const editor = editorRef.current
    const deck = deckRef.current
    if (!editor || !deck) return
    const { slide, step } = stateRef.current
    if (overviewRef.current) return show(slide, step, true)
    const s = deck.slides[slide]
    if (step < s.maxStep) {
      stateRef.current = { slide, step: step + 1 }
      fadeIn(editor, s.records.filter((r) => r.step === step + 1))
      publish()
    } else if (slide < deck.slides.length - 1) {
      show(slide + 1, 0, true)
    }
  }, [show, publish])

  const prev = useCallback(() => {
    const deck = deckRef.current
    if (!deck) return
    const { slide, step } = stateRef.current
    if (overviewRef.current) return show(slide, step, true)
    if (step > 0) show(slide, step - 1, false)
    else if (slide > 0) show(slide - 1, deck.slides[slide - 1].maxStep, true)
  }, [show])

  const toggleOverview = useCallback(() => {
    const editor = editorRef.current
    if (!editor) return
    if (overviewRef.current) return show(stateRef.current.slide, stateRef.current.step, true)
    overviewRef.current = true
    editor.zoomToFit({ animation: document.hidden ? undefined : { duration: CAMERA_MS } })
    publish()
  }, [show, publish])

  /** In the overview, find the slide under a screen point. */
  const slideAt = useCallback((clientX: number, clientY: number) => {
    const editor = editorRef.current
    const deck = deckRef.current
    if (!editor || !deck) return -1
    const p = editor.screenToPage({ x: clientX, y: clientY })
    return deck.slides.findIndex((s) => p.x >= s.ox && p.x <= s.ox + SLIDE.w && p.y >= s.oy && p.y <= s.oy + SLIDE.h)
  }, [])

  const handle = useCallback(
    (m: DeckMessage) => {
      const deck = deckRef.current
      if (!deck) return
      if (FOLLOW) {
        if (m.kind === 'state' && m.from === FOLLOW) {
          const slide = m.state.slide + OFFSET
          show(slide, OFFSET ? 0 : m.state.step, slide !== stateRef.current.slide)
        }
        return
      }
      // Only answer messages meant for this window (a hello without a target asks every deck).
      if ((m.kind === 'cmd' || m.kind === 'goto') && m.to !== deckId) return
      if (m.kind === 'hello' && m.to && m.to !== deckId) return
      if (m.kind === 'hello') publish()
      if (m.kind === 'goto') show(m.slide, 0, true)
      if (m.kind === 'cmd') {
        if (m.cmd === 'next') next()
        if (m.cmd === 'prev') prev()
        if (m.cmd === 'first') show(0, 0, true)
        if (m.cmd === 'last') show(deck.slides.length - 1, 0, true)
        if (m.cmd === 'overview') toggleOverview()
      }
    },
    [next, prev, show, toggleOverview, publish],
  )

  const onMount = useCallback(
    (editor: Editor) => {
      editorRef.current = editor
      const deck = buildDeck(ROWS)
      deckRef.current = deck

      editor.updateInstanceState({ isGridMode: true })
      let failed = 0
      for (const shape of deck.shapes) {
        try {
          editor.createShape(shape)
        } catch (err) {
          failed++
          console.error('[deck] could not create shape', shape.id, err)
        }
      }
      if (failed) console.warn(`[deck] ${failed} shape(s) failed; see errors above`)
      reflowStacks(editor)
      editor.clearHistory?.()
      editor.selectNone()
      editor.setCurrentTool('hand')

      const start = FOLLOW ? { slide: 0, step: 0 } : readHash()
      // The viewport is measured after mount; framing before that lands the
      // camera in the wrong place, so frame once now and again shortly after.
      show(start.slide, start.step, false)
      setTimeout(() => frame(stateRef.current.slide, false), 120)
      // A mirror asks its deck where it is as soon as it can draw.
      if (FOLLOW) channelRef.current?.send({ kind: 'hello', to: FOLLOW })

      if (import.meta.env.DEV) {
        ;(window as unknown as { __deck: unknown }).__deck = {
          show: (slide: number, step = 99) => show(slide, step, false),
          overview: () => toggleOverview(),
          collisions: () => findCollisions(editor),
          count: deck.slides.length,
        }
      }
    },
    [show, frame, toggleOverview],
  )

  // The presenter window talks to this one over a BroadcastChannel. It lives in
  // its own effect so React's dev-mode remount cannot leave it closed.
  const handleRef = useRef(handle)
  handleRef.current = handle
  useEffect(() => {
    const ch = openChannel((m) => handleRef.current(m))
    channelRef.current = ch
    if (FOLLOW) ch.send({ kind: 'hello', to: FOLLOW })
    else if (deckRef.current) publish()
    return () => {
      ch.close()
      if (channelRef.current === ch) channelRef.current = null
    }
  }, [publish])

  // Keyboard: our keys drive the deck; every other key is kept away from tldraw
  // so no shortcut can edit or restyle the board during the talk.
  useEffect(() => {
    if (FOLLOW) return
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      e.stopPropagation()
      const k = e.key
      if (/^[0-9]$/.test(k)) {
        digitsRef.current = (digitsRef.current + k).slice(-2)
        setDigits(digitsRef.current)
      } else if (k === 'Enter' && digitsRef.current) {
        show(Number(digitsRef.current) - 1, 0, true)
        digitsRef.current = ''
        setDigits('')
      } else if (k === 'ArrowRight' || k === 'ArrowDown' || k === 'PageDown' || k === ' ' || k === 'Enter') next()
      else if (k === 'ArrowLeft' || k === 'ArrowUp' || k === 'PageUp' || k === 'Backspace') prev()
      else if (k === 'Home') show(0, 0, true)
      else if (k === 'End') show((deckRef.current?.slides.length ?? 1) - 1, 0, true)
      else if (k === 'o') toggleOverview()
      else if (k === 'Escape') {
        digitsRef.current = ''
        setDigits('')
        setHelp(false)
        show(stateRef.current.slide, stateRef.current.step, true)
      } else if (k === '?') setHelp((h) => !h)
      else if (k === 'f') document.documentElement.requestFullscreen?.()
      else if (k === 'p') window.open(`${location.pathname}?presenter&deck=${deckId}`, 'lauren-tan-presenter', 'width=1400,height=860')
      else return
      e.preventDefault()
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [next, prev, show, toggleOverview])

  // Keep the current slide filling the window when it resizes.
  useEffect(() => {
    const onResize = () => {
      if (!overviewRef.current) frame(stateRef.current.slide, false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [frame])

  // Hide the key help after a few seconds on first load.
  useEffect(() => {
    if (FOLLOW) setHelp(false)
    const t = setTimeout(() => setHelp(false), 5000)
    return () => clearTimeout(t)
  }, [])

  // A click (press without dragging) moves forward; in the overview it jumps
  // to the slide under the pointer. Dragging still pans the board.
  const onPointerDown = (e: RPointerEvent) => {
    if (e.button === 0) pressRef.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerUp = (e: RPointerEvent) => {
    const p = pressRef.current
    pressRef.current = null
    if (!p || e.button !== 0) return
    if (Math.hypot(e.clientX - p.x, e.clientY - p.y) > CLICK_SLOP) return
    if (overviewRef.current) {
      const i = slideAt(e.clientX, e.clientY)
      if (i >= 0) show(i, 0, true)
      return
    }
    next()
  }
  const onContextMenu = (e: RMouseEvent) => {
    e.preventDefault()
    prev()
  }

  if (FOLLOW) {
    return (
      <div className="deck-show" style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}>
        <Tldraw hideUi licenseKey={import.meta.env.VITE_TLDRAW_LICENSE_KEY} shapeUtils={shapeUtils} onMount={onMount} />
      </div>
    )
  }

  const progress = total > 1 ? (view.slide + (view.maxStep ? view.step / (view.maxStep + 1) : 0)) / (total - 1) : 0

  return (
    <div className="deck-show" style={{ position: 'fixed', inset: 0 }} onPointerDownCapture={onPointerDown} onPointerUpCapture={onPointerUp} onContextMenu={onContextMenu}>
      <Tldraw hideUi licenseKey={import.meta.env.VITE_TLDRAW_LICENSE_KEY} shapeUtils={shapeUtils} onMount={onMount} />
      <div className="deck-progress" aria-hidden="true">
        <div className="deck-progress__bar" style={{ width: `${clamp(progress, 0, 1) * 100}%` }} />
      </div>
      {view.maxStep > 0 && !view.overview && (
        <div className="deck-steps" aria-hidden="true">
          {Array.from({ length: view.maxStep + 1 }, (_, i) => (
            <span key={i} className={i <= view.step ? 'is-on' : ''} />
          ))}
        </div>
      )}
      {digits && <div className="deck-goto">ไปหน้า {digits} ↵</div>}
      {view.overview && <div className="deck-banner">ภาพรวม · คลิกหน้าที่อยากไป หรือกด o เพื่อกลับ</div>}
      <div className={`deck-help ${help ? 'is-visible' : ''}`}>
        <b>→</b> / คลิก ถัดไป · <b>←</b> / คลิกขวา ย้อน · <b>o</b> ภาพรวม · <b>เลข + ↵</b> ไปหน้านั้น {LIST_P_IN_HELP && <>· <b>p</b> หน้าต่างผู้พูด </>}· <b>f</b> เต็มจอ · <b>?</b> ปุ่มลัด
      </div>
    </div>
  )
}
