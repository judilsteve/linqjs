export function allowsDirectAccess(iterable) {
    return iterable instanceof Array
        || iterable instanceof String
        || iterable instanceof NodeList;
}
