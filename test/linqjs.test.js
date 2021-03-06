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
