import '../orderBy';
import { expectAsArray } from './utils';

test('OrderBy', () => {
    expectAsArray([3,2,1].orderBy(x => x)).toStrictEqual([1,2,3]);
});
