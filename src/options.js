/*
 * Copyright (C) 2017, Skyler.
 * Use of this source code is governed by the MIT license that can be
 * found in the LICENSE file.
 */

import path from 'path'
import fs from 'fs-extra'
import ts from 'typescript'
import { lowerCase, mergeObject } from './utils'

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

export function loadFileOptions (cwd=process.cwd()) {
  let confFile = findup('tsconfig.json', cwd)
  return confFile && fs.readJSONSync(confFile)
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

export const mergeOptions = mergeObject
