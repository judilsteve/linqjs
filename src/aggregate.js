import { registerIterableExtension } from './registry';

function aggregate(iterable, accumulator, seed, resultProjection) {
    let accumulatorValue = seed;
    for(const element of iterable) {
        accumulatorValue = accumulator(accumulatorValue, element);
    }
    return resultProjection ? resultProjection(accumulatorValue) : accumulatorValue;
}
registerIterableExtension("aggregate", aggregate);
