import { NextApiRequest, NextApiResponse } from 'next';

if (!process.env.NEXT_PUBLIC_INSIGHTS_API_URL) {
  throw new Error('NEXT_PUBLIC_INSIGHTS_API_URL is not set');
}
if (!process.env.NEXT_PUBLIC_UNIFORM_INSIGHTS_KEY) {
  throw new Error('NEXT_PUBLIC_UNIFORM_INSIGHTS_KEY is not set');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const destination = new URL(process.env.NEXT_PUBLIC_INSIGHTS_API_URL!);
  destination.pathname = '/v0/events';
  destination.searchParams.set('name', 'events');

  const response = await fetch(destination.toString(), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_UNIFORM_INSIGHTS_KEY}`,
      'Content-Type': 'application/x-ndjson',
    },
    body: req.body,
  });

  const json = await response.json();
  res.status(response.status).json(json);
}
