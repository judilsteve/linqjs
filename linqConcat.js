import { registerIterableExtension } from './registry.js';
import { selectMany } from './internal/selectMany.js';

registerIterableExtension("linqConcat", (...iterables) => selectMany(iterables));