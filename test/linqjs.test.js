require('../src/linqjs');

test('First: No predicate', () => {
    expect([1,2,3].first()).toBe(1);
});

test('Aggregate: Accumulator only', () => {
    expect([1,2,3].aggregate((sum, next) => (sum ?? 0) + next)).toBe(6);
});