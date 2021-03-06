import { registerIterableExtension } from './registry';
import { allowsDirectAccess } from './utils';

function elementAtOrDefault(iterable, index, defaultValue) {
    if(allowsDirectAccess(iterable)) {
        if(index >= iterable.length) return defaultValue;
        return iterable[index];
    }
    let i = 0;
    for(const element of iterable) {
        if(i++ === index) return element;
    }
    return defaultValue;
}
registerIterableExtension("elementAtOrDefault", elementAtOrDefault);
