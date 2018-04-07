/*
 * Copyright (C) 2017, Skyler.
 * Use of this source code is governed by the MIT license that can be
 * found in the LICENSE file.
 */

import ts from 'typescript'
import serviceHost from './serviceHost'

class Compiler {
  constructor (compilerOptions) {
    this.entities = new Set()
    this.service = ts.createLanguageService(
      serviceHost(this.entities, compilerOptions),
      ts.createDocumentRegistry()
    )
  }

  _convertResult (output) {
    let result = {
      content: undefined,
      sourceMap: undefined
    }
    output.outputFiles.forEach(out => {
      if (out.name.endsWith('.js')) {
        result.content = out.text
      } else if (out.name.endsWith('.map')) {
        result.sourceMap = out.text
      }
    })
    return result
  }

  _getDiagnostics (filename) {
    let d0 = this.service.getCompilerOptionsDiagnostics()
    let d1 = this.service.getSyntacticDiagnostics(filename)
    let d2 = this.service.getSemanticDiagnostics(filename)
    return d0.concat(d1, d2)
  }

  transpile (id, code) {
    // add file entity
    this.entities.add(id)
    // get compiled module
    let output = this.service.getEmitOutput(id)
    let result = this._convertResult(output)

    return {
      outputText: result.content,
      sourceMapText: result.sourceMap,
      diagnostics: this._getDiagnostics(id)
    }
  }
}

export function createCompiler (ctx) {
  let res = ts.parseJsonConfigFileContent(ctx.options, ts.sys, ctx.basePath)
  return new Compiler(res.fileNames, res.options)
}
