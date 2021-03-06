import '../src/defaultIfEmpty';
import { expectAsArray } from './utils';

test('DefaultIfEmpty: Empty', () => {
    expectAsArray([].defaultIfEmpty('default')).toStrictEqual(['default']);
});

test('DefaultIfEmpty', () => {
    expectAsArray([1,2,3].defaultIfEmpty('default')).toStrictEqual([1,2,3]);
});
