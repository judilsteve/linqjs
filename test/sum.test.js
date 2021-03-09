import '../sum';

test('Sum: No elements, no projection', () => {
    expect([].sum()).toBe(0);
});

test('Sum: No elements', () => {
    expect([].sum(x => x + 1)).toBe(0);
});

test('Sum: No projection', () => {
    expect([2,1,4,3].sum()).toBe(10);
});

test('Sum', () => {
    expect([2,1,4,3].sum(x => x + 1)).toBe(14);
});
