import { getDashboardData } from './usecases/getDashboardData';

import { getDto } from './application/getDto';

export async function handler(event: Record<string, any>) {
  try {
    const body = event.body && typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    const inputs = body.map((input: Record<string, any>) => getDto(input));
    const results = await getDashboardData(inputs);

    return {
      statusCode: 200,
      body: JSON.stringify(results)
    };
  } catch (error: any) {
    return {
      statusCode: error?.cause || 400,
      body: JSON.stringify('Error')
    };
  }
}
