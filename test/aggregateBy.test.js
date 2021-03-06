import '../src/aggregateBy';

test('AggregateBy: No result projection', () => {
    const expected = new Map();
    expected.set(1, 11);
    expected.set(2, 22);
    expected.set(3, 7);
    expect([
        {k: 1, v: 1},
        {k: 2, v: 5},
        {k: 3, v: 2},
        {k: 1, v: 7},
        {k: 2, v: 2},
        {k: 2, v: 8},
        {k: 1, v: 1},
    ].aggregateBy(x => x.k, (k, x) => k + x.v, (sum, next) => sum + next.v))
    .toStrictEqual(expected);
});

test('AggregateBy', () => {
    const expected = new Map();
    expected.set(1, 16);
    expected.set(2, 27);
    expected.set(3, 12);
    expect([
        {k: 1, v: 1},
        {k: 2, v: 5},
        {k: 3, v: 2},
        {k: 1, v: 7},
        {k: 2, v: 2},
        {k: 2, v: 8},
        {k: 1, v: 1},
    ].aggregateBy(x => x.k, (k, x) => k + x.v, (sum, next) => sum + next.v, sum => sum + 5))
    .toStrictEqual(expected);
});
