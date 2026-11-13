/**
 * Speaker notes on the public site are encrypted at build time (vite.config.ts)
 * with a passphrase only the speaker knows. A locked note looks like
 * "enc1:<salt>:<iv>:<ciphertext>", all base64. The speaker window asks for the
 * passphrase once and decrypts here; nothing readable ships to the audience.
 */
const PREFIX = 'enc1:'
const ITERATIONS = 250_000
const STORE = 'lauren-tan-talk:notes-pass'

export const isLocked = (note: string) => note.startsWith(PREFIX)

const fromB64 = (s: string): Uint8Array<ArrayBuffer> => Uint8Array.from(atob(s), (c) => c.charCodeAt(0))

async function deriveKey(pass: string, salt: Uint8Array<ArrayBuffer>) {
  const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(pass), 'PBKDF2', false, ['deriveKey'])
  return crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['decrypt'])
}

/** Decrypts every locked note. Throws if the passphrase is wrong. */
export async function unlockNotes(notes: string[], pass: string): Promise<string[]> {
  const first = notes.find(isLocked)
  if (!first) return notes
  const key = await deriveKey(pass, fromB64(first.split(':')[1]))
  return Promise.all(
    notes.map(async (note) => {
      if (!isLocked(note)) return note
      const [, , iv, data] = note.split(':')
      const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: fromB64(iv) }, key, fromB64(data))
      return new TextDecoder().decode(plain)
    }),
  )
}

/** The passphrase is kept for this browser tab only, never written anywhere else. */
export function savedPass() {
  try {
    return sessionStorage.getItem(STORE) ?? ''
  } catch {
    return ''
  }
}

export function savePass(pass: string) {
  try {
    sessionStorage.setItem(STORE, pass)
  } catch {
    /* private mode: the speaker types it again next time */
  }
}
