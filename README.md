# cp-set

cp-set is a JavaScript library for a simple Set data structure.

[![Build Status](https://secure.travis-ci.org/cpettitt/cp-set.png)](http://travis-ci.org/cpettitt/cp-set)

# Getting cp-set

## NPM Install

Before installing this library you need to install the [npm package manager].

To get cp-set from npm, use:

    $ npm install cp-set

## Browser Scripts

You can get the latest browser-ready scripts:

* [cp-set.js](http://cpettitt.github.io/project/cp-set/latest/cp-set.js)
* [cp-set.min.js](http://cpettitt.github.io/project/cp-set/latest/cp-set.min.js)

## Build From Source

Before building this library you need to install the [npm package manager].

Check out this project and run this command from the root of the project:

    $ make

This will generate `cp-set.js` and `cp-set.min.js` in the `out/dist` directory
of the project.

# Example

```js
var Set = require('cp-set').Set;

var s1 = new Set();

s1.has(1);
// => false

s1.add(1);
// => true

s1.size();
// => 1

s1.has(1);
// => true

// Addind a key that is already in the set does not change the set. The
// function returns `false` to indicate nothing changed.
s1.add(1);
// => false

s1.size();
// => 1

s1.add(2);
s1.size();
// => 2

// We can construct a set from an array
var s2 = new Set([2, 3, 4]);

s2.keys();
// => [2, 3, 4]

// Intersection:
Set.intersect([s1, s2]).keys();
// => [2]

// Union:
Set.union([s1, s2]).keys();
// => [1, 2, 3, 4]

// We can also do set intersection / union with arrays:
Set.intersect([[1, 2, 3], [2, 3, 4]]).keys();
// => [2, 3]

// We can do set intersection / union with more that 2 sets:
Set.union([s1, s2, ['a', 'b', 'c']]).keys();
// => [1, 2, 3, 4, 'a', 'b', 'c']

// Lastly, sets preserve the type of the key supplied. Compare the following 2
// results:
new Set([1]).keys();
// => [1]
new Set(['1']).keys();
// => ['1']
```

# License

cp-set is licensed under the terms of the MIT License. See the LICENSE file
for details.

[npm package manager]: http://npmjs.org/
