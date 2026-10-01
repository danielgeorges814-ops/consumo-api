import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base relativa: funciona no GitHub Pages e na Vercel sem ajuste
export default defineConfig({
  plugins: [react()],
  base: './',
})
