/*
 * Copyright (C) 2017, Skyler.
 * Use of this source code is governed by the MIT license that can be
 * found in the LICENSE file.
 */

import fs from 'fs'
import path from 'path'
import ts from 'typescript'
import { lowerCase, mergeObject } from './utils'

function assertOption (options, name, cond) {
  let value = options[name]
  if (!cond(value)) {
    throw new Error(`typescript: Invalid compilerOptions: "${name}": ${value}`)
  }
}

export function findTsConfig (cwd = process.cwd()) {
  return ts.findConfigFile(cwd, ts.sys.fileExists)
}

export function loadTsConfig (confFile) {
  if (confFile) {
    return JSON.parse(fs.readFileSync(confFile, 'utf-8'))
  }
  return null
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
