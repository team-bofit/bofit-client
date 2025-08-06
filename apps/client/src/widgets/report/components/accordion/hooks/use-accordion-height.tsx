import { useEffect, useRef } from 'react';

interface UseAccordionHeightProps {
  isOpen: boolean;
  hasData: boolean;
}

export const useAccordionHeight = <T extends HTMLElement>({
  isOpen,
  hasData,
}: UseAccordionHeightProps) => {
  const contentRef = useRef<T>(null);

  useEffect(() => {
    const element = contentRef.current;
    if (!element || !element.parentElement) {
      return;
    }
    const { parentElement } = element;

    if (isOpen && hasData) {
      parentElement.style.display = 'block';

      requestAnimationFrame(() => {
        const height = element.clientHeight;
        parentElement.style.setProperty('--accordion-height', `${height}px`);
      });
    } else {
      const timer = setTimeout(() => {
        parentElement.style.display = 'none';
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen, hasData]);

  return { contentRef };
};
