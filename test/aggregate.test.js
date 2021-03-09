import '../aggregate';

test('Aggregate: No seed, no result projection', () => {
    expect([1,2,3].aggregate((sum, next) => (sum ?? 0) + next)).toBe(6);
});

test('Aggregate: No result projection', () => {
    expect([1,2,3].aggregate((sum, next) => sum + next, 0)).toBe(6);
});

test('Aggregate', () => {
    expect([1,2,3].aggregate((sum, next) => sum + next, 0, x => x + 2)).toBe(8);
});
