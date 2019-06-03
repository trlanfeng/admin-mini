/* eslint-disable import/no-extraneous-dependencies */
// const webpack = require('webpack');

module.exports = {
  // lintOnSave: false,
  // configureWebpack: {
  //   plugins: [
  //     new webpack.ProvidePlugin({
  //       _: 'lodash',
  //     }),
  //   ],
  // },

  devServer: {
    proxy: 'http://localhost:3060',
  },
};
