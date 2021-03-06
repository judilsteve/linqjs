import '../src/thenByDescending';
import '../src/orderBy';
import '../src/orderByDescending';
import { expectAsArray } from './utils';

test('ThenByDescending: Descending first', () => {
    expectAsArray(
        [{a: 1, b: 1}, {a:2, b: 1}, {a: 2, b: 2}]
        .orderByDescending(x => x.a)
        .thenByDescending(x => x.b))
    .toStrictEqual([{a: 2, b: 2}, {a: 2, b: 1}, {a: 1, b: 1}]);
});

test('ThenByDescending', () => {
    expectAsArray(
        [{a: 2, b: 1}, {a:1, b: 1}, {a: 1, b: 2}]
        .orderBy(x => x.a)
        .thenByDescending(x => x.b))
    .toStrictEqual([{a: 1, b: 2}, {a: 1, b: 1}, {a: 2, b: 1}]);
});
