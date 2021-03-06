import { registerIterableExtension } from './registry';

function all(iterable, predicate) {
    for(const element of iterable) {
        if(!predicate(element)) return false;
    }
    return true;
}
registerIterableExtension("all", all);
