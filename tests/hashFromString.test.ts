import test from 'ava';

import { hashFromString } from '../backend/application/hashFromString';

test('It should get the hash from a string', (t) => {
  const expected = '4d4b89947658a354b85f62976a1d334f';

  const response = hashFromString('something here');

  t.is(response, expected);
});
