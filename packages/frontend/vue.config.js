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
        'element-ui': path.resolve(__dirname, 'node_modules/element-ui'),
      },
    },
  },
};
