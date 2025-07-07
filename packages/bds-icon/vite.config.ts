import svgSpritePlugin from '@pivanov/vite-plugin-svg-sprite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    svgSpritePlugin({
      iconDirs: ['../bds-icon/src/icon'],
      symbolId: 'icon-[name]',
      inject: 'body-last',
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'BdsIcon',
      fileName: () => `index.js`,
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
});
