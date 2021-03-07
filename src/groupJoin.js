import { registerIterableExtension } from './registry';
import { groupBy } from './internal/groupBy';

function* groupJoin(iterable, other, keyProjection, otherKeyProjection, resultProjection) {
    const grouped = groupBy(other, otherKeyProjection);
    for(const element of iterable) {
        const key = keyProjection(element);
        if(!grouped.has(key)) continue;
        yield resultProjection(element, grouped.get(key));
    }
}
registerIterableExtension("groupJoin", groupJoin);
