import '../src/chunkBy';
import '../src/select';
import { expectAsArray } from './utils';

test('ChunkBy: Empty input', () => {
    expectAsArray([].chunkBy(3).select(x => [...x])).toStrictEqual([]);
});

test('ChunkBy', () => {
    expectAsArray([1,2,3,4,5,6,7,8].chunkBy(3).select(x => [...x])).toStrictEqual([[1,2,3],[4,5,6],[7,8]]);
});
