
# LinqJS

LinqJS is a full-featured implementation of LINQ with zero runtime dependencies.
It is 17kB as raw source, 23kB as minified browser-level js, and <5kB gzipped.

The methods on the [Enumerable class in .NET 5.0](https://docs.microsoft.com/en-us/dotnet/api/system.linq.enumerable?view=net-5.0) are used as the model for LinqJS.

Unlike built-in `filter`  and `map` methods, most methods in LinqJS do not create a new array unless you specifically call `toArray` at the end of your method chain. All methods with sequence-valued return types can be iterated over via for/of syntax.

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
    .orderBy(x => x.lastName)
    .thenBy(x => x.firstName)
    .select(x => `${x.lastName}, ${x.firstName}`)
    .toArray();
```

## Differences

 - The `Aggregate` method always takes its seed value as the *third* argument. This is because JavaScript does not support method overloads like C# does, so optional parameters are used instead.
 - Methods concerning the C# type system (e.g. `Cast`, `AsEnumerable`, `LongCount`, `OfType`) have not been ported.
 - Non-extension methods (e.g. `Empty`, `Range`, `Repeat`) have not been ported.
 - `ToDictionary` has been renamed `ToMap`, to reflect its use of the native JavaScript `Map`
 - `ToHashSet` has been renamed `ToSet`, to reflect its use of the native JavaScript `Set`
 - `ToList` has not been ported, as JavaScript `Array`s already have mutable length

## Caveats

No unit tests exist so far. Use this library at your own risk.
