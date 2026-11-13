import { webcrypto } from 'node:crypto'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * The public build must not carry readable speaker notes. They are string
 * literals on `notes:` in src/slides. In a build:
 * - with NOTES_PASSPHRASE set, each note is encrypted (PBKDF2 → AES-GCM) and
 *   the speaker window decrypts it after the speaker types the passphrase
 *   (src/deck/notes.ts);
 * - without it, every note is replaced by ''.
 * `npm run dev` keeps the notes as they are.
 */
function protectSpeakerNotes(): Plugin {
  const pass = process.env.NOTES_PASSPHRASE ?? ''
  const b64 = (u: Uint8Array) => Buffer.from(u).toString('base64')
  let keyP: Promise<{ key: CryptoKey; salt: string }> | null = null
  const getKey = () =>
    (keyP ??= (async () => {
      const salt = webcrypto.getRandomValues(new Uint8Array(16))
      const base = await webcrypto.subtle.importKey('raw', new TextEncoder().encode(pass), 'PBKDF2', false, ['deriveKey'])
      const key = await webcrypto.subtle.deriveKey(
        { name: 'PBKDF2', salt, iterations: 250_000, hash: 'SHA-256' },
        base,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt'],
      )
      return { key: key as CryptoKey, salt: b64(salt) }
    })())

  return {
    name: 'protect-speaker-notes',
    apply: 'build',
    enforce: 'pre',
    async transform(code, id) {
      if (!/[\\/]src[\\/]slides[\\/][^\\/]+\.ts$/.test(id)) return
      const re = /notes:\s*'((?:[^'\\]|\\.)*)'/g
      const found = [...code.matchAll(re)]
      if (!found.length) return
      let out = code
      for (const m of found) {
        let replacement = "notes: ''"
        if (pass) {
          // The literal is our own source, single-quoted JS; evaluate it to get the exact text.
          const text = new Function(`return '${m[1]}'`)() as string
          const { key, salt } = await getKey()
          const iv = webcrypto.getRandomValues(new Uint8Array(12))
          const ct = new Uint8Array(await webcrypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(text)))
          replacement = `notes: 'enc1:${salt}:${b64(iv)}:${b64(ct)}'`
        }
        out = out.replace(m[0], replacement)
      }
      return { code: out, map: null }
    },
  }
}

export default defineConfig({
  plugins: [protectSpeakerNotes(), react()],
  // relative asset paths, so the built deck works from any folder or host path
  base: './',
  server: { port: 5173, strictPort: true },
})
