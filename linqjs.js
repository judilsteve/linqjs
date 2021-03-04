class OrderedIterable {
    constructor(iterable, sortProjection) {
        this.array = new Array(iterable.length);
        let i = 0;
        for(const element of iterable) {
            this.array[i++] = element;
        }
        this.sortProjections = [sortProjection];
        this.sorted = false;
    }

    addSort(sortProjection) {
        this.sortProjections.push(sortProjection);
        this.sorted = false;
    }

    [Symbol.iterator]() {
        if(!this.sorted) {
            for(let i = this.sortProjections.length - 1; i >= 0; i--) {
                const sortProjection = this.sortProjections[i];
                // TODO This needs to be a stable sort, and it isn't in a lot of older browser versions
                this.array.sort((a, b) => sortProjection(a) > sortProjection(b));
            }
            this.sorted = true;
        }
        return this.array.values();
    }
}

// These don't exist in the global namespace
const Generator = Object.getPrototypeOf(function* () {});
const MapIterator = Object.getPrototypeOf(new Map().entries());
const SetIterator = Object.getPrototypeOf(new Set().entries());

const prototypes = [
    Array.prototype,
    String.prototype,
    NodeList.prototype,
    Map.prototype,
    MapIterator,
    Set.prototype,
    SetIterator,
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
    if(allowsDirectAccess) {
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
    if(allowsDirectAccess) {
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
    let lastMatch;
    for(const element of iterable) {
        if(predicate ? predicate(element) : true) lastMatch = element;
    }
    return lastMatch ?? throw new Error('Sequence contained no elements');
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
    let firstElement = defaultValue;
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
    foreach(const element in iterable) {
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
    const iterators = iterables.map(i => i.iterator);
    while(true) {
        const results = new Array(iterators.length);
        for(var i = 0; i < iterators.length; i++) {
            const result = iterators[i].next();
            if(result.done) break;
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
    return new OrderedIterable(iterable, sortProjection);
}
extendAllIterables("orderBy", orderBy);

function thenBy(orderedIterable, sortProjection) {
    orderedIterable.addSort(sortProjection);
    return orderedIterable;
}
extendAllIterables("thenBy", thenBy);