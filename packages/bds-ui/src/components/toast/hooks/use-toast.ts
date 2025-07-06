import { useCallback, useRef } from 'react';

function useTimeout(callback: () => void, delay: number) {
  const timeoutRef = useRef<number | null>(null);

  const start = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(callback, delay);
  }, [callback, delay]);

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return { start, clear };
}

export default useTimeout;
