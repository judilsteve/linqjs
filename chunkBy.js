import { registerIterableExtension } from './registry.js';

function* getChunk(iterator, chunkSize, outResult) {
    let toYield = chunkSize;
    do {
        yield outResult.value;
        toYield--;
        const result = iterator.next();
        outResult.done = result.done;
        outResult.value = result.value;
    } while(toYield && !outResult.done)
}

function* chunkBy(iterable, chunkSize) {
    const iterator = iterable[Symbol.iterator]();
    let result = iterator.next();
    while(!result.done) {
        yield getChunk(iterator, chunkSize, result);
    }
}
registerIterableExtension("chunkBy", chunkBy);
