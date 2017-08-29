'use strict'

const dos2unix = require('./dos2unix-js').dos2unix
let converted = dos2unix('dos2unix-js.js', {feedback: true})
console.log(converted)
