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
      projectMapDefinition: {},
      projectMapNode: {},
      asset: {},
      contentType: {},
      entry: {},
      dataType: {},
    },
    directory: './content',
    format: 'yaml',
  },
};

module.exports = config;
