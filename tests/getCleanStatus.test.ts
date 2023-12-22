import test from 'ava';

import { getCleanStatus } from '../backend/application/getCleanStatus';

const data = [
  {
    id: 7101245533,
    name: 'main',
    node_id: 'WFR_kwLOG1GL5s8AAAABp0RoXQ',
    head_branch: 'main',
    head_sha: 'e8cd7a51d18dede60136563bfc9395f13aca5ad3',
    path: '.github/workflows/main.yml',
    display_title: 'fix: update from opts from param syntax in serverless.yml',
    run_number: 44,
    event: 'push',
    status: 'completed',
    conclusion: 'success'
  },
  {
    id: 6934095306,
    name: 'main',
    node_id: 'WFR_kwLOG1GL5s8AAAABnU3lyg',
    head_branch: 'main',
    head_sha: '696f59be1291d62cf73b61730c9cdad54f40644d',
    path: '.github/workflows/main.yml',
    display_title: 'fix(): fix #27 metrics not returning correct data; move cached/uncach…',
    run_number: 43,
    event: 'push',
    status: 'completed',
    conclusion: 'success'
  }
];

test('It should get the cleaned workflow status from GitHub workflow data', (t) => {
  const expected = {
    conclusion: 'success',
    status: 'completed'
  };

  const response = getCleanStatus(data, 'main');

  t.deepEqual(response, expected);
});

test('It should ignore non-matching refs', (t) => {
  const expected = {
    conclusion: '',
    status: ''
  };

  const response = getCleanStatus(data, 'master');

  t.deepEqual(response, expected);
});
