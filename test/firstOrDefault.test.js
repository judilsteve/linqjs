import '../firstOrDefault';

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
