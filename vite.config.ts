import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

import packageJson from './package.json'

export default defineConfig({
  define: {
    'import.meta.env.APP_VERSION': JSON.stringify(packageJson.version),
  },
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: ['chrome109', 'edge109', 'firefox115', 'safari15.6'],
  },
  server: {
    allowedHosts: ['app.manajerku.com'],
  },

  preview: {
    allowedHosts: ['app.manajerku.com'],
    port: 4173,
    host: '0.0.0.0',
  },
})
