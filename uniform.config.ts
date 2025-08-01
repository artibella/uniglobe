import type { CLIConfiguration } from '@uniformdev/cli';

const config: CLIConfiguration = {
  serialization: {
    entitiesConfig: {
      locale: {},
      category: {},
      component: {},
      componentPattern: { publish: true },
      entryPattern: { publish: true },
      composition: { publish: true },
      compositionPattern: { publish: true },
      projectMapDefinition: {},
      projectMapNode: {},
      asset: {},
      contentType: {},
      entry: { publish: true },
      dataType: {},
      previewUrl: {},
      previewViewport: {},
      redirect: {},
      quirk: {},
      enrichment: {},
      aggregate: {},
      signal: {},
      test: {},
    },
    directory: './content',
    format: 'yaml',
  },
};

module.exports = config;
