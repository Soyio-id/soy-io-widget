import { resolve } from 'path';

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'soyio-widget',
      fileName: 'index',
      formats: ['es', 'umd'],
    },
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
    cssCodeSplit: false,
    target: 'es2015',
  },
  plugins: [dts({ rollupTypes: true })],
});
