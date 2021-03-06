import { registerIterableExtension } from './registry.js';

function* defaultIfEmpty(iterable, defaultValue) {
    let anyElements = false;
    for(const element of iterable) {
        yield element;
        anyElements = true;
    }
    if(!anyElements) yield defaultValue;
}
registerIterableExtension("defaultIfEmpty", defaultIfEmpty);
