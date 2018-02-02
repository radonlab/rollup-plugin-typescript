/*
 * Copyright (C) 2017, Skyler.
 * Use of this source code is governed by the MIT license that can be
 * found in the LICENSE file.
 */

export function getCompilerOptions (config) {
  let options = config.compilerOptions || {}
  // noEmitHelpers: true
  let r = ts.convertCompilerOptionsFromJson(options, process.cwd())
  return r.options
}
