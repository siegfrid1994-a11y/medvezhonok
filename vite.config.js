import { defineConfig } from 'vite';

export default defineConfig({
  base: '/medvezhonok/',
  build: {
    assetsDir: 'assets',
    sourcemap: true,
  },
});
