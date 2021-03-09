import { registerIterableExtension } from './registry.js';

function single(iterable, predicate) {
    let foundElement = false;
    let firstElement;
    for(const element of iterable) {
        if(predicate ? predicate(element) : true) {
            if(foundElement) throw new Error('Sequence contained more than one element');
            foundElement = true;
            firstElement = element;
        }
    }
    if(!foundElement) throw new Error('Sequence contained no elements');
    else return firstElement;
}
registerIterableExtension("single", single);
