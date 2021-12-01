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
    },
  },
};
