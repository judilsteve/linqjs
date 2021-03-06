import { registerIterableExtension } from './registry';

function* union(...iterables) {
    const allElements = new Set();
    for(const iterable of iterables) {
        for(const element of iterable) {
            if(!allElements.has(element)) {
                yield element;
                allElements.add(element);
            }
        }
    }
}
registerIterableExtension("union", union);
registerIterableExtension("distinct", iterable => union(iterable)); // TODO This does not belong here
