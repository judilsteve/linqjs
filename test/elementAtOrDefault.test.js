import '../src/elementAtOrDefault';
import { generate, generateThenThrow } from './utils';

test('ElementAtOrDefault: With length, index past end', () => {
    expect([1,2,3].elementAtOrDefault(3, 'default')).toBe('default');
});

test('ElementAtOrDefault: With length', () => {
    expect([1,2,3].elementAtOrDefault(1, 'default')).toBe(2);
});

test('ElementAtOrDefault: Index past end', () => {
    expect(generate([1,2,3]).elementAtOrDefault(3, 'default')).toBe('default');
});

test('ElementAtOrDefault', () => {
    expect(generateThenThrow([1,2,3]).elementAtOrDefault(2, 'default')).toBe(3);
});
