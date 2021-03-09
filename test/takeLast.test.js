import '../takeLast';
import { expectAsArray, generate } from './utils';

test('TakeLast: Direct access, Take whole sequence', () => {
    expectAsArray([1,2,3].takeLast(4)).toStrictEqual([1,2,3]);
});

test('TakeLast: Direct access', () => {
    expectAsArray([1,2,3].takeLast(2)).toStrictEqual([2,3]);
});

test('TakeLast: Take whole sequence', () => {
    expectAsArray(generate([1,2,3]).takeLast(4)).toStrictEqual([1,2,3]);
});

test('TakeLast', () => {
    expectAsArray(generate([1,2,3]).takeLast(2)).toStrictEqual([2,3]);
});
