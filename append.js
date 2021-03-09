import { registerIterableExtension } from './registry.js';

function* append(iterable, ...elements) {
    yield* iterable;
    yield* elements;
}
registerIterableExtension("append", append);
