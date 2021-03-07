import { registerIterableExtension } from './registry';
import { union } from './internal/union'

registerIterableExtension("union", union);
