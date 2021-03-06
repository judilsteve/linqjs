import '../src/toMap';

test('ToMap: No elements, no value projection', () => {
    expect([].toMap(x => x)).toStrictEqual(new Map());
});

test('ToMap: No elements', () => {
    expect([].toMap(x => x, x => x)).toStrictEqual(new Map());
});

test('ToMap: No value projection', () => {
    const expected = new Map();
    expected.set(1, {k: 1, v: 2});
    expected.set(3, {k: 3, v: 4});
    expected.set(5, {k: 5, v: 6});
    expect(
        [{k: 1, v: 2}, {k: 3, v: 4}, {k: 5, v: 6}]
        .toMap(x => x.k))
    .toStrictEqual(expected);
});

test('ToMap', () => {
    const expected = new Map();
    expected.set(1, 2);
    expected.set(3, 4);
    expected.set(5, 6);
    expect(
        [{k: 1, v: 2}, {k: 3, v: 4}, {k: 5, v: 6}]
        .toMap(x => x.k, x => x.v))
    .toStrictEqual(expected);
});
