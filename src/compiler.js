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
    let host = serviceHost(this.entities, compilerOptions)
    let registry = ts.createDocumentRegistry()
    this.service = ts.createLanguageService(host, registry)
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

    return {
      outputText: undefined,
      sourceMapText: undefined,
      diagnostics: this._getDiagnostics(id)
    }
  }
}

export function createCompiler () {
  return new Compiler()
}
