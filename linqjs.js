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
            for(let i = this.sortProjections.length - 1; i >= 0; i--) {
                const { sortProjection, isDescending } = this.sortProjections[i];
                const sortPredicate = isDescending
                    ? (a, b) => sortProjection(a) > sortProjection(b)
                    : (a, b) => sortProjection(b) > sortProjection(a);
                // TODO This needs to be a stable sort, and it isn't in a lot of older browser versions
                this.array.sort(sortPredicate);
            }
            this.sorted = true;
        }
        return this.array.values();
    }
}

// These don't exist in the global namespace
const Generator = Object.getPrototypeOf(function* () {});
const MapIteratorPrototype = Object.getPrototypeOf(new Map().entries());
const SetIteratorPrototype = Object.getPrototypeOf(new Set().entries());

const prototypes = [
    Array.prototype,
    String.prototype,
    NodeList.prototype,
    Map.prototype,
    MapIteratorPrototype,
    Set.prototype,
    SetIteratorPrototype,
    Generator.prototype,
    OrderedIterable.prototype
];

function extendAllIterables(name, func) {
    for(const proto of prototypes) {
        Object.defineProperty(proto, name, {
            writable: false,
            value: function(...args) { return func(this, ...args); }
        });
    }
}

function* select(iterable, projection) {
    let i = 0;
    for(const element of iterable) yield projection(element, i++);
}
extendAllIterables("select", select);

function* where(iterable, predicate) {
    for(const element of iterable) if(predicate(element)) yield element;
}
extendAllIterables("where", where);

function* selectMany(iterable, projection) {
    for(const element of iterable) {
        yield* (projection ? projection(element) : element);
    }
}
extendAllIterables("selectMany", selectMany);
extendAllIterables("concat", (...iterables) => selectMany(iterables));

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
extendAllIterables("skip", skip);

function* take(iterable, toTake) {
    if(allowsDirectAccess(iterable)) {
        const stop = Math.min(toTake, iterable.length);
        for(let i = 0; i < stop; i++) {
            yield iterable[i];
        }
        return;
    }

    for(const element of iterable) {
        if(toTake > 0) {
            toTake--;
            yield element;
        } else {
            break;
        }
    }
}
extendAllIterables("take", take);

function count(iterable, predicate) {
    let count = 0;
    for(const element of iterable) {
        if(predicate ? predicate(element) : true) count++;
    }
    return count;
}
extendAllIterables("count", count);

function firstOrDefault(iterable, predicate, defaultValue) {
    for(const element of iterable) {
        if(predicate ? predicate(element) : true) return element;
    }
    return defaultValue;
}
extendAllIterables("firstOrDefault", firstOrDefault);

function first(iterable, predicate) {
    for(const element of iterable) {
        if(predicate ? predicate(element) : true) return element;
    }
    throw new Error('Sequence contained no elements');
}
extendAllIterables("first", first);

function lastOrDefault(iterable, predicate, defaultValue) {
    let lastMatch = defaultValue;
    for(const element of iterable) {
        if(predicate ? predicate(element) : true) lastMatch = element;
    }
    return lastMatch;
}
extendAllIterables("lastOrDefault", lastOrDefault);

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
extendAllIterables("last", last);

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
extendAllIterables("singleOrDefault", singleOrDefault);

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
extendAllIterables("single", single);

function any(iterable, predicate) {
    for(const element of iterable) {
        if(predicate ? predicate(element) : true) return true;
    }
    return false;
}
extendAllIterables("any", any);

function all(iterable, predicate) {
    for(const element of iterable) {
        if(!predicate(element)) return false;
    }
    return true;
}
extendAllIterables("all", all);

function contains(iterable, toFind) {
    if(iterable instanceof Set) return iterable.has(toFind);
    for(const element of iterable) {
        if(element === toFind) return true;
    }
    return false;
}
extendAllIterables("contains", contains);

function max(iterable, projection) {
    let max = Number.MIN_VALUE;
    for(const element of iterable) {
        const number = projection ? projection(element) : element;
        if(number > max) max = number;
    }
    return max;
}
extendAllIterables("max", max);

function min(iterable, projection) {
    let min = Number.MAX_VALUE;
    for(const element of iterable) {
        const number = projection ? projection(element) : element;
        if(number < min) min = number;
    }
    return min;
}
extendAllIterables("min", min);

function sum(iterable, projection) {
    let sum = 0;
    for(const element of iterable) {
        sum += projection ? projection(element) : element;
    }
    return sum;
}
extendAllIterables("sum", sum);

function average(iterable, projection) {
    let sum = 0;
    let count = 0;
    for(const element of iterable) {
        sum += projection ? projection(element) : element;
        count++;
    }
    return sum / count;
}
extendAllIterables("average", average);

function toArray(iterable, projection) {
    const array = new Array(iterable.length);
    let i = 0;
    for(const element of iterable) {
        array[i++] = projection ? projection(element) : element;
    }
    return array;
}
extendAllIterables("toArray", toArray);

function toMap(iterable, keyProjection, valueProjection) {
    const map = new Map();
    for(const element of iterable) {
        map.set(keyProjection(element), valueProjection ? valueProjection(element) : element);
    }
}
extendAllIterables("toMap", toMap);

function toSet(iterable, projection) {
    const set = new Set();
    for(const element of iterable) {
        set.add(projection ? projection(element) : element)
    };
    return set;
}
extendAllIterables("toSet", toSet);

function groupBy(iterable, keyProjection) {
    const groups = new Map();
    for(const element of iterable) {
        const key = keyProjection(element);
        if(!groups.has(key)) groups.set(key, []);
        groups.get(key).push(element);
    }
    return groups;
}
extendAllIterables("groupBy", groupBy);

function* zip(...iterables) {
    const iterators = iterables.map(i => i[Symbol.iterator]());
    while(true) {
        const results = new Array(iterators.length);
        for(var i = 0; i < iterators.length; i++) {
            const result = iterators[i].next();
            if(result.done) return;
            results[i] = result.value;
        }
        yield results;
    }
}
extendAllIterables("zip", zip);

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
extendAllIterables("union", union);
extendAllIterables("distinct", iterable => union(iterable));

function* intersect(...iterables) {
    const appearanceMap = new Map();
    for(const iterable of iterables) {
        for(const element of iterable) {
            const appearances = appearanceMap.get(element) ?? new Set();
            appearances.add(iterable);
            appearanceMap.set(element, appearances);
        }
    }
    for(const [element, appearances] of appearanceMap) {
        if(appearances.size === iterables.length) yield element;
    }
}
extendAllIterables("intersect", intersect);

function* except(iterable, ...toFilter) {
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
extendAllIterables("except", except);

function orderBy(iterable, sortProjection) {
    return new OrderedIterable(iterable, sortProjection, false);
}
extendAllIterables("orderBy", orderBy);

function thenBy(orderedIterable, sortProjection) {
    orderedIterable.addSort(sortProjection, false);
    return orderedIterable;
}
extendAllIterables("thenBy", thenBy);

function orderByDescending(iterable, sortProjection) {
    return new OrderedIterable(iterable, sortProjection, true);
}
extendAllIterables("orderByDescending", orderByDescending);

function thenByDescending(orderedIterable, sortProjection) {
    orderedIterable.addSort(sortProjection, true);
    return orderedIterable;
}
extendAllIterables("thenByDescending", thenByDescending);

function* append(iterable, element) {
    yield* iterable;
    yield element;
}
extendAllIterables("append", append);

function* prepend(iterable, element) {
    yield element;
    yield* iterable;
}
extendAllIterables("prepend", prepend);

function* defaultIfEmpty(iterable, defaultValue) {
    let anyElements = false;
    for(const element of iterable) {
        yield element;
        anyElements = true;
    }
    if(!anyElements) yield defaultValue;
}
extendAllIterables("defaultIfEmpty", defaultIfEmpty);

function* reverse(iterable) {
    const array = new Array(iterable.length);
    let i = 0;
    for(const element of iterable) {
        array[i++] = element;
    }
    for(let j = array.length - 1; j >= 0; j--) {
        yield array[j];
    }
}
extendAllIterables("reverse", reverse);

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
extendAllIterables("sequenceEqual", sequenceEqual);

function* skipWhile(iterable, predicate) {
    let skipping = true;
    for(const element of iterable) {
        skipping &&= predicate(element);
        if(!skipping) yield element;
    }
}
extendAllIterables("skipWhile", skipWhile);

function* takeWhile(iterable, predicate) {
    let taking = true;
    for(const element of iterable) {
        taking &&= predicate(element);
        if(taking) yield element;
    }
}
extendAllIterables("takeWhile", takeWhile);

function* join(iterable, other, keyProjection, otherKeyProjection, resultProjection) {
    // If we can determine the lengths of the sequences
    // we can optimise memory usage by making our temporary data structure out of the smaller one
    let smaller, larger, smallerKeyProjection, largerKeyProjection;
    if(iterable.length !== undefined && other.length !== undefined && iterable.length > other.length) {
        smaller = other;
        larger = iterable;
        smallerKeyProjection = otherKeyProjection;
        largerKeyProjection = keyProjection;
        // Need to swap these
        resultProjection = (a, b) => resultProjection(b, a);
    } else {
        smaller = iterable;
        larger = other;
        smallerKeyProjection = keyProjection;
        largerKeyProjection = otherKeyProjection;
    }

    const grouped = smaller.groupBy(smallerKeyProjection);
    for(const element of larger) {
        const matching = grouped.get(largerKeyProjection(element));
        for(const matchingElement of matching) {
            yield resultProjection(matchingElement, element);
        }
    }
}
extendAllIterables("join", join);

function* groupJoin(iterable, other, keyProjection, otherKeyProjection, resultProjection) {
    const grouped = other.groupBy(otherKeyProjection);
    for(const element of iterable) {
        const matching = grouped.get(keyProjection(element));
        yield resultProjection(element, matching);
    }
}
extendAllIterables("groupJoin", groupJoin);

function aggregate(iterable, accumulator, seed, resultProjection) {
    let accumulatorValue = seed;
    for(const element of iterable) {
        accumulatorValue = accumulator(accumulatorValue, element);
    }
    return resultProjection ? resultProjection(accumulatorValue) : accumulatorValue;
}
extendAllIterables("aggregate", aggregate);

function elementAt(iterable, index) {
    if(allowsDirectAccess(iterable)) {
        if(index >= iterable.length) throw new Error('Index was beyond the end of the sequence');
        return iterable[index];
    }
    let i = 0;
    for(const element of sequence) {
        if(i++ === index) return element;
    }
    throw new Error('Index was beyond the end of the sequence');
}
extendAllIterables("elementAt", elementAt);

function elementAtOrDefault(iterable, index, defaultValue) {
    if(allowsDirectAccess(iterable)) {
        if(index >= iterable.length) return defaultValue;
        return iterable[index];
    }
    let i = 0;
    for(const element of sequence) {
        if(i++ === index) return element;
    }
    return defaultValue;
}
extendAllIterables("elementAtOrDefault", elementAtOrDefault);

function* skipLast(iterable, toSkip) {
    const array = allowsDirectAccess(iterable) ? iterable : iterable.toArray();
    const stopIndex = array.length - toSkip;
    for(let i = 0; i < stopIndex; i++) {
        yield array[i];
    }
}
extendAllIterables("skipLast", skipLast);

function* takeLast(iterable, toTake) {
    const array = allowsDirectAccess(iterable) ? iterable : iterable.toArray();
    const startIndex = Math.max(array.length - toTake, 0);
    for(let i = startIndex; i < array.length; i++) {
        yield array[i];
    }
}
extendAllIterables("takeLast", takeLast);
