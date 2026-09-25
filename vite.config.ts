import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Root base: correct for heyhadi.github.io user site.
  // If you ever move this to a project site (e.g. heyhadi.github.io/portfolio),
  // change to base: '/portfolio/'.
  base: '/',
  server: { port: 5173 },
})

