import '../intersect';
import { expectAsArray } from './utils';

test('Intersect: Single sequence', () => {
    expectAsArray([1,1,2,3].intersect()).toStrictEqual([1,2,3]);
});

test('Intersect: Two sequences', () => {
    expectAsArray([1,1,2,3].intersect([1,3,5])).toStrictEqual([1,3]);
});

test('Intersect', () => {
    expectAsArray([1,1,2,3].intersect([1,3,5], [1,5,6])).toStrictEqual([1]);
});
