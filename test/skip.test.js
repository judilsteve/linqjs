import '../src/skip';
import { generate } from './utils';
import { expectAsArray } from './utils';

test('Skip: Direct access', () => {
    expectAsArray([1,2,3,4,5].skip(2)).toStrictEqual([3,4,5]);
});

test('Skip: Direct access, skip whole sequence', () => {
    expectAsArray([1,2,3,4,5].skip(5)).toStrictEqual([]);
});

test('Skip: Direct access, skip past whole sequence', () => {
    expectAsArray([1,2,3,4,5].skip(100)).toStrictEqual([]);
});

test('Skip: Direct access, empty sequence', () => {
    expectAsArray([].skip(100)).toStrictEqual([]);
});

test('Skip', () => {
    expectAsArray(generate([1,2,3,4,5]).skip(2)).toStrictEqual([3,4,5]);
});

test('Skip: Skip whole sequence', () => {
    expectAsArray(generate([1,2,3,4,5]).skip(5)).toStrictEqual([]);
});

test('Skip: Skip past whole sequence', () => {
    expectAsArray(generate([1,2,3,4,5]).skip(100)).toStrictEqual([]);
});

test('Skip: Empty sequence', () => {
    expectAsArray(generate([]).skip(100)).toStrictEqual([]);
});
