import { GitHubStatus, RepoInput } from '../../interfaces/interfaces';

import { getCleanStatus } from '../../application/getCleanStatus';

/**
 * @description Get workflow status from GitHub
 */
export async function getWorkflowStatus(input: RepoInput): Promise<GitHubStatus> {
  const { owner, repo, ref } = input;
  const token = process.env.GITHUB_TOKEN || '';
  
  const url = `https://api.github.com/repos/${owner}/${repo}/actions/runs?branch=${ref}&per_page=25`;

  const headers: Record<string, any> = {
    Accept: 'application/vnd.github+json'
  };

  if (token) headers['Authorization'] = `Bearer ${token}`;

  const result = await fetch(url, {
    headers
  })
    .then((res) => res.json())
    .then((res) => {
      const runs = res.workflow_runs || [];
      if (runs.length === 0) return { conclusion: 'NOT FOUND', status: 'NOT FOUND' };
      return getCleanStatus(runs, ref);
    });

  return {
    conclusion: result.conclusion,
    status: result.status,
    owner,
    repo,
    ref
  };
}
