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
