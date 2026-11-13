# กองทัพ Agent แบบ Lauren Tan

Slides for the knowledge-sharing talk, drawn on a [tldraw](https://tldraw.dev) canvas the way Lauren presents her workshop: one big board, and the camera flies from slide to slide.

## Run

```sh
npm install
npm run dev        # http://localhost:5173
```

## Present

| Key | Does |
| --- | --- |
| `→` `Space` `PageDown`, or click | next click, then next slide |
| `←` `PageUp`, or right-click | back |
| `o` | overview of the whole board, one row per part of the talk; click a slide to jump there |
| number then `Enter` | jump to that slide (e.g. `15` `Enter`) |
| `Esc` | back to the current slide |
| `p` | open the speaker window: the slide the audience sees, your notes under it, the next slide, clicks left. Not listed in the on-screen help of the public site. |
| `f` | fullscreen |
| `?` | show or hide the key help |

The orange line along the bottom shows how far through the talk you are, and the dots in the bottom right show the clicks left on the current slide.

The URL keeps your place (`#5.1` = slide 5, click 1). The presenter window and the audience window stay in sync through `BroadcastChannel`, so open both on the same machine.

## Rules this repo enforces

- **Fonts never fall back.** English is Shantell Sans (tldraw's handwriting font, the one Lauren's slides use). Shantell Sans has no Thai, so Thai is Itim, a marker-style hand. Both are bundled from `@fontsource`, `src/styles.css` locks every tldraw font slot to them, and `src/main.tsx` refuses to mount until both are loaded.
- **One theme.** Slides choose a tone (`ink`, `accent`, `muted`, `alert`, `ok`, `note`) from `src/deck/theme.ts`, never a color. Boxes and arrows share one stroke weight and boxes share one label size. `npm run check:theme` fails on raw colors, tldraw color names, inline styles, font-family or emoji in `src/slides`, and `npm run build` runs it first.
- **Text in charts is English;** slide text is Thai.

## Where things are

```
src/deck/theme.ts        tones, type scale, slide grid
src/deck/draw.ts         text, box, arrow, card, badge, at(step)
src/deck/Deck.tsx        tldraw canvas, camera, clicks, keys
src/deck/Presenter.tsx   speaker notes window
src/deck/shapes/PitScene.tsx   animated F1 pit wall scene
src/slides/*.ts          the talk, in order in src/slides/index.ts
```

To add a click-by-click reveal, wrap shapes in `at(c, n, () => …)`.

## Note on tldraw licensing

tldraw is free to use in development, but it shows a small "made with tldraw" mark. To remove it, get a license key from tldraw.dev, copy `.env.example` to `.env.local`, put the key in `VITE_TLDRAW_LICENSE_KEY`, and restart `npm run dev`. Hosting the deck publicly also needs a key.

## Speaker notes on the public site

The notes never ship as readable text. The GitHub Pages build encrypts them with the `NOTES_PASSPHRASE` repo secret (Settings → Secrets and variables → Actions). In the speaker window, type that passphrase once; it is kept for that browser tab only. Without the secret, the build leaves the notes out. `npm run dev` shows them as they are.
