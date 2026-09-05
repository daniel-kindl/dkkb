import { defineConfig } from 'vitest/config';

// Zero-config unit-test setup against the existing Vite toolchain. The tested
// modules import `astro:content` only for types (erased at runtime), so no Astro
// virtual-module resolution is needed here.
export default defineConfig({
  test: {
    include: ['src/**/*.test.ts', 'scripts/**/*.test.mjs'],
  },
});
