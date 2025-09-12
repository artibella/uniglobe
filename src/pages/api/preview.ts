import { createPreviewHandler } from '@uniformdev/canvas-next';

const PLAYGROUND_PATH = '/playground';

// Preview Mode, more info https://nextjs.org/docs/advanced-features/preview-mode
export default createPreviewHandler({
  secret: () => process.env.UNIFORM_PREVIEW_SECRET || 'hello-world',
  playgroundPath: PLAYGROUND_PATH,
  resolveFullPath: ({ path }) => {
    const playgroundPath = PLAYGROUND_PATH;
    return path?.length ? path : playgroundPath;
  },
});
