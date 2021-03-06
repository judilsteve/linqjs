import { registerIterable } from './registry';

export class OrderedIterable {
    constructor(iterable, sortProjection, isDescending) {
        this.array = new Array(iterable.length);
        let i = 0;
        for(const element of iterable) {
            this.array[i++] = element;
        }
        this.sortProjections = [{ sortProjection, isDescending }];
        this.sorted = false;
    }

    addSort(sortProjection, isDescending) {
        this.sortProjections.push({ sortProjection, isDescending });
        this.sorted = false;
    }

    [Symbol.iterator]() {
        if(!this.sorted) {
            const sortPredicate = (a, b) => {
                for(const sort of this.sortProjections) {
                    const { sortProjection, isDescending } = sort;
                    const aProjection = sortProjection(a);
                    const bProjection = sortProjection(b);
                    if(aProjection === bProjection) continue;
                    const comparisonResult = aProjection > bProjection ? 1 : -1;
                    return isDescending ? -1 * comparisonResult : comparisonResult;
                }
                return 0;
            }
            this.array.sort(sortPredicate);
            this.sorted = true;
        }
        return this.array.values();
    }
}
registerIterable("OrderedIterable", OrderedIterable.prototype);