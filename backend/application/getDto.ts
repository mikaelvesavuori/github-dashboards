/**
 * @description Get the expected input shape.
 */
export function getDto(input: Record<string, any>) {
  const owner = input?.owner || '';
  const repo = input?.repo || '';
  const ref = input?.ref || '';

  return { owner, repo, ref };
}
