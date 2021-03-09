import '../min';

test('Min: No elements, no projection', () => {
    expect([].min()).toBe(undefined);
});

test('Min: No elements', () => {
    expect([].min(x => x + 1)).toBe(undefined);
});

test('Min: No projection', () => {
    expect([2,1,4,3].min()).toBe(1);
});

test('Min', () => {
    expect([2,1,4,3].min(x => x + 1)).toBe(2);
});
