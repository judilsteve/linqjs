import { registerIterableExtension } from './registry';
import { groupBy } from './internal/groupBy';

function* linqJoin(iterable, other, keyProjection, otherKeyProjection, resultProjection) {
    // If we can determine the lengths of the sequences
    // we can optimise memory usage by making our temporary data structure out of the smaller one
    let smaller, larger, smallerKeyProjection, largerKeyProjection, orderedResultProjection;
    if(iterable.length !== undefined && other.length !== undefined && iterable.length > other.length) {
        smaller = other;
        larger = iterable;
        smallerKeyProjection = otherKeyProjection;
        largerKeyProjection = keyProjection;
        // Need to swap these
        orderedResultProjection = (a, b) => resultProjection(b, a);
    } else {
        smaller = iterable;
        larger = other;
        smallerKeyProjection = keyProjection;
        largerKeyProjection = otherKeyProjection;
        orderedResultProjection = resultProjection;
    }

    const grouped = groupBy(smaller, smallerKeyProjection);
    for(const element of larger) {
        const key = largerKeyProjection(element);
        if(!grouped.has(key)) continue;
        for(const matchingElement of grouped.get(key)) {
            yield orderedResultProjection(matchingElement, element);
        }
    }
}
registerIterableExtension("linqJoin", linqJoin);
