import { registerIterableExtension } from './registry.js';
import { OrderedIterable } from './orderedIterable.js';

function orderBy(iterable, sortProjection) {
    return new OrderedIterable(iterable, sortProjection, false);
}
registerIterableExtension("orderBy", orderBy);
