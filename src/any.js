import { registerIterableExtension } from './registry';

function any(iterable, predicate) {
    for(const element of iterable) {
        if(predicate ? predicate(element) : true) return true;
    }
    return false;
}
registerIterableExtension("any", any);
