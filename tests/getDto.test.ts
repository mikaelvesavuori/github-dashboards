import test from 'ava';

import { getDto } from '../backend/application/getDto';

test('It should get the expected input shape', (t) => {
  const expected = {
    owner: 'owner',
    repo: 'repo',
    ref: 'ref'
  };

  const data = expected;

  const response = getDto(data);

  t.deepEqual(response, expected);
});

test('It should get an empty input shape', (t) => {
  const expected = {
    owner: '',
    repo: '',
    ref: ''
  };

  const data = expected;

  const response = getDto(data);

  t.deepEqual(response, expected);
});
