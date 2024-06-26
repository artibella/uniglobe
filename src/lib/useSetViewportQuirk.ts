import { useUniformContext } from '@uniformdev/context-react';
import { useEffect } from 'react';

export function useSetViewportQuirk() {
  const context = useUniformContext({ throwOnMissingProvider: false });

  useEffect(() => {
    const debounce = (func: () => void, delay: number) => {
      let debounceTimer: NodeJS.Timeout;
      return function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          func();
        }, delay);
      };
    };

    const debouncedHandler = debounce(() => {
      context?.context.update({
        quirks: {
          deviceType: window.innerWidth < 512 ? 'm' : window.innerWidth < 1024 ? 't' : 'd',
        },
      });
    }, 100);

    debouncedHandler();
    window.addEventListener('resize', debouncedHandler);
    return () => {
      window.removeEventListener('resize', debouncedHandler);
    };
  }, [context?.context]);
}
