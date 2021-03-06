import { registerIterableExtension } from './registry';

function contains(iterable, toFind) {
    if(iterable instanceof Set) return iterable.has(toFind);
    for(const element of iterable) {
        if(element === toFind) return true;
    }
    return false;
}
registerIterableExtension("contains", contains);
