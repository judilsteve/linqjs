import '../average';

test('Average: No elements, no projection', () => {
    expect(() => [].average()).toThrow('Sequence contained no elements');
});

test('Average: No elements', () => {
    expect(() => [].average(x => x + 1)).toThrow('Sequence contained no elements');
});

test('Average: No projection', () => {
    expect([2,1,4,3].average()).toBe(2.5);
});

test('Average', () => {
    expect([2,1,4,3].average(x => x + 1)).toBe(3.5);
});
