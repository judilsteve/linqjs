import { registerIterableExtension } from './registry';

function singleOrDefault(iterable, predicate, defaultValue) {
    let foundElement = false;
    let firstElement = defaultValue;
    for(const element of iterable) {
        if(predicate ? predicate(element) : true) {
            if(foundElement) throw new Error('Sequence contained more than one element');
            foundElement = true;
            firstElement = element;
        }
    }
    return firstElement;
}
registerIterableExtension("singleOrDefault", singleOrDefault);
