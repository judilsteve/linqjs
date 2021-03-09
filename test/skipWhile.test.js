import '../skipWhile';
import { expectAsArray } from './utils';

test('SkipWhile', () => {
    expectAsArray([1,2,3,4,5,4,3,2,1].skipWhile(x => x < 3)).toStrictEqual([3,4,5,4,3,2,1]);
});
