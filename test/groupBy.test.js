import '../groupBy';

test('GroupBy: No elements', () => {
    expect([].groupBy(x => x % 2)).toStrictEqual(new Map());
});

test('GroupBy', () => {
    const expected = new Map();
    expected.set(1, [1,3,5]);
    expected.set(0, [2,4]);
    expect([1,2,3,4,5].groupBy(x => x % 2)).toStrictEqual(expected);
});
