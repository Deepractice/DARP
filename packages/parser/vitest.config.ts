import path from 'node:path'
import { defineConfig } from 'vitest/config'
import { vitestCucumber } from '@deepracticex/vitest-cucumber/plugin'

export default defineConfig({
  plugins: [
    vitestCucumber({
      features: ['features/**/*.feature'],
      steps: 'tests/e2e/steps',
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '@': path.resolve(__dirname, '.'),
    },
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.feature'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['tests/**', 'dist/**', 'node_modules/**'],
    },
  },
})
