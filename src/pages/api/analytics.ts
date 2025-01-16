import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const destination = new URL(process.env.UNIFORM_INSIGHTS_ENDPOINT!);
  destination.pathname = '/v0/events';
  destination.searchParams.set('name', 'analytics_events');

  const response = await fetch(destination.toString(), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.UNIFORM_INSIGHTS_KEY}`,
    },
    body: JSON.stringify(req.body),
  });

  const json = await response.json();
  res.status(response.status).json(json);
}
