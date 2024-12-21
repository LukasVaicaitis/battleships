import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/start': 'http://localhost:8080',
      '/move': 'http://localhost:8080',
    },
  },
})