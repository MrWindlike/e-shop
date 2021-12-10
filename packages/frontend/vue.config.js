const path = require('path');

module.exports = {
  devServer: {
    overlay: {
      warnings: false,
      errors: false,
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        // make element-ui resolve to 'node_modules/element-ui' instead of 'shared/node_modules/element-ui'
        'element-ui': path.resolve(__dirname, 'node_modules/element-ui'),
        // refer: https://github.com/vuejs/vue-apollo/issues/1036#issuecomment-671214881
        '@vue/composition-api/dist/vue-composition-api.mjs': path.resolve(__dirname, 'node_modules/@vue/composition-api/dist/vue-composition-api.mjs'),
        '@vue/composition-api': path.resolve(__dirname, 'src/composition'),
        'vue-demi': path.resolve(__dirname, 'src/composition'),
        'composition-api': path.resolve(__dirname, 'node_modules/@vue/composition-api/dist/vue-composition-api.esm.js'),
      },
      extensions: ['.js', '.vue', '.json', '.ts', '.d.ts'],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          'element-ui': {
            test: /[\\/]node_modules[\\/]element-ui[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          'vue': {
            test: /[\\/]node_modules[\\/]vue.*[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            priority: 0,
            reuseExistingChunk: true,
          }
        }
      }
    }
  },
};
