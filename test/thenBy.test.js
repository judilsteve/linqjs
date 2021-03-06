import '../src/thenBy';
import '../src/orderBy';
import '../src/orderByDescending';
import { expectAsArray } from './utils';

test('ThenBy: Descending first', () => {
    expectAsArray(
        [{a: 1, b: 1}, {a:2, b: 1}, {a: 2, b: 2}]
        .orderByDescending(x => x.a)
        .thenBy(x => x.b))
    .toStrictEqual([{a: 2, b: 1}, {a: 2, b: 2}, {a: 1, b: 1}]);
});

test('ThenBy', () => {
    expectAsArray(
        [{a: 2, b: 1}, {a:1, b: 2}, {a: 1, b: 1}]
        .orderBy(x => x.a)
        .thenBy(x => x.b))
    .toStrictEqual([{a: 1, b: 1}, {a: 1, b: 2}, {a: 2, b: 1}]);
});
