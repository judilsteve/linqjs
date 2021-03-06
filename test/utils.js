export function expectAsArray(valueOrFunction) {
    let wrapped;
    if(valueOrFunction instanceof Function) {
        wrapped = () => [...valueOrFunction()];
    } else {
        wrapped = [...valueOrFunction];
    }
    return expect(wrapped);
}

export function* generate(array) {
    yield* array;
}

export function* generateThenThrow(array) {
    yield* array;
    throw new Error('Sequence was enumerated further than expected');
}