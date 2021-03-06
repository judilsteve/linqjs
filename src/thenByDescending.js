import { registerIterableExtension } from './registry';

function thenByDescending(orderedIterable, sortProjection) {
    orderedIterable.addSort(sortProjection, true);
    return orderedIterable;
}
registerIterableExtension("thenByDescending", thenByDescending);