import { registerIterableExtension } from './registry';

function toMap(iterable, keyProjection, valueProjection) {
    const map = new Map();
    for(const element of iterable) {
        map.set(keyProjection(element), valueProjection ? valueProjection(element) : element);
    }
    return map;
}
registerIterableExtension("toMap", toMap);
