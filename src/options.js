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

export function loadConfig (context) {
  let confFile = context.confFile
  if (!confFile) {
    return null
  }
  let result = ts.parseConfigFileTextToJson(
    confFile,
    ts.sys.readFile(confFile)
  )
  return result.config
}

export function mergeOptions (...opts) {
  return mergeObject({}, ...opts)
}

export function parseOptions (context, options) {
  let opts = options.compilerOptions || {}
  // validate compiler options
  assertOption(opts, 'module', value => {
    value = lowerCase(value)
    return value === 'es2015' || value === 'es6'
  })
  let basePath = context.basePath
  return ts.parseJsonConfigFileContent(options, ts.sys, basePath)
}
