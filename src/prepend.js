import { registerIterableExtension } from './registry';

function* prepend(iterable, ...elements) {
    yield* elements;
    yield* iterable;
}
registerIterableExtension("prepend", prepend);
