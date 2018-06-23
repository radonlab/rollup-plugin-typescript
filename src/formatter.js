/*
 * Copyright (C) 2017, Skyler.
 * Use of this source code is governed by the MIT license that can be
 * found in the LICENSE file.
 */

import path from 'path'
import ts from 'typescript'
import cl from 'chalk'

export function formatError (err) {
  return cl.red(`  TS${err.code}  `) + err.messageText
}

export function formatDiagnostic (diagnostic) {
  let code = diagnostic.code
  let message = ts.flattenDiagnosticMessageText(diagnostic.messageText)
  let file = diagnostic.file
  let fileLine = ''
  if (file) {
    let name = path.relative(process.cwd(), file.fileName)
    let pos = file.getLineAndCharacterOfPosition(diagnostic.start)
    fileLine = `${name}(${pos.line + 1}:${pos.character + 1})`
  }
  return `  ${cl.red('TS' + code)}  ${fileLine}\n  ${cl.cyan(message)}`
}
