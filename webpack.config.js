const webpack = require('webpack');
const fs = require('fs');

const date = new Date();
const package = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

module.exports = {
  mode: 'development',
  entry: './lib/index.js',
  output: {
    path: __dirname,
    filename: 'xpath2.js',
    libraryTarget: 'umd',
    globalObject: 'this',
    // libraryExport: 'default',
    library: 'xpath2'
  },
  plugins: [
    new webpack.BannerPlugin(
        package.name + ' - ' + package.description + '\n' +
        '(Version: ' + package.version + ' Built on: ' + date.toISOString() + ')\n' +
        'Copyright (c) ' + date.getFullYear() + ' ' + package.author + '\n' +
        'This work is licensed under the MIT License.')
  ]
};