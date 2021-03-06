import { registerIterableExtension } from './registry';

function last(iterable, predicate) {
    let gotMatch = false;
    let lastMatch;
    for(const element of iterable) {
        if(predicate ? predicate(element) : true) {
            lastMatch = element;
            gotMatch = true;
        }
    }
    if(!gotMatch) throw new Error('Sequence contained no elements');
    return lastMatch;
}
registerIterableExtension("last", last);
