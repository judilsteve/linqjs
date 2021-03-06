import '../src/selectMany';
import { expectAsArray } from './utils';

test('SelectMany: No elements, no projection', () => {
    expectAsArray([].selectMany()).toStrictEqual([]);
});

test('SelectMany: No elements', () => {
    expectAsArray([].selectMany(x => [x,x])).toStrictEqual([]);
});

test('SelectMany: No projection', () => {
    expectAsArray([[1,2],[3,[4]]].selectMany()).toStrictEqual([1,2,3,[4]]);
});

test('SelectMany', () => {
    expectAsArray([1,2,3,4].selectMany(x => [x,x])).toStrictEqual([1,1,2,2,3,3,4,4]);
});
