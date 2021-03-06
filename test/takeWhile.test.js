import '../src/takeWhile';
import { expectAsArray } from './utils';

test('TakeWhile', () => {
    expectAsArray([1,2,3,4,5,4,3,2,1].takeWhile(x => x < 5)).toStrictEqual([1,2,3,4]);
});
