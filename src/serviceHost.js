/*
 * Copyright (C) 2017, Skyler.
 * Use of this source code is governed by the MIT license that can be
 * found in the LICENSE file.
 */

import ts from 'typescript'

export default function (compilerOptions) {
  return {
    getScriptFileNames () {
    },
    getScriptVersion (file) {
    },
    getScriptSnapshot (file) {
    },
    getCurrentDirectory () {
      return process.cwd()
    },
    getCompilationSettings () {
      return compilerOptions
    },
    getDefaultLibFileName (options) {
      return ts.getDefaultLibFilePath(options)
    }
  }
}
