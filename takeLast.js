import { registerIterableExtension } from './registry.js';
import { allowsDirectAccess } from './internal/utils.js';

function* takeLast(iterable, toTake) {
    const array = allowsDirectAccess(iterable) ? iterable : new Array(...iterable);
    const startIndex = Math.max(array.length - toTake, 0);
    for(let i = startIndex; i < array.length; i++) {
        yield array[i];
    }
}
registerIterableExtension("takeLast", takeLast);
