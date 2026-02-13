import { createPreviewHandler } from '@uniformdev/canvas-next';
import type { NextApiRequest, NextApiResponse } from 'next';

const PLAYGROUND_PATH = '/playground';

// Preview Mode, more info https://nextjs.org/docs/advanced-features/preview-mode
const uniformHandler = createPreviewHandler({
  secret: () => process.env.UNIFORM_PREVIEW_SECRET || 'hello-world',
  playgroundPath: PLAYGROUND_PATH,
  resolveFullPath: ({ path }) => {
    const playgroundPath = PLAYGROUND_PATH;
    return path?.length ? path : playgroundPath;
  },
});

/**
 * Wraps the Uniform preview handler to fix SameSite cookie attributes.
 *
 * Next.js sets preview cookies with SameSite=Lax by default. When the Uniform
 * visual editor loads the site in a cross-origin iframe (uniform.app → your site),
 * browsers block Lax cookies, so context.preview is always false.
 *
 * This interceptor rewrites the cookies to SameSite=None; Secure so they work
 * in the cross-origin iframe context on Vercel production.
 */
export default async function preview(req: NextApiRequest, res: NextApiResponse) {
  const originalSetHeader = res.setHeader.bind(res);

  res.setHeader = function (name: string, value: any) {
    if (name.toLowerCase() === 'set-cookie') {
      const cookies = Array.isArray(value) ? value : [value];
      value = cookies.map((cookie: string) => {
        cookie = String(cookie);
        if (cookie.includes('SameSite')) {
          return cookie.replace(/SameSite=\w+/gi, 'SameSite=None; Secure');
        }
        return `${cookie}; SameSite=None; Secure`;
      });
    }
    return originalSetHeader(name, value);
  } as typeof res.setHeader;

  return uniformHandler(req, res);
}
