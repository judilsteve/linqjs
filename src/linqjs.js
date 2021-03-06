class OrderedIterable {
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

// These don't exist in the global namespace
const Generator = Object.getPrototypeOf(function* () {});

const iterablePrototypes = [
    { protoName: 'Array', proto: Array.prototype },
    { protoName: 'String', proto: String.prototype },
    { protoName: 'NodeList', proto: NodeList.prototype },
    { protoName: 'Map', proto: Map.prototype },
    { protoName: 'Set', proto: Set.prototype },
    { protoName: 'Generator', proto: Generator.prototype },
    { protoName: 'OrderedIterable', proto: OrderedIterable.prototype }
];

const extensions = [];

function extend(protoName, proto, funcName, func) {
    if(proto[funcName]) {
        throw new Error(`Cannot add extension method '${funcName}' to prototype ${protoName} as it already has this property defined`);
    }
    Object.defineProperty(proto, funcName, {
        writable: false,
        value: function(...args) { 
            // The commented code below would be preferred, but there is currently
            // a bug in babel, so it transpiles to code that causes infinite recursion.
            // return func(this, ...args);
            return func.bind(null, this)(...args);
        }
    });
}

function registerIterable(proto, protoName) {
    for(const { funcName, func } of extensions) {
        extend(protoName, proto, funcName, func);
    }
    iterablePrototypes.push({ protoName, proto });
}

function registerIterableExtension(funcName, func) {
    for(const { protoName, proto } of iterablePrototypes) {
        extend(protoName, proto, funcName, func);
    }
    extensions.push({ funcName, func });
}

function* select(iterable, projection) {
    let i = 0;
    for(const element of iterable) yield projection(element, i++);
}
registerIterableExtension("select", select);

function* where(iterable, predicate) {
    let i = 0;
    for(const element of iterable) if(predicate(element, i++)) yield element;
}
registerIterableExtension("where", where);

function* selectMany(iterable, projection) {
    for(const element of iterable) {
        yield* (projection ? projection(element) : element);
    }
}
registerIterableExtension("selectMany", selectMany);
registerIterableExtension("linqConcat", (...iterables) => selectMany(iterables));

function allowsDirectAccess(iterable) {
    return iterable instanceof Array
        || iterable instanceof String
        || iterable instanceof NodeList;
}

function* skip(iterable, toSkip) {
    if(allowsDirectAccess(iterable)) {
        for(let i = toSkip; i < iterable.length; i++) {
            yield iterable[i];
        }
        return;
    }

    for(const element of iterable) {
        if(toSkip > 0) {
            toSkip--;
        } else {
            yield element;
        }
    }
}
registerIterableExtension("skip", skip);

function* take(iterable, toTake) {
    for(const element of iterable) {
        if(toTake--) yield element;
        else break;
    }
}
registerIterableExtension("take", take);

function count(iterable, predicate) {
    if(iterable.length !== undefined && !predicate) return iterable.length;
    let count = 0;
    for(const element of iterable) {
        if(predicate ? predicate(element) : true) count++;
    }
    return count;
}
registerIterableExtension("count", count);

function firstOrDefault(iterable, predicate, defaultValue) {
    for(const element of iterable) {
        if(predicate ? predicate(element) : true) return element;
    }
    return defaultValue;
}
registerIterableExtension("firstOrDefault", firstOrDefault);

function first(iterable, predicate) {
    for(const element of iterable) {
        if(predicate ? predicate(element) : true) return element;
    }
    throw new Error('Sequence contained no elements');
}
registerIterableExtension("first", first);

function lastOrDefault(iterable, predicate, defaultValue) {
    let lastMatch = defaultValue;
    for(const element of iterable) {
        if(predicate ? predicate(element) : true) lastMatch = element;
    }
    return lastMatch;
}
registerIterableExtension("lastOrDefault", lastOrDefault);

function last(iterable, predicate) {
    let gotMatch = false;
    let lastMatch;
    for(const element of iterable) {
        if(predicate ? predicate(element) : true) {
            lastMatch = element;
            gotMatch = true;
        }
    }
    if(!gotMatch) throw new Error('Sequence contained no elements');
    return lastMatch;
}
registerIterableExtension("last", last);

function singleOrDefault(iterable, predicate, defaultValue) {
    let foundElement = false;
    let firstElement = defaultValue;
    for(const element of iterable) {
        if(predicate ? predicate(element) : true) {
            if(foundElement) throw new Error('Sequence contained more than one element');
            foundElement = true;
            firstElement = element;
        }
    }
    return firstElement;
}
registerIterableExtension("singleOrDefault", singleOrDefault);

function single(iterable, predicate) {
    let foundElement = false;
    let firstElement;
    for(const element of iterable) {
        if(predicate ? predicate(element) : true) {
            if(foundElement) throw new Error('Sequence contained more than one element');
            foundElement = true;
            firstElement = element;
        }
    }
    if(!foundElement) throw new Error('Sequence contained no elements');
    else return firstElement;
}
registerIterableExtension("single", single);

function any(iterable, predicate) {
    for(const element of iterable) {
        if(predicate ? predicate(element) : true) return true;
    }
    return false;
}
registerIterableExtension("any", any);

function all(iterable, predicate) {
    for(const element of iterable) {
        if(!predicate(element)) return false;
    }
    return true;
}
registerIterableExtension("all", all);

function contains(iterable, toFind) {
    if(iterable instanceof Set) return iterable.has(toFind);
    for(const element of iterable) {
        if(element === toFind) return true;
    }
    return false;
}
registerIterableExtension("contains", contains);

function max(iterable, projection) {
    let max;
    for(const element of iterable) {
        const number = projection ? projection(element) : element;
        if(max === undefined || number > max) max = number;
    }
    return max;
}
registerIterableExtension("max", max);

function min(iterable, projection) {
    let min;
    for(const element of iterable) {
        const number = projection ? projection(element) : element;
        if(min === undefined || number < min) min = number;
    }
    return min;
}
registerIterableExtension("min", min);

function sum(iterable, projection) {
    let sum = 0;
    for(const element of iterable) {
        sum += projection ? projection(element) : element;
    }
    return sum;
}
registerIterableExtension("sum", sum);

function average(iterable, projection) {
    let sum = 0;
    let count = 0;
    for(const element of iterable) {
        sum += projection ? projection(element) : element;
        count++;
    }
    if(count === 0) throw new Error('Sequence contained no elements');
    return sum / count;
}
registerIterableExtension("average", average);

function toArray(iterable, projection) {
    const array = new Array(iterable.length);
    let i = 0;
    for(const element of iterable) {
        array[i++] = projection ? projection(element) : element;
    }
    return array;
}
registerIterableExtension("toArray", toArray);

function toMap(iterable, keyProjection, valueProjection) {
    const map = new Map();
    for(const element of iterable) {
        map.set(keyProjection(element), valueProjection ? valueProjection(element) : element);
    }
    return map;
}
registerIterableExtension("toMap", toMap);

function toSet(iterable, projection) {
    const set = new Set();
    for(const element of iterable) {
        set.add(projection ? projection(element) : element)
    };
    return set;
}
registerIterableExtension("toSet", toSet);

function groupBy(iterable, keyProjection) {
    const groups = new Map();
    for(const element of iterable) {
        const key = keyProjection(element);
        if(!groups.has(key)) groups.set(key, []);
        groups.get(key).push(element);
    }
    return groups;
}
registerIterableExtension("groupBy", groupBy);

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

function* union(...iterables) {
    const allElements = new Set();
    for(const iterable of iterables) {
        for(const element of iterable) {
            if(!allElements.has(element)) {
                yield element;
                allElements.add(element);
            }
        }
    }
}
registerIterableExtension("union", union);
registerIterableExtension("distinct", iterable => union(iterable));

function* intersect(...iterables) {
    if(iterables.length === 0) return;
    else if(iterables.length === 1) {
        yield* iterables[0].toSet();
        return;
    } else if(iterables.length === 2) {
        const set = iterables[0].toSet();
        for(const element of iterables[1]) {
            if(set.has(element)) yield element;
        }
        return;
    }
    const appearanceMap = new Map();
    for(const iterable of iterables) {
        for(const element of iterable) {
            const appearances = appearanceMap.has(element) ? appearanceMap.get(element) : new Set();
            appearances.add(iterable);
            appearanceMap.set(element, appearances);
        }
    }
    for(const [element, appearances] of appearanceMap) {
        if(appearances.size === iterables.length) yield element;
    }
}
registerIterableExtension("intersect", intersect);

function* except(iterable, ...toFilter) {
    if(!toFilter.length) {
        yield* iterable;
        return;
    }
    const allToRemove = new Set();
    for(const toFilterIterable of toFilter) {
        for (const element of toFilterIterable) {
            allToRemove.add(element);
        }
    }
    for(const element of iterable) {
        if(!allToRemove.has(element)) yield element;
    }
}
registerIterableExtension("except", except);

function orderBy(iterable, sortProjection) {
    return new OrderedIterable(iterable, sortProjection, false);
}
registerIterableExtension("orderBy", orderBy);

function thenBy(orderedIterable, sortProjection) {
    orderedIterable.addSort(sortProjection, false);
    return orderedIterable;
}
registerIterableExtension("thenBy", thenBy);

function orderByDescending(iterable, sortProjection) {
    return new OrderedIterable(iterable, sortProjection, true);
}
registerIterableExtension("orderByDescending", orderByDescending);

function thenByDescending(orderedIterable, sortProjection) {
    orderedIterable.addSort(sortProjection, true);
    return orderedIterable;
}
registerIterableExtension("thenByDescending", thenByDescending);

function* append(iterable, ...elements) {
    yield* iterable;
    yield* elements;
}
registerIterableExtension("append", append);

function* prepend(iterable, ...elements) {
    yield* elements;
    yield* iterable;
}
registerIterableExtension("prepend", prepend);

function* defaultIfEmpty(iterable, defaultValue) {
    let anyElements = false;
    for(const element of iterable) {
        yield element;
        anyElements = true;
    }
    if(!anyElements) yield defaultValue;
}
registerIterableExtension("defaultIfEmpty", defaultIfEmpty);

function* linqReverse(iterable) {
    let array;
    if(allowsDirectAccess(iterable)) {
        array = iterable;
    } else {
        array = [];
        let i = 0;
        for(const element of iterable) {
            array[i++] = element;
        }
    }
    for(let i = array.length - 1; i >= 0; i--) {
        yield array[i];
    }
}
registerIterableExtension("linqReverse", linqReverse);

function sequenceEqual(iterable, other) {
    if(iterable.length !== undefined && other.length !== undefined && iterable.length !== other.length) return false;
    const iterator = iterable[Symbol.iterator]();
    const otherIterator = other[Symbol.iterator]();
    while(true) {
        const result = iterator.next();
        const otherResult = otherIterator.next();
        if(result.done || otherResult.done) return result.done === otherResult.done;
        if(result.value !== otherResult.value) return false;
    }
}
registerIterableExtension("sequenceEqual", sequenceEqual);

function* skipWhile(iterable, predicate) {
    let skipping = true;
    for(const element of iterable) {
        skipping &&= predicate(element);
        if(!skipping) yield element;
    }
}
registerIterableExtension("skipWhile", skipWhile);

function* takeWhile(iterable, predicate) {
    for(const element of iterable) {
        if(!predicate(element)) break;
        yield element;
    }
}
registerIterableExtension("takeWhile", takeWhile);

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

    const grouped = smaller.groupBy(smallerKeyProjection);
    for(const element of larger) {
        const key = largerKeyProjection(element);
        if(!grouped.has(key)) continue;
        for(const matchingElement of grouped.get(key)) {
            yield orderedResultProjection(matchingElement, element);
        }
    }
}
registerIterableExtension("linqJoin", linqJoin);

function* groupJoin(iterable, other, keyProjection, otherKeyProjection, resultProjection) {
    const grouped = other.groupBy(otherKeyProjection);
    for(const element of iterable) {
        const key = keyProjection(element);
        if(!grouped.has(key)) continue;
        yield resultProjection(element, grouped.get(key));
    }
}
registerIterableExtension("groupJoin", groupJoin);

function aggregate(iterable, accumulator, seed, resultProjection) {
    let accumulatorValue = seed;
    for(const element of iterable) {
        accumulatorValue = accumulator(accumulatorValue, element);
    }
    return resultProjection ? resultProjection(accumulatorValue) : accumulatorValue;
}
registerIterableExtension("aggregate", aggregate);

function elementAt(iterable, index) {
    if(allowsDirectAccess(iterable)) {
        if(index >= iterable.length) throw new Error('Index was beyond the end of the sequence');
        return iterable[index];
    }
    let i = 0;
    for(const element of iterable) {
        if(i++ === index) return element;
    }
    throw new Error('Index was beyond the end of the sequence');
}
registerIterableExtension("elementAt", elementAt);

function elementAtOrDefault(iterable, index, defaultValue) {
    if(allowsDirectAccess(iterable)) {
        if(index >= iterable.length) return defaultValue;
        return iterable[index];
    }
    let i = 0;
    for(const element of iterable) {
        if(i++ === index) return element;
    }
    return defaultValue;
}
registerIterableExtension("elementAtOrDefault", elementAtOrDefault);

function* skipLast(iterable, toSkip) {
    const array = allowsDirectAccess(iterable) ? iterable : iterable.toArray();
    const stopIndex = array.length - toSkip;
    for(let i = 0; i < stopIndex; i++) {
        yield array[i];
    }
}
registerIterableExtension("skipLast", skipLast);

function* takeLast(iterable, toTake) {
    const array = allowsDirectAccess(iterable) ? iterable : iterable.toArray();
    const startIndex = Math.max(array.length - toTake, 0);
    for(let i = startIndex; i < array.length; i++) {
        yield array[i];
    }
}
registerIterableExtension("takeLast", takeLast);

function aggregateBy(iterable, keyProjection, seedProjection, accumulator, resultProjection) {
    const map = new Map();
    for(const element of iterable) {
        const key = keyProjection(element);
        let accumulatorForKey = map.has(key) ? map.get(key) : seedProjection(key, element);
        accumulatorForKey = accumulator(accumulatorForKey, element, key);
        map.set(key, accumulatorForKey);
    }
    if(resultProjection) {
        for(const [key, value] of map) {
            map.set(key, resultProjection(value, key));
        }
    }
    return map;
}
registerIterableExtension("aggregateBy", aggregateBy);

function* getChunk(iterator, chunkSize, outResult) {
    let toYield = chunkSize;
    do {
        yield outResult.value;
        toYield--;
        const result = iterator.next();
        outResult.done = result.done;
        outResult.value = result.value;
    } while(toYield && !outResult.done)
}

function* chunkBy(iterable, chunkSize) {
    const iterator = iterable[Symbol.iterator]();
    let result = iterator.next();
    while(!result.done) {
        yield getChunk(iterator, chunkSize, result);
    }
}
registerIterableExtension("chunkBy", chunkBy);
