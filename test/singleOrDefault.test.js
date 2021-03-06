import '../src/singleOrDefault';

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
