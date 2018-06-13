'use strict'
const rollup = require('rollup')
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

function build () {
  // process config
  let external = config.external || []
  let pkgDeps = getDependencies(pkginfo)
  config.external = external.concat(pkgDeps)
  // bundle modules
  rollup.rollup(config).then(bundle => {
    bundle.write(config.output)
  })
}

module.exports = build

if (require.main === module) {
  build()
}
