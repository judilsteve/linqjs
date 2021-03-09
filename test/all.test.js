import '../all';

test('All: No elements', () => {
    expect([].all(x => x % 2 === 0)).toBe(true);
});

test('All: Mismatch', () => {
    expect([{val: 2}, {val: 4}, {val: 5}, null].all(x => x.val % 2 === 0)).toBe(false);
});

test('All', () => {
    expect([2,4,6,8].all(x => x % 2 === 0)).toBe(true);
});
