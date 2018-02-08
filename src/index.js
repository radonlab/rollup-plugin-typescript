/*
 * Copyright (C) 2017, Skyler.
 * Use of this source code is governed by the MIT license that can be
 * found in the LICENSE file.
 */

import ts from 'typescript'
import utils from 'rollup-pluginutils'
import { resolveHost } from './hosts'
import {
  mergeOptions,
  loadFileOptions,
  validateOptions,
  getCompilerOptions
} from './options'

const defaultOptions = {
  include: ['*.ts+(|x)', '**/*.ts+(|x)'],
  exclude: ['*.d.ts', '**/*.d.ts'],
  compilerOptions: {
    module: 'es2015'
  }
}

export default function typescript (options) {
  let fileOptions = loadFileOptions()
  options = mergeOptions({}, defaultOptions, fileOptions, options)
  validateOptions(options)
  let compilerOptions = getCompilerOptions(options)
  let filter = utils.createFilter(options.include, options.exclude)

  return {
    name: 'typescript',
    // Plugin options
    __options: options,
    // Resolve module by Id
    resolveId (importee, importer) {
      if (!importer) { return null }
      let result = ts.nodeModuleNameResolver(
        importee,
        importer,
        compilerOptions,
        resolveHost)
      let fileName = null
      if (result.resolvedModule && result.resolvedModule.resolvedFileName) {
        fileName = result.resolvedModule.resolvedFileName
      }
      if (fileName != null && !fileName.endsWith('.d.ts')) {
        return fileName
      }
      return null
    },
    // Transpile typescript code
    transform (code, id) {
      if (!filter(id)) { return null }
      let compiled = ts.transpileModule(code, {
        fileName: id,
        reportDiagnostics: true,
        compilerOptions
      })
      let sourceMap = compiled.sourceMapText
      sourceMap = sourceMap && JSON.parse(sourceMap)
      return {
        code: compiled.outputText,
        map: sourceMap
      }
    }
  }
}
