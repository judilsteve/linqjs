import '../where';
import { expectAsArray } from './utils';

test('Where: No elements', () => {
    expectAsArray([].where(x => x)).toStrictEqual([]);
});

test('Where: Basic predicate', () => {
    expectAsArray([1,2,3,4,5].where(x => x % 2)).toStrictEqual([1,3,5]);
});

test('Where: Indexed predicate', () => {
    expectAsArray([1,2,3,4,5].where((x, i) => x % 2 && i < 4)).toStrictEqual([1,3]);
});