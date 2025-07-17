import { useEffect, useRef } from 'react';

export const useIntersectionObserver = (
  targetRef: React.RefObject<Element | null>,
  onIntersect: () => void,
  enabled: boolean,
) => {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onIntersect();
      }
    });

    const el = targetRef?.current;
    if (el) {
      observer.current.observe(el);
    }

    return () => observer.current?.disconnect();
  }, [targetRef, enabled]);
};
