import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,               // use global expect, describe, it etc.
    environment: 'jsdom',        // browser-like environment for React tests
    setupFiles: './src/setupTests.ts',  // path to your jest-dom setup file
  },
})
