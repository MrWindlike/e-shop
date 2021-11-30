import typescript from '@rollup/plugin-typescript';
import vue from 'rollup-plugin-vue';
import commonjs from '@rollup/plugin-commonjs';
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
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
    vue({
      target: 'browser',
    }),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.ts', 'jsx'],
    }),
    getBabelOutputPlugin({
      configFile: path.resolve(__dirname, '.babelrc'),
    }),
    typescript(),
  ]
};
