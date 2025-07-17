import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // ✅ 这个非常重要！必须是相对路径
  plugins: [react()],
})
