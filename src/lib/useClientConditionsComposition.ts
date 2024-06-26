import {
  createQuirksVisibilityRule,
  evaluateWalkTreeVisibility,
  RootComponentInstance,
  walkNodeTree,
} from '@uniformdev/canvas';
import { useQuirks } from '@uniformdev/context-react';
import { produce } from 'immer';
import { useMemo } from 'react';

export function useClientConditionsComposition(data: RootComponentInstance | undefined) {
  const quirks = useQuirks({ throwOnMissingProvider: false });

  const rules = useMemo(() => {
    return {
      ...createQuirksVisibilityRule(quirks),
    };
  }, [quirks]);

  const preprocessedValue = useMemo(() => {
    if (!data) {
      return data;
    }

    return produce(data, draft => {
      walkNodeTree(draft, context => {
        evaluateWalkTreeVisibility({ context, rules, showIndeterminate: false });
      });
    });
  }, [data, rules]);

  return preprocessedValue;
}
