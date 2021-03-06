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

test('First', () => {
    expect([1,2,3].first(x => x - 2 === 0)).toBe(2);
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

test('FirstOrDefault: No default value', () => {
    expect([1,2,3].firstOrDefault(x => x - 2 == 0)).toBe(2);
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

test('FirstOrDefault', () => {
    expect([1,2,3].firstOrDefault(x => x - 2 == 0, 'deafult')).toBe(2);
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

// TODO_JU Test both arrays (direct access) and others
function* generate(array) {
    yield* array;
}
