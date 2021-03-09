import { registerIterableExtension } from './registry.js';
import { groupBy } from './internal/groupBy.js';

registerIterableExtension("groupBy", groupBy);
