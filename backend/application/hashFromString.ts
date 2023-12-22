import { createHash } from 'crypto';

export function hashFromString(input: string) {
  return createHash('md5').update(input).digest('hex');
}
