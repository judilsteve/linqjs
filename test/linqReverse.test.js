import '../linqReverse';
import { expectAsArray, generate } from './utils';

test('LinqReverse: Direct access', () => {
    expectAsArray([1,2,3].linqReverse()).toStrictEqual([3,2,1]);
});

test('LinqReverse', () => {
    expectAsArray(generate([1,2,3]).linqReverse()).toStrictEqual([3,2,1]);
});
