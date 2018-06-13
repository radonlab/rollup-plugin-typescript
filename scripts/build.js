'use strict'
const rollup = require('rollup')
const builtins = require('builtins')
const config = require('../rollup.config')
const pkginfo = require('../package')

function keys (obj) {
  if (!obj) {
    return []
  }
  return Object.keys(obj)
}

function getDependencies (pkg) {
  let deps = keys(pkg.dependencies)
  let peerDeps = keys(pkg.peerDependencies)
  return deps.concat(peerDeps)
}

function concatExternals (cfg, deps) {
  let external = cfg.external || []
  return external.concat(deps, builtins())
}

function build () {
  // process config
  let pkgDeps = getDependencies(pkginfo)
  config.external = concatExternals(config, pkgDeps)
  // bundle modules
  rollup.rollup(config).then(bundle => {
    bundle.write(config.output)
  })
}

module.exports = build

if (require.main === module) {
  build()
}
