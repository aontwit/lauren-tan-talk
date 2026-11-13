import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * The public build must not carry the speaker notes. They are long string
 * literals on `notes:` in src/slides, so the build swaps each one for ''.
 * `npm run dev` keeps them for the presenter window.
 */
function stripSpeakerNotes(): Plugin {
  return {
    name: 'strip-speaker-notes',
    apply: 'build',
    enforce: 'pre',
    transform(code, id) {
      if (!/[\\/]src[\\/]slides[\\/][^\\/]+\.ts$/.test(id)) return
      const out = code.replace(/notes:\s*'(?:[^'\\]|\\.)*'/g, "notes: ''")
      return out === code ? undefined : { code: out, map: null }
    },
  }
}

export default defineConfig({
  plugins: [stripSpeakerNotes(), react()],
  // relative asset paths, so the built deck works from any folder or host path
  base: './',
  server: { port: 5173, strictPort: true },
})
