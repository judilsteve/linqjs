import '../append';
import { expectAsArray } from './utils';

test('Append', () => {
    expectAsArray([1,2,3].append(4,5)).toStrictEqual([1,2,3,4,5]);
});
