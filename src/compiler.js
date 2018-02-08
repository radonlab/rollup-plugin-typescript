/*
 * Copyright (C) 2017, Skyler.
 * Use of this source code is governed by the MIT license that can be
 * found in the LICENSE file.
 */

import ts from 'typescript'
import serviceHost from './serviceHost'

class Compiler {
  constructor (compilerOptions) {
    let host = serviceHost(compilerOptions)
    let registry = ts.createDocumentRegistry()
    this.service = ts.createLanguageService(host, registry)
  }
  }

  transpile (id, code) {
  }
}

export function createCompiler () {
  return new Compiler()
}
