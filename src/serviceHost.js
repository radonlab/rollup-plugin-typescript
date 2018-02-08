/*
 * Copyright (C) 2017, Skyler.
 * Use of this source code is governed by the MIT license that can be
 * found in the LICENSE file.
 */

import fs from 'fs'
import ts from 'typescript'

export default function (entities, compilerOptions) {
  return {
    getScriptFileNames () {
      return Array.from(entities)
    },
    getScriptVersion (file) {
    },
    getScriptSnapshot (filename) {
      let text = fs.readFileSync(filename, 'utf-8')
      return ts.ScriptSnapshot.fromString(text)
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
