import { registerIterableExtension } from './registry.js';

function count(iterable, predicate) {
    if(iterable.length !== undefined && !predicate) return iterable.length;
    let count = 0;
    for(const element of iterable) {
        if(predicate ? predicate(element) : true) count++;
    }
    return count;
}
registerIterableExtension("count", count);
