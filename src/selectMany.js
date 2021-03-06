import { registerIterableExtension } from './registry';

function* selectMany(iterable, projection) {
    for(const element of iterable) {
        yield* (projection ? projection(element) : element);
    }
}
registerIterableExtension("selectMany", selectMany);
registerIterableExtension("linqConcat", (...iterables) => selectMany(iterables)); // TODO This shouldn't be here
