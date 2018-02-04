/*
 * Copyright (C) 2017, Skyler.
 * Use of this source code is governed by the MIT license that can be
 * found in the LICENSE file.
 */

import fs from 'fs-extra'
import ts from 'typescript'
import path from 'path'

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

export function getCompilerOptions (config) {
  let options = config.compilerOptions || {}
  // noEmitHelpers: true
  let r = ts.convertCompilerOptionsFromJson(options, process.cwd())
  return r.options
}
