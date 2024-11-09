import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('./example.com+5-key.pem'),
      cert: fs.readFileSync('./example.com+5.pem'),
    },
    host: 'localhost',
    port: 3000,
  },
})
