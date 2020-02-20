const path = require('path');

module.exports = {
  resolve: {
    modules: [path.resolve(__dirname, '..'), 'node_modules'],
    extensions: ['*', '.js', '.jsx'],
    alias: {
      grommet: path.resolve(__dirname, '../src/js'),
    },
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
};
