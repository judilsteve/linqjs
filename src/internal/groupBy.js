export function groupBy(iterable, keyProjection) {
    const groups = new Map();
    for(const element of iterable) {
        const key = keyProjection(element);
        if(!groups.has(key)) groups.set(key, []);
        groups.get(key).push(element);
    }
    return groups;
}
