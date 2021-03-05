
# LinqJS

LinqJS is a full implementation of LINQ extension methods in JavaScript, with **no** runtime dependencies.
It is 18kB as raw source, 19kB as minified browser-level js, and <5kB gzipped.

The methods on the [Enumerable class in .NET 5.0](https://docs.microsoft.com/en-us/dotnet/api/system.linq.enumerable?view=net-5.0) are used as the model for LinqJS.

Unlike built-in `filter`  and `map` methods, most methods in LinqJS do not allocate memory for new arrays unless you specifically call `toArray` or a similar method at the end of your chain. All methods in LinqJS that have sequence-valued return types can be iterated over via [for...of syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of).

## Usage example:

```javascript
const sortedFullNames = [
    {
        firstName: "Bruce",
        lastName: "Wayne"
    },
    {
        firstName: "Bruce",
        lastName: "Campbell"
    },
    {
        firstName: "Ash",
        lastName: "Williams"
    }
]
    .orderBy(x => x.firstName)
    .thenBy(x => x.lastName)
    .select(x => `${x.firstName} ${x.lastName}`)
    .toArray();

// The returned value:
[
    "Ash Williams",
    "Bruce Campbell",
    "Bruce Wayne"
];
```

## Differences from .NET 5.0 Implementation

 - All method names are in `camelCase` instead of `PascalCase`
 - The `Aggregate` method always takes its seed value as the *third* argument. This is because JavaScript does not support method overloads like C# does, so optional parameters are used instead.
 - Methods concerning the C# type system (e.g. `Cast`, `AsEnumerable`, `LongCount`, `OfType`) have not been ported.
 - Non-extension methods (e.g. `Empty`, `Range`, `Repeat`) have not been ported.
 - `ToDictionary` has been renamed `ToMap`, to reflect its use of the native JavaScript `Map`.
 - `GroupBy` returns a JavaScript `Map` (where each value is an `Array`) instead of an `IEnumerable<IGrouping>`.
 - `ToHashSet` has been renamed `ToSet`, to reflect its use of the native JavaScript `Set`.
 - `ToList` has not been ported, as JavaScript `Array`s already have mutable length.

## Caveats

 - No unit tests exist so far. Use this library at your own risk.

## Extras

 - `aggregateBy` method which combines `groupBy` and `aggregate` into a single operation. `aggregateBy` is more performant than calling `groupBy` and then `aggregate` on each group, since it only traverses the source sequence once, does not need to create temporary arrays to hold the elements of each group.
 - `chunkBy` method which transforms a sequence into a sequence of sequences (splits it into chunks), with each chunk having the number of elements specified by the method parameter (or less if the source sequence runs out of elements).
