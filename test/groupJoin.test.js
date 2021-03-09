import '../groupJoin';
import '../orderBy';
import { expectAsArray } from './utils';

test('GroupJoin', () => {
    expectAsArray([
        {a: 1, b: 3},
        {a: 2, b: 1},
        {a: 3, b: 2},
        {a: 4, b: 2},
        {a: 5, b: 4}
    ].groupJoin([
        {b: 1, c: 1},
        {b: 2, c: 2},
        {b: 3, c: 3},
        {b: 3, c: 4},
        {b: 6, c: 5},
        {b: 7, c: 6}
    ], x => x.b, x => x.b, (x, ys) => ({a: x.a, cs: ys.map(y => y.c).sort()}))
    .orderBy(x => x.a))
    .toStrictEqual([
        {a: 1, cs: [3,4]},
        {a: 2, cs: [1]},
        {a: 3, cs: [2]},
        {a: 4, cs: [2]}
    ]);
});
