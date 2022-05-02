const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  pluginOptions: {
    svgSpriteLoader: {
      // directory
      dir: resolve('src/assets/images/svg'),
      // test rule
      test: /\.svg$/,
      // https://github.com/JetBrains/svg-sprite-loader#configuration
      options: {
        symbolId: '[name]',
      },
    },
  },
};
