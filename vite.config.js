import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// SUA OBRA 3D — hero da obra guiada pelo scroll (ref. @webforge6)
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
