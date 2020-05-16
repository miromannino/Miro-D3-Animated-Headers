const path = require('path');

module.exports = {
  entry: './index.js',
  devtool: 'source-map',
  output: {
    filename: 'index.bundle.js',
    path: path.resolve(__dirname),
    umdNamedDefine: true
  }
};