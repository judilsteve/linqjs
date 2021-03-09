import { registerIterableExtension } from './registry.js';

function aggregateBy(iterable, keyProjection, seedProjection, accumulator, resultProjection) {
    const map = new Map();
    for(const element of iterable) {
        const key = keyProjection(element);
        let accumulatorForKey = map.has(key) ? map.get(key) : seedProjection(key, element);
        accumulatorForKey = accumulator(accumulatorForKey, element, key);
        map.set(key, accumulatorForKey);
    }
    if(resultProjection) {
        for(const [key, value] of map) {
            map.set(key, resultProjection(value, key));
        }
    }
    return map;
}
registerIterableExtension("aggregateBy", aggregateBy);
