import { registerIterableExtension } from './registry';
import { allowsDirectAccess } from './utils';
import './toArray' // TODO This does not belong here

function* takeLast(iterable, toTake) {
    const array = allowsDirectAccess(iterable) ? iterable : iterable.toArray();
    const startIndex = Math.max(array.length - toTake, 0);
    for(let i = startIndex; i < array.length; i++) {
        yield array[i];
    }
}
registerIterableExtension("takeLast", takeLast);
