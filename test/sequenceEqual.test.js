import '../sequenceEqual';
import { generate, generateThenThrow } from './utils';

test('SequenceEqual: With matched lengths, equal', () => {
    expect([1,2,3].sequenceEqual([1,2,3])).toBe(true);
});

test('SequenceEqual: With matched lengths, not equal', () => {
    expect([1,2,3].sequenceEqual([1,2,3])).toBe(true);
});

test('SequenceEqual: With mismatched lengths', () => {
    const iterable = generateThenThrow([]);
    iterable.length = 5;
    expect([1,2,3].sequenceEqual(iterable)).toBe(false);
});

test('SequenceEqual: With unknown mismatched lengths', () => {
    expect([1,2,3,4].sequenceEqual(generate([1,2,3]))).toBe(false);
});

test('SequenceEqual: Not equal', () => {
    expect([1,2,3,4,5].sequenceEqual(generateThenThrow([1,2,3,5]))).toBe(false);
});

test('SequenceEqual', () => {
    expect([1,2,3].sequenceEqual(generate([1,2,3]))).toBe(true);
});
