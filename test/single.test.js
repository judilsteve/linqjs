import '../src/single';

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
