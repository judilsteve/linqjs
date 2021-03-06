import { registerIterableExtension } from './registry';

function* take(iterable, toTake) {
    for(const element of iterable) {
        if(toTake--) yield element;
        else break;
    }
}
registerIterableExtension("take", take);
