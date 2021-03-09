import { registerIterableExtension } from './registry.js';

function* skipWhile(iterable, predicate) {
    let skipping = true;
    for(const element of iterable) {
        skipping &&= predicate(element);
        if(!skipping) yield element;
    }
}
registerIterableExtension("skipWhile", skipWhile);
