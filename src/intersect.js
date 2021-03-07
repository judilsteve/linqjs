import { registerIterableExtension } from './registry';

function* intersect(...iterables) {
    if(iterables.length === 0) return;
    else if(iterables.length === 1) {
        yield* new Set(iterables[0]);
        return;
    } else if(iterables.length === 2) {
        const set = new Set(iterables[0]);
        for(const element of iterables[1]) {
            if(set.has(element)) yield element;
        }
        return;
    }
    const appearanceMap = new Map();
    for(const iterable of iterables) {
        for(const element of iterable) {
            const appearances = appearanceMap.has(element) ? appearanceMap.get(element) : new Set();
            appearances.add(iterable);
            appearanceMap.set(element, appearances);
        }
    }
    for(const [element, appearances] of appearanceMap) {
        if(appearances.size === iterables.length) yield element;
    }
}
registerIterableExtension("intersect", intersect);
