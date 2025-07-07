// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/hourly-profit-app/', // ✅ 새 이름으로 바꾸기
  plugins: [react()],
})