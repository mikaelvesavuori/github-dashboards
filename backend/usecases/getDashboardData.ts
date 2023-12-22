import { DashboardComponent, RepoInput } from '../interfaces/interfaces';

import { createNewDynamoDbRepository } from '../infrastructure/repositories/DashboardRepository';
import { getBadge } from '../infrastructure/network/getBadge';
import { getWorkflowStatus } from '../infrastructure/network/getWorkflowStatus';

/**
 * @description The dashboard data use case.
 */
export async function getDashboardData(inputs: RepoInput[]) {
  const repository = createNewDynamoDbRepository();

  // Check for cached results
  const cachedResult = await repository.get(JSON.stringify(inputs));
  if (cachedResult) return cachedResult;

  // If there are no cached results, get fresh data and cache it
  const components: DashboardComponent[] = [];

  for (const input of inputs) {
    if (!input.owner || !input.repo || !input.ref) {
      console.warn('Missing required attribute. Skipping...');
      return;
    }

    const result = await getDashboardComponent(input);
    components.push(result);
  }

  await repository.store(JSON.stringify(inputs), components);

  return components;
}

/**
 * @description Orchestrate the calls needed to get dashboard components.
 */
async function getDashboardComponent(input: RepoInput): Promise<DashboardComponent> {
  const { owner, repo, ref } = input;

  const status = await getWorkflowStatus({ owner, repo, ref });
  const badge = await getBadge(status);

  return {
    ...status,
    badge
  };
}
