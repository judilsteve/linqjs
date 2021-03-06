import '../src/first';

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
    expect(() => [1,2,3].first(x => x === 5)).toThrow('Sequence contained no elements');
});

test('First', () => {
    expect(
        [{val: 1, id: 0}, {val: 2, id: 1}, null, {val: 2, id: 2}, {val: 3, id: 3}]
        .first(x => x.val === 2))
    .toStrictEqual({val: 2, id: 1});
});
