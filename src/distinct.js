import { registerIterableExtension } from './registry';
import { union } from './internal/union'

registerIterableExtension("distinct", iterable => union(iterable));
