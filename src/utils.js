/*
 * Copyright (C) 2017, Skyler.
 * Use of this source code is governed by the MIT license that can be
 * found in the LICENSE file.
 */

const _toLowerCase = String.prototype.toLowerCase

export function lowerCase (str) {
  return str == null ? '' : _toLowerCase.call(str)
}
