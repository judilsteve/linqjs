import '../prepend';
import { expectAsArray } from './utils';

test('Prepend', () => {
    expectAsArray([1,2,3].prepend(4,5)).toStrictEqual([4,5,1,2,3]);
});
