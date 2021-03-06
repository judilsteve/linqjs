import { registerIterableExtension } from './registry';

function firstOrDefault(iterable, predicate, defaultValue) {
    for(const element of iterable) {
        if(predicate ? predicate(element) : true) return element;
    }
    return defaultValue;
}
registerIterableExtension("firstOrDefault", firstOrDefault);
