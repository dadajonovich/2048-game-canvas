// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: './',
  build: {
    outDir: path.join(__dirname, 'docs'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // src: '/src',
    },
  },
});
