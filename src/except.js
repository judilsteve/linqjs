import { registerIterableExtension } from './registry';

function* except(iterable, ...toFilter) {
    if(!toFilter.length) {
        yield* iterable;
        return;
    }
    const allToRemove = new Set();
    for(const toFilterIterable of toFilter) {
        for (const element of toFilterIterable) {
            allToRemove.add(element);
        }
    }
    for(const element of iterable) {
        if(!allToRemove.has(element)) yield element;
    }
}
registerIterableExtension("except", except);
