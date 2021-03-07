import { registerIterableExtension } from './registry';
import { selectMany } from './internal/selectMany';

registerIterableExtension("linqConcat", (...iterables) => selectMany(iterables));