import '../src/take';
import { expectAsArray } from './utils';

test('Take: Take whole sequence', () => {
    expectAsArray([1,2,3].take(3)).toStrictEqual([1,2,3]);
});

test('Take: Take past whole sequence', () => {
    expectAsArray([1,2,3].take(100)).toStrictEqual([1,2,3]);
});

test('Take: Empty sequence', () => {
    expectAsArray([].take(100)).toStrictEqual([]);
});

test('Take', () => {
    expectAsArray([1,2,3,4,5].take(3)).toStrictEqual([1,2,3]);
});
