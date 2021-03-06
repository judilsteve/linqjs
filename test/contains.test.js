import '../src/contains';
import { generateThenThrow } from './utils';

test('Contains: No elements', () => {
    expect([].contains(1)).toBe(false);
});

test('Contains: No match', () => {
    expect([2,3].contains(1)).toBe(false);
});

test('Contains', () => {
    expect(generateThenThrow([2,3,1]).contains(1)).toBe(true);
});
