/*
 * Copyright (C) 2017, Skyler.
 * Use of this source code is governed by the MIT license that can be
 * found in the LICENSE file.
 */

const _toLowerCase = String.prototype.toLowerCase

export function lowerCase (str) {
  return str == null ? '' : _toLowerCase.call(str)
}

export function isObject (value) {
  const type = typeof value
  return value !== null && (type === 'object' || type === 'function')
}

export function mergeObject (dst, ...srcs) {
  if (!isObject(dst)) {
    throw new TypeError('First argument must be an object')
  }
  for (let i = 0, len = srcs.length; i < len; i++) {
    let src = srcs[i]
    try {
      JSON.stringify(src)
    } catch (e) {
      throw e
    }
    let keys = Object.keys(src)
    for (let j = 0, len = keys.length; j < len; j++) {
      let key = keys[j]
      let value = src[key]
      if (!isObject(value)) {
        dst[key] = value
      } else { // is object
        mergeObject((dst[key] = {}), value)
      }
    }
  }
  return dst
}
