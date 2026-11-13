/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** tldraw license key; removes the "made with tldraw" mark. Put it in .env.local. */
  readonly VITE_TLDRAW_LICENSE_KEY?: string
}
