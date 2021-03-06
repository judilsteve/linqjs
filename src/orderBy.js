import { registerIterableExtension } from './registry';
import { OrderedIterable } from './orderedIterable';

function orderBy(iterable, sortProjection) {
    return new OrderedIterable(iterable, sortProjection, false);
}
registerIterableExtension("orderBy", orderBy);
