import '../src/elementAt';
import { generate, generateThenThrow } from './utils';

test('ElementAt: With length, index past end', () => {
    expect(() => [1,2,3].elementAt(3)).toThrow('Index was beyond the end of the sequence');
});

test('ElementAt: With length', () => {
    expect([1,2,3].elementAt(1)).toBe(2);
});

test('ElementAt: Index past end', () => {
    expect(() => generate([1,2,3]).elementAt(3)).toThrow('Index was beyond the end of the sequence');
});

test('ElementAt', () => {
    expect(generateThenThrow([1,2,3]).elementAt(2)).toBe(3);
});
