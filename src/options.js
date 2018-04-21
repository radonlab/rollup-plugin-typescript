/*
 * Copyright (C) 2017, Skyler.
 * Use of this source code is governed by the MIT license that can be
 * found in the LICENSE file.
 */

import path from 'path'
import ts from 'typescript'
import { lowerCase, mergeObject } from './utils'

function assertOption (options, name, cond) {
  let value = options[name]
  if (!cond(value)) {
    throw new Error(`typescript: Invalid compilerOptions: "${name}": ${value}`)
  }
}

export function initContext () {
  let context = {
    confFile: undefined,
    basePath: undefined
  }
  let confFile = ts.findConfigFile(process.cwd(), ts.sys.fileExists)
  if (confFile) {
  context.confFile = confFile
  context.basePath = path.dirname(confFile)
}
  return context
}

export function loadTsConfig () {
  let confFile = context.confFile
  if (confFile) {
    let result = ts.parseConfigFileTextToJson(
      confFile,
      ts.sys.readFile(confFile)
    )
    return result.config
  }
  return null
}

export function parseTsConfig (confFile, options) {
  let basePath = path.dirname(confFile)
  return ts.parseJsonConfigFileContent(options, ts.sys, basePath)
}

export function mergeOptions (...opts) {
  return mergeObject({}, ...opts)
}

export function validateOptions (options) {
  let opts = options.compilerOptions || {}
  assertOption(opts, 'module', value => {
    value = lowerCase(value)
    return value === 'es2015' || value === 'es6'
  })
}
