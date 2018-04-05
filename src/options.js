/*
 * Copyright (C) 2017, Skyler.
 * Use of this source code is governed by the MIT license that can be
 * found in the LICENSE file.
 */

import path from 'path'
import fs from 'fs'
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

class OptionContext {
  constructor () {
    this.options = {}
    this.confFile = null
    this.basePath = null
  }

  loadFileOptions (cwd = process.cwd()) {
    let confFile = findup('tsconfig.json', cwd)
    if (confFile !== null) {
      this.confFile = confFile
      this.basePath = path.dirname(confFile)
      return JSON.parse(fs.readFileSync(confFile, 'utf-8'))
    }
    return null
  }

  mergeOptions (...opts) {
    this.options = mergeObject(this.options, ...opts)
  }

  validateOptions () {
    let opts = this.options.compilerOptions || {}
    assertOption(opts, 'module', (value) => {
      value = lowerCase(value)
      return value === 'es2015' || value === 'es6'
    })
  }
}

export function createContext () {
  return new OptionContext()
}
