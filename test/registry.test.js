import { registerIterable, registerIterableExtension } from '../src/registry';

// NOTE: Iterables and extensions registered in each test persist throughout the whole test suite.

test("Register iterable, then extend", () => {
    const x = { v: 42 };
    registerIterable('myIterable', x);

    const extension = x => x.v;
    registerIterableExtension('getV', extension);

    expect(x.getV()).toBe(42);
});

test("Register extension, then iterable", () => {
    const extension = x => x.v2;
    registerIterableExtension('getV2', extension);

    const x = { v2: 42 };
    registerIterable('myIterable2', x);

    expect(x.getV2()).toBe(42);
});

test('Register iterable that has already been registered', () => {
    registerIterable('myIterable3', {});
    expect(() => registerIterable('myIterable3', {}))
        .toThrow("An iterable with the name 'myIterable3' has already been registered");
});

test('Register extension that has already been registered', () => {
    registerIterableExtension('getV3', () => {});
    expect(() => registerIterableExtension('getV3', () => {}))
        .toThrow("An extension method with the name 'getV3' has already been registered");
});

test('Register extension with same name as built-in method', () => {
    expect(() => registerIterableExtension('concat', () => {}))
        .toThrow("Cannot add extension method 'concat' to iterable Array as it already has this property defined");
});
