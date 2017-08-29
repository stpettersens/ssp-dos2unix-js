### ssp-dos2unix
> :end: A dos2unix implementation in pure JS.

[![Build Status](https://travis-ci.org/stpettersens/ssp-dos2unix-js.png?branch=master)](https://travis-ci.org/stpettersens/ssp-dos2unix-js)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)
[![npm version](https://badge.fury.io/js/ssp-dos2unix-js.svg)](http://npmjs.com/package/ssp-dos2unix-js)

##### Install:

    $ npm install ssp-dos2unix-js

##### Usage:
```js
'use strict'
const dos2unix = require('dos2unix-js').dos2unix

let converted = dos2unix('README.md', {native: false, feedback: true, writable: false})
console.log(converted) // Returned text as string without any carriage returns (\r).
// If you use writable as true, returns 0 instead of text.
```

##### Options:

Omittable options object with following allowable parameters:

* `feedback` (Boolean) - Display feedback (*"File already has UNIX line endings..."*).
* `writable` (Boolean) - Write change to file rather than return as string.

All options are false if omitted except for writable which is true.
