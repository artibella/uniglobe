import { NextApiRequest, NextApiResponse } from 'next';
import { createBackendInsightsProxyHandler } from '@uniformdev/context-insights/proxy';

if (!process.env.NEXT_PUBLIC_INSIGHTS_API_URL) {
  throw new Error('NEXT_PUBLIC_INSIGHTS_API_URL is not set');
}
if (!process.env.NEXT_PUBLIC_UNIFORM_INSIGHTS_KEY) {
  throw new Error('NEXT_PUBLIC_UNIFORM_INSIGHTS_KEY is not set');
}

// Create backend proxy handler from environment variables
const proxyHandler = createBackendInsightsProxyHandler({
  apiHost: process.env.NEXT_PUBLIC_INSIGHTS_API_URL!,
  apiKey: process.env.NEXT_PUBLIC_UNIFORM_INSIGHTS_KEY!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const proxyResponse = await proxyHandler.handleRequest(req.body);

  res.status(proxyResponse.status).json(JSON.parse(proxyResponse.body));
}
