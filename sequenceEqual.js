import { registerIterableExtension } from './registry.js';

function sequenceEqual(iterable, other) {
    if(iterable.length !== undefined && other.length !== undefined && iterable.length !== other.length) return false;
    const iterator = iterable[Symbol.iterator]();
    const otherIterator = other[Symbol.iterator]();
    while(true) {
        const result = iterator.next();
        const otherResult = otherIterator.next();
        if(result.done || otherResult.done) return result.done === otherResult.done;
        if(result.value !== otherResult.value) return false;
    }
}
registerIterableExtension("sequenceEqual", sequenceEqual);
