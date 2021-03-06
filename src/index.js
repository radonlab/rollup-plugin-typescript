/*
 * Copyright (C) 2017, Skyler.
 * Use of this source code is governed by the MIT license that can be
 * found in the LICENSE file.
 */

import ts from 'typescript'
import utils from 'rollup-pluginutils'
import resolveHost from './resolveHost'
import {
  initContext,
  getOptions,
  parseOptions
} from './options'
import { createCompiler } from './compiler'
import { formatDiagnostic, formatError } from './formatter'
import { isEmpty } from './utils'

const included = ['*.ts+(|x)', '**/*.ts+(|x)']
const excluded = ['*.d.ts', '**/*.d.ts']

export default function typescript (pluginOptions) {
  let context = initContext()
  let options = getOptions(context, pluginOptions)
  let parsedOptions = parseOptions(context, options)

  if (!isEmpty(parsedOptions.errors)) {
    parsedOptions.errors.forEach((err) => {
      console.log(formatError(err))
    })
    process.exit(1)
  }

  let compiler = createCompiler(parsedOptions)
  let filter = utils.createFilter(included, excluded)

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
        resolveHost()
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
      if (!isEmpty(compiled.diagnostics)) {
        compiled.diagnostics.forEach((d) => {
          console.log(formatDiagnostic(d))
        })
        this.error('Failed to compile')
      }

      return {
        code: compiled.outputText,
        map: sourceMap
      }
    }
  }
}
