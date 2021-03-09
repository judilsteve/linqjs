import '../count';
import { generate } from './utils';

test('Count: Empty sequence, no predicate, length property', () => {
    expect([].count()).toBe(0);
});

test('Count: Empty sequence, length property', () => {
    expect([].count(x => x === 42)).toBe(0);
});

test('Count: No predicate, length property', () => {
    expect([5,5,5].count()).toBe(3);
});

test('Count: Length property', () => {
    expect([5,4,4].count(x => x < 5)).toBe(2);
});

test('Count: Empty sequence, no predicate', () => {
    expect(generate([]).count()).toBe(0);
});

test('Count: Empty sequence', () => {
    expect(generate([]).count(x => x === 42)).toBe(0);
});

test('Count', () => {
    expect(generate([5,4,4]).count(x => x < 5)).toBe(2);
});
