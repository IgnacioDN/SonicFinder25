import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Permite el acceso desde cualquier IP en la red
    port: 5182, // O cualquier puerto que estés utilizando
  },
})
