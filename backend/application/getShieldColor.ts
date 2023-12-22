/**
 * @description Get colors for shield based on text contents.
 */
export function getShieldColor(status: string) {
  const cleanStatus = status.trim().toLowerCase();

  const failureSynonyms = ['error', 'err', 'fail', 'failure', 'not found'];
  if (failureSynonyms.includes(cleanStatus)) return 'red';

  if (cleanStatus === 'waiting') return 'yellow';

  return 'brightgreen';
}
