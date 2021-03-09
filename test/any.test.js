import '../any';

test('Any: No elements, no predicate', () => {
    expect([].any()).toBe(false);
});

test('Any: No elements', () => {
    expect([].any(x => x === 42)).toBe(false);
});

test('Any: No predicate', () => {
    expect([1,2,3].any()).toBe(true);
});

test('Any: No match', () => {
    expect([1,2,3].any(x => x === 42)).toBe(false);
});

test('Any', () => {
    expect([{val: 1}, {val: 2}, {val: 42}, null].any(x => x.val === 42)).toBe(true);
});
