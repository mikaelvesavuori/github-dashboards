import { getShieldColor } from '../../application/getShieldColor';
import { Status } from '../../interfaces/interfaces';

/**
 * @description Get a badge from shields.io.
 * @see https://shields.io
 */
export async function getBadge(input: Status): Promise<string> {
  const { ref, status } = input;
  const statusColor = getShieldColor(status);

  const url = `https://img.shields.io/badge/${ref}-${status}-${statusColor}`;
  return await fetch(url).then((res) => res.text());
}
