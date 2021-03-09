import '../orderByDescending';
import { expectAsArray } from './utils';

test('OrderByDescending', () => {
    expectAsArray([1,2,3].orderByDescending(x => x)).toStrictEqual([3,2,1]);
});
