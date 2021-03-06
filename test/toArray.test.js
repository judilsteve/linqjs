import '../src/toArray';

test('ToArray: No elements, no projection', () => {
    const original = [];
    const result = original.toArray();
    expect(result).toStrictEqual(original);
    expect(result).not.toBe(original);
});

test('ToArray: No projection', () => {
    const original = [1,2,3];
    const result = original.toArray();
    expect(result).toStrictEqual(original);
    expect(result).not.toBe(original);
});

test('ToArray: No elements', () => {
    const original = [];
    const result = original.toArray(x => Math.pow(x, 2));
    expect(result).toStrictEqual(original);
    expect(result).not.toBe(original);
});

test('ToArray', () => {
    const original = [1,2,3];
    const result = original.toArray(x => Math.pow(x, 2));
    expect(result).toStrictEqual([1,4,9]);
});
