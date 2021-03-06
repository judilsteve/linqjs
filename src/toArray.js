import { registerIterableExtension } from './registry';

function toArray(iterable, projection) {
    const array = new Array(iterable.length);
    let i = 0;
    for(const element of iterable) {
        array[i++] = projection ? projection(element) : element;
    }
    return array;
}
registerIterableExtension("toArray", toArray);
