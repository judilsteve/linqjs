import { registerIterableExtension } from './registry';

function* zip(iterable, resultProjection, ...others) {
    const iterators = [iterable, ...others].map(i => i[Symbol.iterator]());
    while(true) {
        const results = new Array(iterators.length);
        for(var i = 0; i < iterators.length; i++) {
            const result = iterators[i].next();
            if(result.done) return;
            results[i] = result.value;
        }
        yield resultProjection ? resultProjection(...results) : results;
    }
}
registerIterableExtension("zip", zip);
