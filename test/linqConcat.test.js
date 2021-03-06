import '../src/linqConcat';
import { expectAsArray } from './utils';

test('LinqConcat: Empty source, single empty argument', () => {
    expectAsArray([].linqConcat([])).toStrictEqual([]);
});

test('LinqConcat: Empty source, multiple empty arguments', () => {
    expectAsArray([].linqConcat([],[])).toStrictEqual([]);
});

test('LinqConcat: Single empty argument', () => {
    expectAsArray([1,2,3].linqConcat([])).toStrictEqual([1,2,3]);
});

test('LinqConcat: Multiple empty arguments', () => {
    expectAsArray([1,2,3].linqConcat([],[])).toStrictEqual([1,2,3]);
});

test('LinqConcat: Single argument', () => {
    expectAsArray([1,2,3].linqConcat([4,5])).toStrictEqual([1,2,3,4,5]);
});

test('LinqConcat', () => {
    expectAsArray([1,2,3].linqConcat([4,5],[6,7])).toStrictEqual([1,2,3,4,5,6,7]);
});
