import test from 'ava';

import { getExpiryTime } from '../backend/application/getExpiryTime';

test('It should get the expiration time one minute later', (t) => {
  const expected = Math.floor(Date.now() / 1000 + 60).toString();

  const response = getExpiryTime();

  t.is(response, expected);
});
