import '../src/skipLast';
import { expectAsArray, generate } from './utils';

test('SkipLast: Direct access, skip whole sequence', () => {
    expectAsArray([1,2,3].skipLast(4)).toStrictEqual([]);
});

test('SkipLast: Direct access', () => {
    expectAsArray([1,2,3].skipLast(1)).toStrictEqual([1,2]);
});

test('SkipLast: Skip whole sequence', () => {
    expectAsArray(generate([1,2,3]).skipLast(4)).toStrictEqual([]);
});

test('SkipLast', () => {
    expectAsArray(generate([1,2,3]).skipLast(1)).toStrictEqual([1,2]);
});
