/*
 * Copyright (C) 2017, Skyler.
 * Use of this source code is governed by the MIT license that can be
 * found in the LICENSE file.
 */

const fs = require('fs')

export const resolveHost = {
  directoryExists (dirPath) {
    try {
      return fs.statSync(dirPath).isDirectory()
    } catch (e) {
      return false
    }
  },
  fileExists (filePath) {
    try {
      return fs.statSync(filePath).isFile()
    } catch (e) {
      return false
    }
  }
}
