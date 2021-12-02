import typescript from '@rollup/plugin-typescript';
import vue from 'rollup-plugin-vue';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

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
    format: 'esm',
    name: 'shared'
  },
  external: [
    'vue',
    /element-ui/,
    /@babel\/runtime/
  ],
  plugins: [
    resolve({
      browser: true,
      extensions: ['.js', '.css', '.scss', '.vue', '.ts'],
    }),
    commonjs(),
    vue({
      target: 'browser',
    }),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.ts', '.jsx', '.vue'],
      babelrc: true,
    }),
    typescript(),
  ],
};
