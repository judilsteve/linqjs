import '../last';

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
    expect(() => [1,2,3].last(x => x === 5)).toThrow('Sequence contained no elements');
});

test('Last', () => {
    expect(
        [{val: 1, id: 0}, {val: 2, id: 1}, {val: 3, id: 2}, {val: 2, id: 3}, {val: 3, id: 4}]
        .last(x => x.val - 2 === 0))
    .toStrictEqual({ val: 2, id: 3 });
});
