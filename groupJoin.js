import { registerIterableExtension } from './registry.js';
import { groupBy } from './internal/groupBy.js';;

function* groupJoin(iterable, other, keyProjection, otherKeyProjection, resultProjection) {
    const grouped = groupBy(other, otherKeyProjection);
    for(const element of iterable) {
        const key = keyProjection(element);
        if(!grouped.has(key)) continue;
        yield resultProjection(element, grouped.get(key));
    }
}
registerIterableExtension("groupJoin", groupJoin);
