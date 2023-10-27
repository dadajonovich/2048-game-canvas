/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import path from 'path';
import { ViteMinifyPlugin } from 'vite-plugin-minify';

export default defineConfig({
  base: './',
  build: {
    outDir: path.join(__dirname, 'docs'),
    rollupOptions: {
      input: {
        file1: path.resolve(__dirname, 'index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // src: '/src',
    },
  },
  plugins: [ViteMinifyPlugin({})],
});
