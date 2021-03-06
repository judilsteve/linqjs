import '../src/zip';
import { expectAsArray } from './utils';

test('Zip: No result projection', () => {
    expectAsArray([1,2,3].zip(null, [3,2,1])).toStrictEqual([[1,3],[2,2],[3,1]]);
});

test('Zip: Unequal sequence lengths', () => {
    expectAsArray([1,2,3].zip((x, y, z) => x + y + z, [2,3,4], [3,4])).toStrictEqual([6,9]);
});

test('Zip', () => {
    expectAsArray([1,2,3].zip((x, y, z) => x + y + z, [2,3,4], [3,4,5])).toStrictEqual([6,9,12]);
});
