import { registerIterableExtension } from './registry';
import { allowsDirectAccess } from './utils';

function* skip(iterable, toSkip) {
    if(allowsDirectAccess(iterable)) {
        for(let i = toSkip; i < iterable.length; i++) {
            yield iterable[i];
        }
        return;
    }

    for(const element of iterable) {
        if(toSkip > 0) {
            toSkip--;
        } else {
            yield element;
        }
    }
}
registerIterableExtension("skip", skip);
