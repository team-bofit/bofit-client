import { useEffect, useRef } from 'react';

export const useAccordionHeight = <T extends HTMLElement>(
  isOpen: boolean,
  duration: number,
) => {
  const contentRef = useRef<T>(null);

  useEffect(() => {
    const element = contentRef.current;
    if (!element || !element.parentElement) {
      return;
    }
    const { parentElement } = element;

    if (isOpen) {
      parentElement.style.display = 'block';

      requestAnimationFrame(() => {
        const height = element.clientHeight;
        parentElement.style.setProperty('--accordion-height', `${height}px`);
      });
    } else {
      parentElement.style.setProperty('--accordion-height', `0`);
      setTimeout(() => {
        parentElement.style.display = 'none';
      }, duration);
    }
  }, [isOpen]);

  return { contentRef };
};
