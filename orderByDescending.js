import { registerIterableExtension } from './registry.js';
import { OrderedIterable } from './orderedIterable.js';

function orderByDescending(iterable, sortProjection) {
    return new OrderedIterable(iterable, sortProjection, true);
}
registerIterableExtension("orderByDescending", orderByDescending);