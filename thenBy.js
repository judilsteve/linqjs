import { registerIterableExtension } from './registry.js';

function thenBy(orderedIterable, sortProjection) {
    orderedIterable.addSort(sortProjection, false);
    return orderedIterable;
}
registerIterableExtension("thenBy", thenBy);
