// TODO Figure out how to not expose these

export function allowsDirectAccess(iterable) {
    return iterable instanceof Array
        || iterable instanceof String
        || iterable instanceof NodeList;
}
