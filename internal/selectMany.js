export function* selectMany(iterable, projection) {
    for(const element of iterable) {
        yield* (projection ? projection(element) : element);
    }
}