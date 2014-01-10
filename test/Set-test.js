var assert = require('chai').assert,
    /* jshint -W079 */
    Set = require('..').Set;
    /* jshint +W079 */

describe('data.Set', function() {
  var set;
  beforeEach(function() {
    set = new Set();
    set.add('a');
    set.add('b');
    set.add('c');
  });

  describe('constructor with initial keys', function() {
    it('adds the initial keys to the set', function() {
      set = new Set(['foo', 'bar', 'baz', 'foo']);
      assert.equal(set.size(), 3);
      assert.deepEqual(set.keys().sort(), ['foo', 'bar', 'baz'].sort());
    });
  });

  describe('intersect', function() {
    it('intersects all sets', function() {
      var set1 = new Set([1, 2, 3]);
      var set2 = new Set([2, 3, 'A']);
      var set3 = new Set([3, 'A', 'B']);
      assert.deepEqual(Set.intersect([set1, set2, set3]).keys().sort(),
                       [3]);
    });

    it('also works for arrays', function() {
      var s1 = [1, 2];
      var a2 = ['1', 3];
      assert.deepEqual(Set.intersect([s1, a2]).keys().sort(), [1]);
    });

    it('returns an empty Set for an empty array input', function() {
      assert.lengthOf(Set.intersect([]).keys(), 0);
    });
  });

  describe('union', function() {
    it('unions all sets', function() {
      var set1 = new Set([1, 2, 3]);
      var set2 = new Set([2, 3, 'A']);
      var set3 = new Set([3, 'A', 'B']);
      var set4 = new Set(['1']);
      assert.deepEqual(Set.union([set1, set2, set3, set4]).keys().sort(),
                       [1, 2, 3, 'A', 'B']);
    });

    it('also works for arrays', function() {
      var s1 = [1, 2];
      var a2 = ['1', 3];
      assert.deepEqual(Set.union([s1, a2]).keys().sort(), [1, 2, 3]);
    });
  });

  describe('size', function() {
    it('returns the size of the set', function() {
      assert.equal(set.size(), 3);
    });
  });

  describe('keys', function() {
    it('returns the keys in the set as an array', function() {
      assert.deepEqual(set.keys().sort(), ['a', 'b', 'c']);
    });

    it('preserves the type of the keys', function() {
      var set = new Set();
      set.add(1);
      assert.deepEqual(set.keys().sort(), [1]);
    });
  });

  describe('has', function() {
    it('returns true if the key is in the set', function() {
      assert.isTrue(set.has('a'));
      assert.isTrue(set.has('b'));
      assert.isTrue(set.has('c'));
    });

    it('returns false if the key is not in the set', function() {
      assert.isFalse(set.has('foo'));
    });
  });

  describe('add', function() {
    it('adds the key to the set if it was not present', function() {
      assert.isFalse(set.has('foo'));
      assert.isTrue(set.add('foo'));
      assert.isTrue(set.has('foo'));
    });

    it('does nothing if the key was already in the set', function() {
      assert.isTrue(set.has('a'));
      assert.isFalse(set.add('a'));
      assert.isTrue(set.has('a'));
    });

    it('treats two objects that coerce to the same string as the same key', function() {
      var set = new Set();
      set.add(1);
      assert.isFalse(set.add('1'));
    });
  });

  describe('remove', function() {
    it('removes the key if it was in the set', function() {
      assert.isTrue(set.has('a'));
      assert.isTrue(set.remove('a'));
      assert.isFalse(set.has('a'));
    });

    it('decreases the size if the key was removed', function() {
      var size = set.size();
      set.remove('a');
      assert.equal(set.size(), size - 1);
    });

    it('does nothing if the key was not in the set', function() {
      assert.isFalse(set.has('foo'));
      assert.isFalse(set.remove('foo'));
      assert.isFalse(set.has('foo'));
    });

    it('does not decrease the size if the key was not removed', function() {
      var size = set.size();
      set.remove('foo');
      assert.equal(set.size(), size);
    });
  });
});
