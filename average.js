import { registerIterableExtension } from './registry.js';

function average(iterable, projection) {
    let sum = 0;
    let count = 0;
    for(const element of iterable) {
        sum += projection ? projection(element) : element;
        count++;
    }
    if(count === 0) throw new Error('Sequence contained no elements');
    return sum / count;
}
registerIterableExtension("average", average);
