
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: '/',
  }

  if (command !== 'serve') {
    // 저장소 이름으로 base 경로를 설정합니다.
    // 예: 저장소 이름이 'auto-mover' 라면 '/auto-mover/'
    config.base = '/{여러분의-저장소이름}/'
  }

  return config
})
