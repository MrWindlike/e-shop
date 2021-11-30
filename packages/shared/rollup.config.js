import typescript from '@rollup/plugin-typescript';
import vue from 'rollup-plugin-vue';
import babel from '@rollup/plugin-babel';
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
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
      runtimeHelpers: true,
      configFile: path.resolve(__dirname, '.babelrc'),
    }),
    typescript(),
    vue({
      target: 'browser',
    }),
  ]
};
