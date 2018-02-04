'use strict'

const rollup = require('rollup')
const tsPlugin = require('..')

process.chdir(__dirname)

function bundle (entry, config={}) {
  let options = {
    input: entry,
    plugins: [
      tsPlugin(config)
    ]
  }
  return rollup.rollup(options)
}

describe('rollup-plugin-typescript', function () {
})
