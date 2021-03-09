
# LinqJS

LinqJS is a full implementation of LINQ extension methods in JavaScript, with **no** runtime dependencies (unless transpiling for environments that do not support [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)).

LinqJS is 18kB as raw source, 25kB as minified browser-level js (using Babel, including regenerator-runtime), and 7kB gzipped.

The methods on the [Enumerable class in .NET 5.0](https://docs.microsoft.com/en-us/dotnet/api/system.linq.enumerable?view=net-5.0) are used as the model for LinqJS.

Unlike built-in `filter`  and `map` methods, most methods in LinqJS do not allocate memory for new arrays unless you specifically call `toArray` or a similar method at the end of your chain. All methods in LinqJS that have sequence-valued return types can be iterated over via [for...of syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of).

## Installation:

```
npm i --save @judilsteve/linqjs
```

## Usage:

```javascript
import { registerIterable } from 'linqjs/registry';
import 'linqjs/select';
import 'linqjs/where';

class RangeIterator {
    constructor(start, end) {
        this.current = start;
        this.end = end;
    }

    next() {
        return { value: this.current++, done: this.current > this.end };
    }
}

class Range {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    [Symbol.iterator]() {
        return new RangeIterator(this.start, this.end);
    }
}
// Use 'registerIterable' to add LinqJS methods to any object or prototype with a [Symbol.iterator]() function
registerIterable('Range', Range.prototype);

// By default, LinqJS methods work on Arrays, Strings, Maps, Sets, and Generators
const evenPerfectSquares = new Range(0,10)
    .select(x => Math.pow(x, 2))
    .where(x => x % 2 === 0);

// Results of LinqJS method chains can be iterated using for...of
for(const element of evenPerfectSquares) {
    console.log(element);
}
```

## Differences from .NET 5.0 Implementation

 - All method names are in `camelCase` instead of `PascalCase`
 - The `aggregate` method always takes its seed value as the *third* argument. This is because JavaScript does not support method overloads like C# does, so optional parameters are used instead.
 - The arguments to the `zip` function have been re-ordered so that the result projection is the first argument. This allows the function to zip an arbitrary number of sequences together, whearas the C# version can only deal with two.
 - Methods concerning the C# type system (e.g. `Cast`, `AsEnumerable`, `LongCount`, `OfType`) have not been ported.
 - Non-extension methods (e.g. `Empty`, `Range`, `Repeat`) have not been ported.
 - `ToDictionary` has been renamed `toMap`, to reflect its use of the native JavaScript `Map`. Unlike `ToDictionary`, `toMap` will not throw if the same key is found twice in the input sequence.
 - `GroupBy` returns a JavaScript `Map` (where each value is an `Array`) instead of an `IEnumerable<IGrouping>`.
 - In C#, the overloads of `Min`/`Max` that return nullable values return `null` when the input sequence is empty. However, non-nullable overloads throw in this case. Since there is no such distinction in JavaScript, `min`/`max` always returns `undefined` when the sequence is empty.
 - `ToHashSet` has been renamed `toSet`, to reflect its use of the native JavaScript `Set`.
 - `ToList` has not been ported, as JavaScript `Array`s already have mutable length.
 - The following methods have had `linq` prepended to their name (e.g. `Concat` becomes `linqConcat`) to avoid conflicting with built-in methods: `Concat`, `Reverse`, `Join`.

## Caveats

 - To use LinqJS in environments that do not support [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators), you will need to transpile LinqJS. If you decide to use [babel](https://babeljs.io/) to do this, you will need to import the [regenerator-runtime](https://www.npmjs.com/package/regenerator-runtime) module into your project so that the transpiled generator functions can be run.

## "But wait, isn't that prototype pollution?"

Technically, yes, but prototype pollution is usually regarded as bad because packages pollute prototypes *without* the programmer who imports the package knowing this. For example, you pull in a library that redefines a built-in function on Array which you already use throughout your project, and weird bugs start occurring that you can't track down, because you were expecting calls to that function to do one thing, but now they're doing another. If you're importing this library, though, you're explicitly requesting that LINQ functions be added to the Array/String/etc prototypes. **That said, if you're developing a library to be used by others, don't use LinqJS. If you do, then everyone who imports your library will be unknowingly polluting prototypes throughout their application.**

LinqJS also uses some safeguards when extending prototypes: It will only add methods, not overwrite them. If you import a LINQ method and one of the registered prototypes already has a property with that name, you'll get an error. When LinqJS adds a method, it does so using Object.defineProperty, and adds it as a non-writable, non-enumerable property. This means the extension methods won't show up when you try to enumerate the keys of the object, and it also means that if anything else in your project tries to redefine or modify that property, then an error will be thrown.

If that's still not cool with you, I'd invite you to check out some of the other LINQ ports for js that don't use prototype pollution. However, these usually require you to do something like `enumerable([]).where(...)` to kick off your method chains, instead of just using `[].where(...)`.

## Extras

 - `aggregateBy` method which combines `groupBy` and `aggregate` into a single operation. `aggregateBy` is more performant than calling `groupBy` and then `aggregate` on each group, since it only traverses the source sequence once, does not need to create temporary arrays to hold the elements of each group.
 - `chunkBy` method which transforms a sequence into a sequence of sequences (splits it into chunks), with each chunk having the number of elements specified by the method parameter (or less if the source sequence runs out of elements).
