import { registerIterableExtension } from './registry.js';
import { allowsDirectAccess } from './internal/utils.js';

function* linqReverse(iterable) {
    let array;
    if(allowsDirectAccess(iterable)) {
        array = iterable;
    } else {
        array = [];
        let i = 0;
        for(const element of iterable) {
            array[i++] = element;
        }
    }
    for(let i = array.length - 1; i >= 0; i--) {
        yield array[i];
    }
}
registerIterableExtension("linqReverse", linqReverse);
