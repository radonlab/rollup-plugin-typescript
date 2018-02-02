/*
 * Copyright (C) 2017, Skyler.
 * Use of this source code is governed by the MIT license that can be
 * found in the LICENSE file.
 */

import fs from 'fs-extra'
import ts from 'typescript'

export function loadTsConfig () {
  let confFile = findup('tsconfig.json')
  return fs.readJSONSync(confFile)
}

export function getCompilerOptions (config) {
  let options = config.compilerOptions || {}
  // noEmitHelpers: true
  let r = ts.convertCompilerOptionsFromJson(options, process.cwd())
  return r.options
}
