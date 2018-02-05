'use strict'

const { expect } = require('chai')
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
  return rollup.rollup(options).then(chunk => {
    return chunk.generate({ format: 'es' })
  })
}

describe('rollup-plugin-typescript', function () {
  it('should compile typescript correctly', function () {
    return bundle('sample/simple.ts').then(result => {
      expect(result.code).to.have.string('var a = 10')
    })
  })

})
