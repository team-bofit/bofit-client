import { useCallback } from 'react';

export const useIntersectionObserver = (
  onIntersect: () => void,
  enabled?: boolean,
) => {
  return useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !enabled) {
        return;
      }

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      });

      observer.observe(node);

      return () => observer.disconnect();
    },
    [onIntersect, enabled],
  );
};
