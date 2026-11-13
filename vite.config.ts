import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // relative asset paths, so the built deck works from any folder or host path
  base: './',
  server: { port: 5173, strictPort: true },
})
