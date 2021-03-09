import { registerIterableExtension } from './registry.js';
import { union } from './internal/union.js'

registerIterableExtension("distinct", iterable => union(iterable));
