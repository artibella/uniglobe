import { NextPageContext } from 'next';
import {
  Context,
  ManifestV2,
  ContextPlugin,
  enableDebugConsoleLogDrain,
  enableContextDevTools,
  enableUniformInsights,
} from '@uniformdev/context';
import { NextCookieTransitionDataStore } from '@uniformdev/context-next';

import manifest from './manifest.json';

export default function createUniformContext(serverContext?: NextPageContext): Context {
  const plugins: ContextPlugin[] = [enableContextDevTools(), enableDebugConsoleLogDrain('debug')];

  // adding the insights plugin client-side only
  if (typeof window !== 'undefined' && window.document) {
    plugins.push(
      // running against a local endpoint, will use edge middleware to rewrite to the actual endpoint
      enableUniformInsights({
        endpoint: {
          type: 'proxy',
          path: '/api/analytics',
        },
      })
    );
  }

  const context = new Context({
    defaultConsent: true,
    manifest: manifest as ManifestV2,
    transitionStore: new NextCookieTransitionDataStore({
      serverContext,
    }),
    plugins: plugins,
  });
  return context;
}
