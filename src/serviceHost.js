/*
 * Copyright (C) 2017, Skyler.
 * Use of this source code is governed by the MIT license that can be
 * found in the LICENSE file.
 */

import fs from 'fs'
import ts from 'typescript'

export default function (servOptions) {
  const cache = new Map()

  function getEntity (filename) {
    let entity = cache.get(filename)
    if (entity === undefined) {
      let version = '' + Date.now()
      let content = fs.readFileSync(filename, 'utf-8')
      let snapshot = ts.ScriptSnapshot.fromString(content)
      entity = {
        version,
        snapshot
      }
      cache.set(filename, entity)
    }
    return entity
  }

  return {
    getScriptFileNames () {
      return servOptions.entities
    },
    getScriptVersion (filename) {
      return getEntity(filename).version
    },
    getScriptSnapshot (filename) {
      return getEntity(filename).snapshot
    },
    getCurrentDirectory () {
      return process.cwd()
    },
    getCompilationSettings () {
      return servOptions.compilerOptions
    },
    getDefaultLibFileName (options) {
      return ts.getDefaultLibFilePath(options)
    }
  }
}
