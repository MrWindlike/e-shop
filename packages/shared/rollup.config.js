import typescript from '@rollup/plugin-typescript';
import vue from 'rollup-plugin-vue';
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import clear from 'rollup-plugin-clear';
import path from 'path';

export default {
  input: {
    components: 'src/components/index.ts',
    pages: 'src/pages/index.ts',
    const: 'src/const/index.ts',
    schemas: 'src/schemas/index.ts',
    utils: 'src/utils/index.ts',
  },
  output: {
    dir: 'lib',
    format: 'es',
    name: 'shared'
  },
  external: [
    'vue',
    'element-ui',
    /@babel\/runtime/
  ],
  plugins: [
    clear({
      targets: [
        path.resolve(__dirname, 'lib')
      ],
      watch: true
    }),
    resolve({
      main: true,
      browser: true,
      extensions: ['.js', '.css', '.scss', '.vue', '.ts'],
    }),
    postcss({
      extract: false,
    }),
    vue({
      target: 'browser',
    }),
    commonjs({
      exclude: [
        path.resolve(__dirname, 'src/**'),
      ]
    }),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.ts', 'jsx'],
    }),
    typescript(),
  ]
};
