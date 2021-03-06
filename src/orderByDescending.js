import { registerIterableExtension } from './registry';
import { OrderedIterable } from './orderedIterable';

function orderByDescending(iterable, sortProjection) {
    return new OrderedIterable(iterable, sortProjection, true);
}
registerIterableExtension("orderByDescending", orderByDescending);