import '../src/toSet';
import { expectAsArray } from './utils';

test('ToSet: No elements, no projection', () => {
    expectAsArray([].toSet()).toStrictEqual([]);
});

test('ToSet: No projection', () => {
    expectAsArray([1,2,3,4,3].toSet()).toStrictEqual([1,2,3,4]);
});

test('ToSet: No elements', () => {
    expectAsArray([].toSet(x => x + 1)).toStrictEqual([]);
});

test('ToSet', () => {
    expectAsArray([1,2,3,4,3].toSet(x => x + 1)).toStrictEqual([2,3,4,5]);
});
