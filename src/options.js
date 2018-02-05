/*
 * Copyright (C) 2017, Skyler.
 * Use of this source code is governed by the MIT license that can be
 * found in the LICENSE file.
 */

import fs from 'fs-extra'
import ts from 'typescript'
import path from 'path'

const _toLowerCase = String.prototype.toLowerCase

function lowerCase (str) {
  return str == null ? '' : _toLowerCase.call(str)
}

function findup (name, cwd) {
  let dir = path.resolve(cwd)
  let target = ''
  while (dir !== '') {
    target = path.join(dir, name)
    if (fs.existsSync(target)) {
      return target
    }
    dir = dir.substring(0, dir.lastIndexOf(path.sep))
  }
  return null
}

export function loadTsConfig (cwd) {
  let confFile = findup('tsconfig.json', cwd)
  if (!confFile) { return {} }
  return fs.readJSONSync(confFile)
}

export function validateOptions (options) {
  let opts = options.compilerOptions || {}
  let mod = lowerCase(opts.module)
  if (mod !== 'es2015' && mod !== 'es6') {
    throw new Error(`Invalid module format: ${mod}
    consider using es2015/es6 for typescript`)
  }
}

export function getCompilerOptions (options) {
  let opts = options.compilerOptions || {}
  let r = ts.convertCompilerOptionsFromJson(opts, process.cwd())
  return r.options
}
