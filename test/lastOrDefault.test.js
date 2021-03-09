import '../lastOrDefault';

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
