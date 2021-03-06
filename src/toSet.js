import { registerIterableExtension } from './registry';

function toSet(iterable, projection) {
    const set = new Set();
    for(const element of iterable) {
        set.add(projection ? projection(element) : element)
    };
    return set;
}
registerIterableExtension("toSet", toSet);
