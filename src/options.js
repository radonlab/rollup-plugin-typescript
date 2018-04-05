/*
 * Copyright (C) 2017, Skyler.
 * Use of this source code is governed by the MIT license that can be
 * found in the LICENSE file.
 */

import path from 'path'
import fs from 'fs-extra'
import ts from 'typescript'
import { lowerCase, mergeObject } from './utils'

function findup (name, cwd) {
  let dir = path.resolve(cwd)
  let target = ''
  while (dir !== '') {
    target = path.join(dir, name)
    if (fs.existsSync(target)) {
      return target
    }
    dir = dir.substring(0, dir.lastIndexOf(path.sep))
  }
  return null
}

function assertOption (options, name, cond) {
  let value = options[name]
  if (!cond(value)) {
    throw new Error(`typescript: Invalid compilerOptions: "${name}": ${value}`)
  }
}

export function getFileOptionsAndPath (cwd = process.cwd()) {
  let confFile = findup('tsconfig.json', cwd)
  return confFile && {
    options: fs.readJSONSync(confFile),
    path: path.dirname(confFile)
  }
}

export function validateOptions (options) {
  let opts = options.compilerOptions || {}
  assertOption(opts, 'module', (value) => {
    value = lowerCase(value)
    return value === 'es2015' || value === 'es6'
  })
}

export function getCompilerOptions (options) {
  let opts = options.compilerOptions || {}
  let r = ts.convertCompilerOptionsFromJson(opts, process.cwd())
  return r.options
}

export const mergeOptions = mergeObject
