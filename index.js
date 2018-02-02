/*
 * Copyright (C) 2017, Skyler.
 * Use of this source code is governed by the MIT license that can be
 * found in the LICENSE file.
 */

import _ from 'lodash'
import ts from 'typescript'
import utils from 'rollup-pluginutils'
import { loadTsConfig, getCompilerOptions } from './options'
import { resolveHost } from './hosts'

const defaultOptions = {
  include: '*.ts+(|x)',
  exclude: '*.d.ts'
}

export default function typescript (options) {
  options = _.assign({}, defaultOptions, options)
  let tsConfig = loadTsConfig(process.cwd())
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
