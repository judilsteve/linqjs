import '../distinct';
import { expectAsArray } from './utils';

test('Distinct', () => {
    expectAsArray([1,1,2,1,3,4,2].distinct()).toStrictEqual([1,2,3,4]);
});
