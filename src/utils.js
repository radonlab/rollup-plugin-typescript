/*
 * Copyright (C) 2017, Skyler.
 * Use of this source code is governed by the MIT license that can be
 * found in the LICENSE file.
 */

const _toString = Object.prototype.toString
const _toLowerCase = String.prototype.toLowerCase

export function lowerCase (str) {
  return str == null ? '' : _toLowerCase.call(str)
}

export function isObject (value) {
  const type = typeof value
  return value !== null && (type === 'object' || type === 'function')
}

export function isArray (value) {
  return _toString.call(value) === '[object Array]'
}

export function mergeObject (dst, ...srcs) {
  if (!isObject(dst)) {
    throw new TypeError('First argument must be an object')
  }
  for (let i = 0, len = srcs.length; i < len; i++) {
    let src = srcs[i]
    if (src == null) { continue }
    let keys = Object.keys(src)
    for (let j = 0, len = keys.length; j < len; j++) {
      let key = keys[j]
      let value = src[key]
      if (!isObject(value)) {
        dst[key] = value
      } else { // value is object
        if (isArray(value) && !isArray(dst[key])) {
          dst[key] = []
        } else if (!isObject(dst[key])) {
          dst[key] = {}
        }
        mergeObject(dst[key], value)
      }
    }
  }
  return dst
}
