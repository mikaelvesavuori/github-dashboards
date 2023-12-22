import { WorkflowStatus } from '../interfaces/interfaces';

/**
 * @description Reduce a workflow dataset into the conclusion and status.
 */
export function getCleanStatus(runs: Record<string, any>[], ref: string): WorkflowStatus {
  const matches = runs.filter((item: Record<string, any>) => item.head_branch === ref);
  const latest = matches.reduce(
    (previous: Record<string, any>, current: Record<string, any>) =>
      previous.run_number > current.run_number ? previous : current,
    {}
  );
  return {
    conclusion: latest?.conclusion || '',
    status: latest?.status || ''
  };
}
