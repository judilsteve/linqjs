import '../src/linqJoin';
import '../src/orderBy';
import '../src/thenBy';
import { expectAsArray, generate } from './utils';

test('LinqJoin: With lengths, shortest first', () => {
    expectAsArray([
        {a: 1, b: 3},
        {a: 2, b: 1},
        {a: 3, b: 2},
        {a: 4, b: 2},
        {a: 5, b: 4}
    ].linqJoin([
        {b: 1, c: 1},
        {b: 2, c: 2},
        {b: 3, c: 3},
        {b: 3, c: 4},
        {b: 6, c: 5},
        {b: 7, c: 6}
    ], x => x.b, x => x.b, (x, y) => ({a: x.a, c: y.c}))
    .orderBy(x => x.a)
    .thenBy(x => x.c))
    .toStrictEqual([
        {a: 1, c: 3},
        {a: 1, c: 4},
        {a: 2, c: 1},
        {a: 3, c: 2},
        {a: 4, c: 2}
    ]);
});

test('LinqJoin: With lengths, longest first', () => {
    expectAsArray([
        {b: 1, c: 1},
        {b: 2, c: 2},
        {b: 3, c: 3},
        {b: 3, c: 4},
        {b: 6, c: 5},
        {b: 7, c: 6}
    ].linqJoin([
        {a: 1, b: 3},
        {a: 2, b: 1},
        {a: 3, b: 2},
        {a: 4, b: 2},
        {a: 5, b: 4}
    ], x => x.b, x => x.b, (x, y) => ({a: y.a, c: x.c}))
    .orderBy(x => x.a)
    .thenBy(x => x.c))
    .toStrictEqual([
        {a: 1, c: 3},
        {a: 1, c: 4},
        {a: 2, c: 1},
        {a: 3, c: 2},
        {a: 4, c: 2}
    ]);
});

test('LinqJoin', () => {
    expectAsArray(generate([
        {a: 1, b: 3},
        {a: 2, b: 1},
        {a: 3, b: 2},
        {a: 4, b: 2},
        {a: 5, b: 4}
    ]).linqJoin(generate([
        {b: 1, c: 1},
        {b: 2, c: 2},
        {b: 3, c: 3},
        {b: 3, c: 4},
        {b: 6, c: 5},
        {b: 7, c: 6}
    ]), x => x.b, x => x.b, (x, y) => ({a: x.a, c: y.c}))
    .orderBy(x => x.a)
    .thenBy(x => x.c))
    .toStrictEqual([
        {a: 1, c: 3},
        {a: 1, c: 4},
        {a: 2, c: 1},
        {a: 3, c: 2},
        {a: 4, c: 2}
    ]);
});
