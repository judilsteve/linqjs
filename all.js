import { registerIterableExtension } from './registry.js';

function all(iterable, predicate) {
    for(const element of iterable) {
        if(!predicate(element)) return false;
    }
    return true;
}
registerIterableExtension("all", all);
