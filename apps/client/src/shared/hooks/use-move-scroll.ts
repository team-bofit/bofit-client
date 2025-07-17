import { useEffect, useRef } from 'react';

export const useScrollIntoViewOnOpen = (isOpen: boolean, offset = 20) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const scrollTop = window.scrollY + rect.top - offset;

      window.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
  }, [isOpen, offset]);

  return ref;
};
