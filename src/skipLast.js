import { registerIterableExtension } from './registry';
import { allowsDirectAccess } from './utils';
import './toArray' // TODO This does not belong here

function* skipLast(iterable, toSkip) {
    const array = allowsDirectAccess(iterable) ? iterable : iterable.toArray();
    const stopIndex = array.length - toSkip;
    for(let i = 0; i < stopIndex; i++) {
        yield array[i];
    }
}
registerIterableExtension("skipLast", skipLast);
