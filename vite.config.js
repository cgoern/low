import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    open: true,
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'main.js'),
      name: 'Low',
      fileName: 'low',
      formats: ['es'],
    },
  },
})
