import '@fontsource/shantell-sans/400.css'
import '@fontsource/shantell-sans/700.css'
import itimThai from '@fontsource/itim/files/itim-thai-400-normal.woff2?url'
import 'tldraw/tldraw.css'
import './styles.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Deck } from './deck/Deck'
import { Presenter } from './deck/Presenter'

/**
 * Thai uses Itim, registered under its own family name so it can be scaled to
 * sit level with Shantell Sans: at the same font-size Itim's Thai glyphs read
 * about 15% smaller. Only the Thai range is mapped, so Latin always stays
 * Shantell Sans.
 */
const THAI = new FontFace('Deck Thai', `url(${itimThai}) format('woff2')`, {
  unicodeRange: 'U+0E01-0E5B, U+200C-200D, U+25CC',
  display: 'block',
  // sizeAdjust is supported by Chrome, Edge, Firefox and Safari 17+.
  ...({ sizeAdjust: '116%' } as FontFaceDescriptors),
})
document.fonts.add(THAI)

const FONT_PROBES = [
  { css: "400 32px 'Shantell Sans'", sample: 'Agent' },
  { css: "700 32px 'Shantell Sans'", sample: 'Agent' },
  { css: "400 32px 'Deck Thai'", sample: 'กองทัพ' },
]

/**
 * tldraw measures text when shapes are created. If the fonts are not loaded
 * yet, the measured widths come from a fallback font and the layout breaks,
 * so the deck only mounts after both fonts are ready.
 */
async function waitForFonts(): Promise<string[]> {
  await THAI.load()
  await Promise.all(FONT_PROBES.map((p) => document.fonts.load(p.css, p.sample)))
  await document.fonts.ready
  return FONT_PROBES.filter((p) => !document.fonts.check(p.css, p.sample)).map((p) => p.css)
}

async function boot() {
  const root = createRoot(document.getElementById('root')!)
  const missing = await waitForFonts().catch((e) => [String(e)])
  if (missing.length) {
    root.render(
      <div className="deck-fontcheck">
        Fonts did not load: {missing.join(', ')}. Run npm install, then reload.
      </div>,
    )
    return
  }
  const isPresenter = new URLSearchParams(location.search).has('presenter')
  root.render(<StrictMode>{isPresenter ? <Presenter /> : <Deck />}</StrictMode>)
}

boot()
