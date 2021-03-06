import { registerIterableExtension } from './registry';

function* takeWhile(iterable, predicate) {
    for(const element of iterable) {
        if(!predicate(element)) break;
        yield element;
    }
}
registerIterableExtension("takeWhile", takeWhile);
