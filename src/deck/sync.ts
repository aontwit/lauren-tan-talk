/**
 * Keeps the audience window and the presenter window on the same slide.
 * The deck window owns the state; the presenter window sends commands.
 * Every deck window has an id, and a presenter talks to one deck only, so a
 * second deck left open in another tab cannot move or confuse the talk.
 */
export type DeckState = { slide: number; step: number }
export type DeckMessage =
  | { kind: 'state'; from: string; state: DeckState }
  | { kind: 'cmd'; to: string; cmd: 'next' | 'prev' | 'first' | 'last' | 'overview' }
  | { kind: 'goto'; to: string; slide: number }
  | { kind: 'hello'; to?: string }

/** One id per browser tab, kept across reloads so a presenter stays linked. */
export function newDeckId() {
  const key = 'lauren-tan-talk:deck-id'
  try {
    const saved = sessionStorage.getItem(key)
    if (saved) return saved
    const id = Math.random().toString(36).slice(2, 8)
    sessionStorage.setItem(key, id)
    return id
  } catch {
    return Math.random().toString(36).slice(2, 8)
  }
}

const CHANNEL = 'lauren-tan-talk'

export function openChannel(onMessage: (m: DeckMessage) => void) {
  const bc = new BroadcastChannel(CHANNEL)
  bc.onmessage = (e) => onMessage(e.data as DeckMessage)
  return {
    send: (m: DeckMessage) => bc.postMessage(m),
    close: () => bc.close(),
  }
}

export function readHash(): DeckState {
  const m = location.hash.match(/^#(\d+)(?:\.(\d+))?$/)
  if (!m) return { slide: 0, step: 0 }
  return { slide: Math.max(0, Number(m[1]) - 1), step: Number(m[2] ?? 0) }
}

export function writeHash(s: DeckState) {
  history.replaceState(null, '', `#${s.slide + 1}.${s.step}`)
}
