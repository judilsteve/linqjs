import { registerIterableExtension } from './registry.js';
import { selectMany } from './internal/selectMany.js';

registerIterableExtension("selectMany", selectMany);
