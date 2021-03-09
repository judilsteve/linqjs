import { registerIterableExtension } from './registry.js';
import { allowsDirectAccess } from './internal/utils.js'

function elementAt(iterable, index) {
    if(allowsDirectAccess(iterable)) {
        if(index >= iterable.length) throw new Error('Index was beyond the end of the sequence');
        return iterable[index];
    }
    let i = 0;
    for(const element of iterable) {
        if(i++ === index) return element;
    }
    throw new Error('Index was beyond the end of the sequence');
}
registerIterableExtension("elementAt", elementAt);
