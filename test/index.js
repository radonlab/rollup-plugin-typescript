'use strict'

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const rollup = require('rollup')
const tsPlugin = require('..')

const expect = chai.expect
chai.use(chaiAsPromised)
// to find tsconfig
process.chdir(__dirname)

function bundle (entry, options={}) {
  return rollup.rollup({
    input: entry,
    plugins: [
      tsPlugin(options)
    ]
  }).then(chunk => {
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
    let options = tsPlugin({ compileOnSave: false }).__options
    expect(options).to.have.property('compileOnSave')
    expect(options.compileOnSave).to.be.false
  })

  it('should respect tsconfig.json file', function () {
    let options = tsPlugin().__options
    expect(options).to.have.property('compilerOptions')
    expect(options.compilerOptions.alwaysStrict).to.be.true
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

  it('should bundle javascript module correctly', function () {
    return bundle('sample/imports2.ts').then(result => {
      expect(result.code).to.have.string('BazQux')
    })
  })

  it('should bundle node module correctly', function () {
    return bundle('sample/imports3.ts').then(result => {
      expect(result.code).to.have.string('console.log(version)')
    })
  })

  it('should get failed when type declaration omitted', function () {
    return expect(bundle('sample/omitted.ts')).to.be.rejected
  })
})
