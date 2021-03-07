import { registerIterableExtension } from './registry';
import { groupBy } from './internal/groupBy';

registerIterableExtension("groupBy", groupBy);
