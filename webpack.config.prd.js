const config = require('./webpack.config.js');

module.exports = Object.assign(config, {
  mode: 'production',
  output:  Object.assign(config.output, {
    filename: 'xpath2.min.js'
  })
});