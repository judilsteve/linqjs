import { registerIterableExtension } from './registry';

function lastOrDefault(iterable, predicate, defaultValue) {
    let lastMatch = defaultValue;
    for(const element of iterable) {
        if(predicate ? predicate(element) : true) lastMatch = element;
    }
    return lastMatch;
}
registerIterableExtension("lastOrDefault", lastOrDefault);
