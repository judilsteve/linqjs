require('../src/linqjs');

// First

test('First: No elements, no predicate', () => {
    expect(() => [].first()).toThrow('Sequence contained no elements');
});

test('First: No predicate', () => {
    expect([1,2,3].first()).toBe(1);
});

test('First: No elements', () => {
    expect(() => [].first(x => x === 5)).toThrow('Sequence contained no elements');
});

test('First: No match', () => {
    expectAsArray(() => [1,2,3].first(x => x === 5)).toThrow('Sequence contained no elements');
});

test('First', () => {
    expect(
        [{val: 1, id: 0}, {val: 2, id: 1}, null, {val: 2, id: 2}, {val: 3, id: 3}]
        .first(x => x.val === 2))
    .toStrictEqual({val: 2, id: 1});
});

// FirstOrDefault

test('FirstOrDefault: No elements, no predicate, no default value', () => {
    expect([].firstOrDefault()).toBe(undefined);
});

test('FirstOrDefault: No predicate, no default value', () => {
    expect([1,2,3].firstOrDefault()).toBe(1);
});

test('FirstOrDefault: No elements, no default value', () => {
    expect([].firstOrDefault(x => x === 5)).toBe(undefined);
});

test('FirstOrDefault: No match, no default value', () => {
    expect([1,2,3].firstOrDefault(x => x === 5)).toBe(undefined);
});

test('FirstOrDefault: No default value', () => {
    expect(
        [{val: 1, id: 0}, {val: 2, id: 1}, null, {val: 2, id: 2}, {val: 3, id: 3}]
        .firstOrDefault(x => x.val === 2))
    .toStrictEqual({val: 2, id: 1});
});

test('FirstOrDefault: No elements, no predicate', () => {
    expect([].firstOrDefault(null, 'default')).toBe('default');
});

test('FirstOrDefault: No predicate', () => {
    expect([1,2,3].firstOrDefault(null, 'default')).toBe(1);
});

test('FirstOrDefault: No elements', () => {
    expect([].firstOrDefault(x => x === 5, 'default')).toBe('default');
});

test('FirstOrDefault: No match', () => {
    expect([1,2,3].firstOrDefault(x => x === 5, 'default')).toBe('default');
});

test('FirstOrDefault', () => {
    expect(
        [{val: 1, id: 0}, {val: 2, id: 1}, null, {val: 2, id: 2}, {val: 3, id: 3}]
        .firstOrDefault(x => x.val === 2, 'default'))
    .toStrictEqual({val: 2, id: 1});
});

// Single

test('Single: No elements, no predicate', () => {
    expect(() => [].single()).toThrow('Sequence contained no elements');
});

test('Single: No predicate, one element', () => {
    expect([42].single()).toBe(42);
});

test('Single: No predicate, multiple elements', () => {
    expect(() => [42, 52].single()).toThrow('Sequence contained more than one element');
});

test('Single: No elements', () => {
    expect(() => [].single(x => x === 5)).toThrow('Sequence contained no elements');
});

test('Single: One element, one match', () => {
    expect([42].single(x => x - 2 === 40)).toBe(42);
});

test('Single: One element, no matches', () => {
    expect(() => [32].single(x => x - 2 === 40)).toThrow('Sequence contained no elements');
});

test('Single: Multiple elements, no matches', () => {
    expect(() => [32, 52].single(x => x - 2 === 40)).toThrow('Sequence contained no elements');
});

test('Single: Multiple elements, one match', () => {
    expect([22, 42, 32].single(x => x - 2 === 40)).toBe(42);
});

test('Single: Multiple elements, multiple matches', () => {
    expect(() => [52, 42, 42].single(x => x - 2 === 40)).toThrow('Sequence contained more than one element');
});

// SingleOrDefault

test('SingleOrDefault: No elements, no predicate, no default value', () => {
    expect([].singleOrDefault()).toBe(undefined);
});

test('SingleOrDefault: No predicate, one element, no default value', () => {
    expect([42].singleOrDefault()).toBe(42);
});

test('SingleOrDefault: No predicate, multiple elements, no default value', () => {
    expect(() => [42, 52].singleOrDefault()).toThrow('Sequence contained more than one element');
});

test('SingleOrDefault: No elements, no default value', () => {
    expect([].singleOrDefault(x => x === 5)).toBe(undefined);
});

test('SingleOrDefault: One element, one match, no default value', () => {
    expect([42].singleOrDefault(x => x - 2 === 40)).toBe(42);
});

test('SingleOrDefault: One element, no matches, no default value', () => {
    expect([32].singleOrDefault(x => x - 2 === 40)).toBe(undefined);
});

test('SingleOrDefault: Multiple elements, no matches, no default value', () => {
    expect([32, 52].singleOrDefault(x => x - 2 === 40)).toBe(undefined);
});

test('SingleOrDefault: Multiple elements, one match, no default value', () => {
    expect([22, 42, 32].singleOrDefault(x => x - 2 === 40)).toBe(42);
});

test('SingleOrDefault: Multiple elements, multiple matches, no default value', () => {
    expect(() => [52, 42, 42].singleOrDefault(x => x - 2 === 40)).toThrow('Sequence contained more than one element');
});

test('SingleOrDefault: No elements, no predicate, default value', () => {
    expect([].singleOrDefault(null, 'default')).toBe('default');
});

test('SingleOrDefault: No predicate, one element, default value', () => {
    expect([42].singleOrDefault(null, 'default')).toBe(42);
});

test('SingleOrDefault: No predicate, multiple elements, default value', () => {
    expect(() => [42, 52].singleOrDefault(null, 'default')).toThrow('Sequence contained more than one element');
});

test('SingleOrDefault: No elements, default value', () => {
    expect([].singleOrDefault(x => x === 5, 'default')).toBe('default');
});

test('SingleOrDefault: One element, one match, default value', () => {
    expect([42].singleOrDefault(x => x - 2 === 40, 'default')).toBe(42);
});

test('SingleOrDefault: One element, no matches, default value', () => {
    expect([32].singleOrDefault(x => x - 2 === 40, 'default')).toBe('default');
});

test('SingleOrDefault: Multiple elements, no matches, default value', () => {
    expect([32, 52].singleOrDefault(x => x - 2 === 40, 'default')).toBe('default');
});

test('SingleOrDefault: Multiple elements, one match, default value', () => {
    expect([22, 42, 32].singleOrDefault(x => x - 2 === 40, 'default')).toBe(42);
});

test('SingleOrDefault: Multiple elements, multiple matches, default value', () => {
    expect(() => [52, 42, 42].singleOrDefault(x => x - 2 === 40, 'default')).toThrow('Sequence contained more than one element');
});

// Where

function expectAsArray(valueOrFunction) {
    let wrapped;
    if(valueOrFunction instanceof Function) {
        wrapped = () => [...valueOrFunction()];
    } else {
        wrapped = [...valueOrFunction];
    }
    return expect(wrapped);
}

test('Where: No elements', () => {
    expectAsArray([].where(x => x)).toStrictEqual([]);
});

test('Where: Basic predicate', () => {
    expectAsArray([1,2,3,4,5].where(x => x % 2)).toStrictEqual([1,3,5]);
});

test('Where: Indexed predicate', () => {
    expectAsArray([1,2,3,4,5].where((x, i) => x % 2 && i < 4)).toStrictEqual([1,3]);
})

// Select

test('Select: No elements', () => {
    expectAsArray([].select(x => Math.pow(x, 2))).toStrictEqual([]);
});

test('Select: Basic projection', () => {
    expectAsArray([1,2,3].select(x => Math.pow(x, 2))).toStrictEqual([1,4,9]);
});

test('Select: Indexed projection', () => {
    expectAsArray([1,2,3].select((x, i) => Math.pow(x, 2) + i)).toStrictEqual([1,5,11]);
});

// SelectMany

test('SelectMany: No elements, no projection', () => {
    expectAsArray([].selectMany()).toStrictEqual([]);
});

test('SelectMany: No elements', () => {
    expectAsArray([].selectMany(x => [x,x])).toStrictEqual([]);
});

test('SelectMany: No projection', () => {
    expectAsArray([[1,2],[3,[4]]].selectMany()).toStrictEqual([1,2,3,[4]]);
});

test('SelectMany', () => {
    expectAsArray([1,2,3,4].selectMany(x => [x,x])).toStrictEqual([1,1,2,2,3,3,4,4]);
});

// Concat

test('Concat: Empty source, single empty argument', () => {
    expectAsArray([].linqConcat([])).toStrictEqual([]);
});

test('Concat: Empty source, multiple empty arguments', () => {
    expectAsArray([].linqConcat([],[])).toStrictEqual([]);
});

test('Concat: Single empty argument', () => {
    expectAsArray([1,2,3].linqConcat([])).toStrictEqual([1,2,3]);
});

test('Concat: Multiple empty arguments', () => {
    expectAsArray([1,2,3].linqConcat([],[])).toStrictEqual([1,2,3]);
});

test('Concat: Single argument', () => {
    expectAsArray([1,2,3].linqConcat([4,5])).toStrictEqual([1,2,3,4,5]);
});

test('Concat', () => {
    expectAsArray([1,2,3].linqConcat([4,5],[6,7])).toStrictEqual([1,2,3,4,5,6,7]);
});

// Skip

function* generate(array) {
    yield* array;
}

test('Skip: Direct access', () => {
    expectAsArray([1,2,3,4,5].skip(2)).toStrictEqual([3,4,5]);
});

test('Skip: Direct access, skip whole sequence', () => {
    expectAsArray([1,2,3,4,5].skip(5)).toStrictEqual([]);
});

test('Skip: Direct access, skip past whole sequence', () => {
    expectAsArray([1,2,3,4,5].skip(100)).toStrictEqual([]);
});

test('Skip: Direct access, empty sequence', () => {
    expectAsArray([].skip(100)).toStrictEqual([]);
});

test('Skip', () => {
    expectAsArray(generate([1,2,3,4,5]).skip(2)).toStrictEqual([3,4,5]);
});

test('Skip: Skip whole sequence', () => {
    expectAsArray(generate([1,2,3,4,5]).skip(5)).toStrictEqual([]);
});

test('Skip: Skip past whole sequence', () => {
    expectAsArray(generate([1,2,3,4,5]).skip(100)).toStrictEqual([]);
});

test('Skip: Empty sequence', () => {
    expectAsArray(generate([]).skip(100)).toStrictEqual([]);
});

// Take

test('Take: Take whole sequence', () => {
    expectAsArray([1,2,3].take(3)).toStrictEqual([1,2,3]);
});

test('Take: Take past whole sequence', () => {
    expectAsArray([1,2,3].take(100)).toStrictEqual([1,2,3]);
});

test('Take: Empty sequence', () => {
    expectAsArray([].take(100)).toStrictEqual([]);
});

test('Take', () => {
    expectAsArray([1,2,3,4,5].take(3)).toStrictEqual([1,2,3]);
});

// Count

test('Count: Empty sequence, no predicate, length property', () => {
    expect([].count()).toBe(0);
});

test('Count: Empty sequence, length property', () => {
    expect([].count(x => x === 42)).toBe(0);
});

test('Count: No predicate, length property', () => {
    expect([5,5,5].count()).toBe(3);
});

test('Count: Length property', () => {
    expect([5,4,4].count(x => x < 5)).toBe(2);
});

test('Count: Empty sequence, no predicate', () => {
    expect(generate([]).count()).toBe(0);
});

test('Count: Empty sequence', () => {
    expect(generate([]).count(x => x === 42)).toBe(0);
});

test('Count', () => {
    expect(generate([5,4,4]).count(x => x < 5)).toBe(2);
});

// Last

test('Last: No elements, no predicate', () => {
    expect(() => [].last()).toThrow('Sequence contained no elements');
});

test('Last: No predicate', () => {
    expect([1,2,3].last()).toBe(3);
});

test('Last: No elements', () => {
    expect(() => [].last(x => x === 5)).toThrow('Sequence contained no elements');
});

test('Last: No match', () => {
    expectAsArray(() => [1,2,3].last(x => x === 5)).toThrow('Sequence contained no elements');
});

test('Last', () => {
    expect(
        [{val: 1, id: 0}, {val: 2, id: 1}, {val: 3, id: 2}, {val: 2, id: 3}, {val: 3, id: 4}]
        .last(x => x.val - 2 === 0))
    .toStrictEqual({ val: 2, id: 3 });
});

// LastOrDefault

test('LastOrDefault: No elements, no predicate, no default', () => {
    expect([].lastOrDefault()).toBe(undefined);
});

test('LastOrDefault: No predicate, no default', () => {
    expect([1,2,3].lastOrDefault()).toBe(3);
});

test('LastOrDefault: No elements, no default', () => {
    expect([].lastOrDefault(x => x === 5)).toBe(undefined);
});

test('LastOrDefault: No match, no default', () => {
    expect([1,2,3].lastOrDefault(x => x === 5)).toBe(undefined);
});

test('LastOrDefault: No default', () => {
    expect(
        [{val: 1, id: 0}, {val: 2, id: 1}, {val: 3, id: 2}, {val: 2, id: 3}, {val: 3, id: 4}]
        .lastOrDefault(x => x.val - 2 === 0))
    .toStrictEqual({ val: 2, id: 3 });
});

test('LastOrDefault: No elements, no predicate', () => {
    expect([].lastOrDefault(null, 'default')).toBe('default');
});

test('LastOrDefault: No predicate', () => {
    expect([1,2,3].lastOrDefault(null, 'default')).toBe(3);
});

test('LastOrDefault: No elements', () => {
    expect([].lastOrDefault(x => x === 5, 'default')).toBe('default');
});

test('LastOrDefault: No match', () => {
    expect([1,2,3].lastOrDefault(x => x === 5, 'default')).toBe('default');
});

test('LastOrDefault', () => {
    expect(
        [{val: 1, id: 0}, {val: 2, id: 1}, {val: 3, id: 2}, {val: 2, id: 3}, {val: 3, id: 4}]
        .lastOrDefault(x => x.val - 2 === 0, 'default'))
    .toStrictEqual({ val: 2, id: 3 });
});

// Any

test('Any: No elements, no predicate', () => {
    expect([].any()).toBe(false);
});

test('Any: No elements', () => {
    expect([].any(x => x === 42)).toBe(false);
});

test('Any: No predicate', () => {
    expect([1,2,3].any()).toBe(true);
});

test('Any: No match', () => {
    expect([1,2,3].any(x => x === 42)).toBe(false);
});

test('Any', () => {
    expect([{val: 1}, {val: 2}, {val: 42}, null].any(x => x.val === 42)).toBe(true);
});

// All

test('All: No elements', () => {
    expect([].all(x => x % 2 === 0)).toBe(true);
});

test('All: Mismatch', () => {
    expect([{val: 2}, {val: 4}, {val: 5}, null].all(x => x.val % 2 === 0)).toBe(false);
});

test('All', () => {
    expect([2,4,6,8].all(x => x % 2 === 0)).toBe(true);
});

// Contains

function* generateThenThrow(array) {
    yield* array;
    throw new Error('Sequence was enumerated further than expected');
}

test('Contains: No elements', () => {
    expect([].contains(1)).toBe(false);
});

test('Contains: No match', () => {
    expect([2,3].contains(1)).toBe(false);
});

test('Contains', () => {
    expect(generateThenThrow([2,3,1]).contains(1)).toBe(true);
});

// Max

test('Max: No elements, no projection', () => {
    expect([].max()).toBe(undefined);
});

test('Max: No elements', () => {
    expect([].max(x => x + 1)).toBe(undefined);
});

test('Max: No projection', () => {
    expect([1,2,4,3].max()).toBe(4);
});

test('Max', () => {
    expect([1,2,4,3].max(x => x + 1)).toBe(5);
});

// Min

test('Min: No elements, no projection', () => {
    expect([].min()).toBe(undefined);
});

test('Min: No elements', () => {
    expect([].min(x => x + 1)).toBe(undefined);
});

test('Min: No projection', () => {
    expect([2,1,4,3].min()).toBe(1);
});

test('Min', () => {
    expect([2,1,4,3].min(x => x + 1)).toBe(2);
});

// Sum

test('Sum: No elements, no projection', () => {
    expect([].sum()).toBe(0);
});

test('Sum: No elements', () => {
    expect([].sum(x => x + 1)).toBe(0);
});

test('Sum: No projection', () => {
    expect([2,1,4,3].sum()).toBe(10);
});

test('Sum', () => {
    expect([2,1,4,3].sum(x => x + 1)).toBe(14);
});

// Average

test('Average: No elements, no projection', () => {
    expect(() => [].average()).toThrow('Sequence contained no elements');
});

test('Average: No elements', () => {
    expect(() => [].average(x => x + 1)).toThrow('Sequence contained no elements');
});

test('Average: No projection', () => {
    expect([2,1,4,3].average()).toBe(2.5);
});

test('Average', () => {
    expect([2,1,4,3].average(x => x + 1)).toBe(3.5);
});

// ToArray

test('ToArray: No elements, no projection', () => {
    const original = [];
    const result = original.toArray();
    expect(result).toStrictEqual(original);
    expect(result).not.toBe(original);
});

test('ToArray: No projection', () => {
    const original = [1,2,3];
    const result = original.toArray();
    expect(result).toStrictEqual(original);
    expect(result).not.toBe(original);
});

test('ToArray: No elements', () => {
    const original = [];
    const result = original.toArray(x => Math.pow(x, 2));
    expect(result).toStrictEqual(original);
    expect(result).not.toBe(original);
});

test('ToArray', () => {
    const original = [1,2,3];
    const result = original.toArray(x => Math.pow(x, 2));
    expect(result).toStrictEqual([1,4,9]);
});

// ToMap

test('ToMap: No elements, no value projection', () => {
    expect([].toMap(x => x)).toStrictEqual(new Map());
});

test('ToMap: No elements', () => {
    expect([].toMap(x => x, x => x)).toStrictEqual(new Map());
});

test('ToMap: No value projection', () => {
    const expected = new Map();
    expected.set(1, {k: 1, v: 2});
    expected.set(3, {k: 3, v: 4});
    expected.set(5, {k: 5, v: 6});
    expect(
        [{k: 1, v: 2}, {k: 3, v: 4}, {k: 5, v: 6}]
        .toMap(x => x.k))
    .toStrictEqual(expected);
});

test('ToMap', () => {
    const expected = new Map();
    expected.set(1, 2);
    expected.set(3, 4);
    expected.set(5, 6);
    expect(
        [{k: 1, v: 2}, {k: 3, v: 4}, {k: 5, v: 6}]
        .toMap(x => x.k, x => x.v))
    .toStrictEqual(expected);
});

// ToSet

test('ToSet: No elements, no projection', () => {
    expectAsArray([].toSet()).toStrictEqual([]);
});

test('ToSet: No projection', () => {
    expectAsArray([1,2,3,4,3].toSet()).toStrictEqual([1,2,3,4]);
});

test('ToSet: No elements', () => {
    expectAsArray([].toSet(x => x + 1)).toStrictEqual([]);
});

test('ToSet', () => {
    expectAsArray([1,2,3,4,3].toSet(x => x + 1)).toStrictEqual([2,3,4,5]);
});

// GroupBy

test('GroupBy: No elements', () => {
    expect([].groupBy(x => x % 2)).toStrictEqual(new Map());
});

test('GroupBy', () => {
    const expected = new Map();
    expected.set(1, [1,3,5]);
    expected.set(0, [2,4]);
    expect([1,2,3,4,5].groupBy(x => x % 2)).toStrictEqual(expected);
});

// Zip

test('Zip: No result projection', () => {
    expectAsArray([1,2,3].zip(null, [3,2,1])).toStrictEqual([[1,3],[2,2],[3,1]]);
});

test('Zip: Unequal sequence lengths', () => {
    expectAsArray([1,2,3].zip((x, y, z) => x + y + z, [2,3,4], [3,4])).toStrictEqual([6,9]);
});

test('Zip', () => {
    expectAsArray([1,2,3].zip((x, y, z) => x + y + z, [2,3,4], [3,4,5])).toStrictEqual([6,9,12]);
});

// Union

test('Union: Empty sequences', () => {
    expectAsArray([].union([], [])).toStrictEqual([]);
});

test('Union', () => {
    expectAsArray([1,1,2].union([3,3,4], [2,3,1,5])).toStrictEqual([1,2,3,4,5]);
});

// Distinct

test('Distinct', () => {
    expectAsArray([1,1,2,1,3,4,2].distinct()).toStrictEqual([1,2,3,4]);
});

// Intersect

test('Intersect: Single sequence', () => {
    expectAsArray([1,1,2,3].intersect()).toStrictEqual([1,2,3]);
});

test('Intersect: Two sequences', () => {
    expectAsArray([1,1,2,3].intersect([1,3,5])).toStrictEqual([1,3]);
});

test('Intersect', () => {
    expectAsArray([1,1,2,3].intersect([1,3,5], [1,5,6])).toStrictEqual([1]);
});

// Except

test('Except: No sequences', () => {
    expectAsArray([1,1,2,3].except()).toStrictEqual([1,1,2,3]);
});

test('Except', () => {
    expectAsArray([1,1,2,3,4,5,6,7,6,8].except([1,3], [6,5])).toStrictEqual([2,4,7,8]);
});

// OrderBy

test('OrderBy', () => {
    expectAsArray([3,2,1].orderBy(x => x)).toStrictEqual([1,2,3]);
});

// ThenBy

test('ThenBy: Descending first', () => {
    expectAsArray(
        [{a: 1, b: 1}, {a:2, b: 1}, {a: 2, b: 2}]
        .orderByDescending(x => x.a)
        .thenBy(x => x.b))
    .toStrictEqual([{a: 2, b: 1}, {a: 2, b: 2}, {a: 1, b: 1}]);
});

test('ThenBy', () => {
    expectAsArray(
        [{a: 2, b: 1}, {a:1, b: 2}, {a: 1, b: 1}]
        .orderBy(x => x.a)
        .thenBy(x => x.b))
    .toStrictEqual([{a: 1, b: 1}, {a: 1, b: 2}, {a: 2, b: 1}]);
});

// OrderByDescending

test('OrderByDescending', () => {
    expectAsArray([1,2,3].orderByDescending(x => x)).toStrictEqual([3,2,1]);
});

// ThenByDescending

test('ThenByDescending: Descending first', () => {
    expectAsArray(
        [{a: 1, b: 1}, {a:2, b: 1}, {a: 2, b: 2}]
        .orderByDescending(x => x.a)
        .thenByDescending(x => x.b))
    .toStrictEqual([{a: 2, b: 2}, {a: 2, b: 1}, {a: 1, b: 1}]);
});

test('ThenByDescending', () => {
    expectAsArray(
        [{a: 2, b: 1}, {a:1, b: 1}, {a: 1, b: 2}]
        .orderBy(x => x.a)
        .thenByDescending(x => x.b))
    .toStrictEqual([{a: 1, b: 2}, {a: 1, b: 1}, {a: 2, b: 1}]);
});

// Append

test('Append', () => {
    expectAsArray([1,2,3].append(4,5)).toStrictEqual([1,2,3,4,5]);
});

// Prepend

test('Prepend', () => {
    expectAsArray([1,2,3].prepend(4,5)).toStrictEqual([4,5,1,2,3]);
});

// DefaultIfEmpty

test('DefaultIfEmpty: Empty', () => {
    expectAsArray([].defaultIfEmpty('default')).toStrictEqual(['default']);
});

test('DefaultIfEmpty', () => {
    expectAsArray([1,2,3].defaultIfEmpty('default')).toStrictEqual([1,2,3]);
});

// LinqReverse

test('LinqReverse: Direct access', () => {
    expectAsArray([1,2,3].linqReverse()).toStrictEqual([3,2,1]);
});

test('LinqReverse', () => {
    expectAsArray(generate([1,2,3]).linqReverse()).toStrictEqual([3,2,1]);
});

// SequenceEqual TODO Two code paths: One for iterables with length, one without
