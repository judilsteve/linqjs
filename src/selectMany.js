import { registerIterableExtension } from './registry';
import { selectMany } from './internal/selectMany';

registerIterableExtension("selectMany", selectMany);
