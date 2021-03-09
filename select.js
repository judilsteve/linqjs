import { registerIterableExtension } from './registry.js';

function* select(iterable, projection) {
    let i = 0;
    for(const element of iterable) yield projection(element, i++);
}
registerIterableExtension("select", select);
