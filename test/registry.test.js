import { registerIterable, registerIterableExtension } from '../src/registry';

test("Register Iterable, then extend", () => {
    const x = { v: 42 };
    registerIterable('myIterable', x); // TODO Does this persist across tests? What about suites?

    const extension = x => x.v;
    registerIterableExtension('getV', extension); // TODO This appears to persist across tests. What about suites?

    expect(x.getV()).toBe(42);
});

test("Register extension, then iterable", () => {
    const extension = x => x.v2;
    registerIterableExtension('getV2', extension);

    const x = { v2: 42 };
    registerIterable('myIterable2', x);

    expect(x.getV2()).toBe(42);
});

// TODO Test adding iterables/extensions that already exist
