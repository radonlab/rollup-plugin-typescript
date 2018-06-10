/*
 * Copyright (C) 2017, Skyler.
 * Use of this source code is governed by the MIT license that can be
 * found in the LICENSE file.
 */

import ck from 'chalk'

export default {
  log (...args) {
    console.log(...args)
  },
  info (...args) {
    console.log(ck.bold.cyan(...args))
  },
  warn (...args) {
    console.log(ck.bold.yellow(...args))
  },
  error (...args) {
    console.log(ck.bold.red(...args))
  }
}
