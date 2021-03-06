import { registerIterableExtension } from './registry';
import './groupBy'; // TODO This should not be here

function* groupJoin(iterable, other, keyProjection, otherKeyProjection, resultProjection) {
    const grouped = other.groupBy(otherKeyProjection);
    for(const element of iterable) {
        const key = keyProjection(element);
        if(!grouped.has(key)) continue;
        yield resultProjection(element, grouped.get(key));
    }
}
registerIterableExtension("groupJoin", groupJoin);
