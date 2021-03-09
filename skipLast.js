import { registerIterableExtension } from './registry.js';
import { allowsDirectAccess } from './internal/utils.js';

function* skipLast(iterable, toSkip) {
    const array = allowsDirectAccess(iterable) ? iterable : new Array(...iterable);
    const stopIndex = array.length - toSkip;
    for(let i = 0; i < stopIndex; i++) {
        yield array[i];
    }
}
registerIterableExtension("skipLast", skipLast);
