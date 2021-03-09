import { registerIterableExtension } from './registry.js';

function* prepend(iterable, ...elements) {
    yield* elements;
    yield* iterable;
}
registerIterableExtension("prepend", prepend);
