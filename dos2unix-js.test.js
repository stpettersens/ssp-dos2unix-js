/*
  Test dos2unix-js.
*/

/* global describe it */
'use strict'

const dos2unix = require('./dos2unix-js').dos2unix
const assert = require('chai').assert
// const fs = require('fs')
const _exec = require('child_process').exec

let sources = ['dos2unix-js.js', 'dos2unix-js.test.js']

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
    let converted = dos2unix(sources[0], {native: false, feedback: true})
    let passed = checkLineEndings(converted)
    assert.equal(passed, true)
    done()
  })
})
