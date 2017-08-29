/*
dos2unix implementation with Node.js.
Copyright 2016, 2017 Sam Saint-Pettersen.

Released under the MIT License;
see LICENSE file.
*/

'use strict'

const fs = require('fs')

function isAscii (contents) {
  let ascii = true
  for (let i = 0; i < contents.length; i++) {
    if (contents.charCodeAt(i) > 127) {
      ascii = false
      break
    }
  }
  return ascii
}

function isDOSeol (contents) {
  let doseol = false
  for (let i = 0; i < contents.length; i++) {
    if (contents.charAt(i) === '\r') {
      doseol = true
      break
    }
  }
  return doseol
}

function toUnixLineEndings (contents) {
  let ucontents = []
  for (let i = 0; i < contents.length; i++) {
    if (contents.charAt(i) !== '\r') {
      ucontents.push(contents.charAt(i))
    }
  }
  return ucontents.join('')
}

module.exports.dos2unix = function (filename, options) {
  let feedback = false
  let write = false
  if (options && options.feedback !== undefined) {
    feedback = options.feedback
  }

  if (options && options.write !== undefined) {
    write = options.write
  }
  let message = 'dos2unix: File already has UNIX line endings or is binary.'
  let contents = fs.readFileSync(filename, 'utf8').toString()
  if (isAscii(contents) && isDOSeol(contents)) {
    let converted = toUnixLineEndings(contents)
    if (write) {
      fs.writeFileSync(filename, converted, 'utf8', 'wb')
      return 0
    } else {
      if (feedback) {
        console.warn(message)
      }
      return converted
    }
  } else if (feedback) {
    console.warn(message)
  }
}
