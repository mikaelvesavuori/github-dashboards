import test from 'ava';

import { getShieldColor } from '../backend/application/getShieldColor';

test('It should get a green color for passing', (t) => {
  const expected = 'brightgreen';

  const response = getShieldColor('passed');

  t.is(response, expected);
});

test('It should get a yellow color for waiting', (t) => {
  const expected = 'yellow';

  const response = getShieldColor('waiting');

  t.is(response, expected);
});

test('It should get a red color for failing', (t) => {
  const expected = 'red';

  const response = getShieldColor('fail');

  t.is(response, expected);
});
