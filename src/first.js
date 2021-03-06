import { registerIterableExtension } from './registry';

function first(iterable, predicate) {
    for(const element of iterable) {
        if(predicate ? predicate(element) : true) return element;
    }
    throw new Error('Sequence contained no elements');
}
registerIterableExtension("first", first);
