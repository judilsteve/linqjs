import { registerIterableExtension } from './registry';

function min(iterable, projection) {
    let min;
    for(const element of iterable) {
        const number = projection ? projection(element) : element;
        if(min === undefined || number < min) min = number;
    }
    return min;
}
registerIterableExtension("min", min);
