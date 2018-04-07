/*
 * Copyright (C) 2017, Skyler.
 * Use of this source code is governed by the MIT license that can be
 * found in the LICENSE file.
 */

import ts from 'typescript'
import utils from 'rollup-pluginutils'
import resolveHost from './resolveHost'
import {
  findTsConfig,
  loadTsConfig,
  mergeOptions,
  validateOptions,
  parseTsConfig
} from './options'
import { createCompiler } from './compiler'

const config = {
  include: ['*.ts+(|x)', '**/*.ts+(|x)'],
  exclude: ['*.d.ts', '**/*.d.ts']
}

const defaultOptions = {
  compilerOptions: {
    module: 'es2015'
  }
}

export default function typescript (pluginOptions) {
  let confFile = findTsConfig()
  let fileOptions = loadTsConfig(confFile)
  let options = mergeOptions(defaultOptions, fileOptions, pluginOptions)
  validateOptions(options)
  let parsedOptions = parseTsConfig(confFile, options)
  let compiler = createCompiler(parsedOptions)
  let filter = utils.createFilter(config.include, config.exclude)

  return {
    name: 'typescript',
    // Current options
    __options: options,
    // Resolve module by Id
    resolveId (importee, importer) {
      if (!importer) { return null }
      let result = ts.nodeModuleNameResolver(
        importee,
        importer,
        parsedOptions.options,
        resolveHost
      )
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
      let compiled = compiler.transpile(id, code)
      let sourceMap = compiled.sourceMapText
      if (typeof sourceMap === 'string') {
        sourceMap = JSON.parse(sourceMap)
      }

      return {
        code: compiled.outputText,
        map: sourceMap
      }
    }
  }
}
