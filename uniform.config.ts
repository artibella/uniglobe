import type { CLIConfiguration } from '@uniformdev/cli';

const config: CLIConfiguration = {
  serialization: {
    entitiesConfig: {
      locale: {},
      category: {},
      component: {},
      componentPattern: { publish: true },
      entryPattern: { mode: 'createOrUpdate', publish: true },
      composition: { publish: true },
      compositionPattern: { publish: true },
      projectMapDefinition: {},
      projectMapNode: {},
      asset: {},
      contentType: {},
      entry: {},
      dataType: {},
      previewUrl: {},
      previewViewport: {},
      quirk: {},
      redirect: {},
      signal: {},
      test: {},
    },
    directory: './content',
    format: 'yaml',
  },
};

module.exports = config;
