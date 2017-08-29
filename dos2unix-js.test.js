/*
  Test dos2unix-js.
*/

/* global describe it */
'use strict'

const dos2unix = require('./dos2unix-js').dos2unix
const assert = require('chai').assert
const _exec = require('child_process').exec
const os = require('os')
const fs = require('fs')

let sources = ['dos2unix-js.js', 'dos2unix-js.test.js']

function toDosLineEndings (contents) {
  let ucontents = []
  for (let i = 0; i < contents.length; i++) {
    if (contents.charAt(i) === '\n') {
      ucontents.push('\r\n')
    } else {
      ucontents.push(contents.charAt(i))
    }
  }
  fs.writeFileSync(sources[0], ucontents.join(''))
}

function checkLineEndings (data) {
  let passed = true
  for (let i = 0; i < data.length; i++) {
    if (data.charAt(i) === '\r') {
      passed = false
      break
    }
  }
  return passed
}

describe('Test dos2unix:', function () {
  it('Test code conforms to JS Standard Style (http://standardjs.com).', function (done) {
    _exec(`standard ${sources.join(' ')}`, function (err, stdout, stderr) {
      let passed = true
      if (err || stderr.length > 0) {
        console.log('\n' + stderr)
        console.log(stdout)
        passed = false
      }
      assert.equal(passed, true)
      done()
    })
  })

  it('Use dos2unix pure JS implementation without writing.', function (done) {
    if (os.platform() !== 'win32') {
      toDosLineEndings(fs.readFileSync(sources[0]).toString())
    }
    let converted = dos2unix(sources[0], {feedback: true})
    let passed = checkLineEndings(converted)
    assert.equal(passed, true)
    done()
  })
})
