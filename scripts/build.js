'use strict'
const rollup = require('rollup')
const config = require('../rollup.config')

function build () {
  rollup.rollup(config).then(bundle => {
    bundle.write(config.output)
  })
}

module.exports = build

if (require.main === module) {
  build()
}
