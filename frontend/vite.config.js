import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // ضروري جداً لكي يراه Docker و Gateway
    port: 3000,      // البورت الموحد للـ Frontend
    strictPort: true,
    allowedHosts: ['frontend', 'localhost'], // السماح لمضيف Docker بالوصول
    watch: {
      usePolling: true, // لضمان عمل الـ Hot Reload في Windows/Docker
    }
  }
})