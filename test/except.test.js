import '../except';
import { expectAsArray } from './utils';

test('Except: No sequences', () => {
    expectAsArray([1,1,2,3].except()).toStrictEqual([1,1,2,3]);
});

test('Except', () => {
    expectAsArray([1,1,2,3,4,5,6,7,6,8].except([1,3], [6,5])).toStrictEqual([2,4,7,8]);
});
