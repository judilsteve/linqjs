import { registerIterableExtension } from './registry';

function* append(iterable, ...elements) {
    yield* iterable;
    yield* elements;
}
registerIterableExtension("append", append);
