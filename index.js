/*
 * Copyright (C) 2017, Skyler.
 * Use of this source code is governed by the MIT license that can be
 * found in the LICENSE file.
 */

import ts from 'typescript'
import utils from 'rollup-pluginutils'

export default function typescript (options) {
  options = assign({}, default, options)
  let confFile = findup('tsconfig.json')
  let tsConfig = fs.readJSONSync(confFile)
  let compilerOptions = getCompilerOptions(tsConfig)

  return {
    resolveId (importee, importer) {
      if (!importer) { return null }
      let result = ts.nodeModuleNameResolver(
        importee,
        importer,
        compilerOptions,
        resolveHost)
      return _.get(result, 'resolvedModule.resolvedFileName', null)
    },
    transform (code, id) {
      let compiled = ts.transpileModule(code, {
        fileName: id,
        reportDiagnostics: true,
        compilerOptions
      })
      return {
        code: compiled.outputText,
        map: JSON.parse(compiled.sourceMapText)
      }
    }
  }
}
