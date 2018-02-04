'use strict'

const rollup = require('rollup')
const tsPlugin = require('..')

function bundle (input) {
  let options = {
    input,
    plugins: [
      tsPlugin()
    ]
  }
  return new Promise((resolve, reject) => {
    rollup.rollup(options).then(resolve, reject)
  })
}

describe('rollup-plugin-typescript', function () {
})
