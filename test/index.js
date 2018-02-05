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

  it('should respect plugin options', function () {
    let options = {}
    bundle('sample/simple.ts', options)
    expect(options).to.have.property('include')
    expect(options).to.have.property('exclude')
  })

  it('should load tsconfig correctly', function () {
    let options = {}
    bundle('sample/simple.ts', options)
    expect(options).to.have.property('compilerOptions')
  })

  it('should transpile classes correctly', function () {
    return bundle('sample/classes.ts').then(result => {
      expect(result.code).to.have.string('function Test')
    })
  })

  it('should bundle imported module correctly', function () {
    return bundle('sample/imports.ts').then(result => {
      expect(result.code).to.have.string('FooBar')
    })
  })

})
