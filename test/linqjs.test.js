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
