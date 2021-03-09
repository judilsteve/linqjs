import { registerIterableExtension } from './registry.js';

function sum(iterable, projection) {
    let sum = 0;
    for(const element of iterable) {
        sum += projection ? projection(element) : element;
    }
    return sum;
}
registerIterableExtension("sum", sum);
