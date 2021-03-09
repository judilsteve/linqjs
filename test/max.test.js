import '../max';

test('Max: No elements, no projection', () => {
    expect([].max()).toBe(undefined);
});

test('Max: No elements', () => {
    expect([].max(x => x + 1)).toBe(undefined);
});

test('Max: No projection', () => {
    expect([1,2,4,3].max()).toBe(4);
});

test('Max', () => {
    expect([1,2,4,3].max(x => x + 1)).toBe(5);
});
