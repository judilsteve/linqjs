import { registerIterableExtension } from './registry';

function max(iterable, projection) {
    let max;
    for(const element of iterable) {
        const number = projection ? projection(element) : element;
        if(max === undefined || number > max) max = number;
    }
    return max;
}
registerIterableExtension("max", max);
