/*
 * Copyright (C) 2017, Skyler.
 * Use of this source code is governed by the MIT license that can be
 * found in the LICENSE file.
 */

import path from 'path'
import ts from 'typescript'

export function formatDiagnostic (diagnostic) {
  let source = diagnostic.file
  let pos = source.getLineAndCharacterOfPosition(diagnostic.start)
  let name = path.relative(process.cwd(), source.fileName)
  let message = ts.flattenDiagnosticMessageText(diagnostic.messageText)
  return `TS${diagnostic.code} ${name}(${pos.line + 1}:${pos.character + 1})
  ${message}`
}
