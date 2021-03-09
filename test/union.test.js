import '../union.js';
import { expectAsArray } from './utils';

test('Union: Empty sequences', () => {
    expectAsArray([].union([], [])).toStrictEqual([]);
});

test('Union', () => {
    expectAsArray([1,1,2].union([3,3,4], [2,3,1,5])).toStrictEqual([1,2,3,4,5]);
});
