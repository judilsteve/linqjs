import '../select';
import { expectAsArray } from './utils';

test('Select: No elements', () => {
    expectAsArray([].select(x => Math.pow(x, 2))).toStrictEqual([]);
});

test('Select: Basic projection', () => {
    expectAsArray([1,2,3].select(x => Math.pow(x, 2))).toStrictEqual([1,4,9]);
});

test('Select: Indexed projection', () => {
    expectAsArray([1,2,3].select((x, i) => Math.pow(x, 2) + i)).toStrictEqual([1,5,11]);
});
