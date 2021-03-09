import { registerIterableExtension } from './registry.js';
import { union } from './internal/union.js'

registerIterableExtension("union", union);
