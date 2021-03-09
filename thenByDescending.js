import { registerIterableExtension } from './registry.js';

function thenByDescending(orderedIterable, sortProjection) {
    orderedIterable.addSort(sortProjection, true);
    return orderedIterable;
}
registerIterableExtension("thenByDescending", thenByDescending);