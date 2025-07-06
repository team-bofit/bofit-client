import { useCallback, useRef, useState } from 'react';

function useTimeout(callback: () => void, delay: number) {
  const timeoutRef = useRef<number | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  const start = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setIsExiting(true);
    }, delay);
  }, [delay]);

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = null;
  }, []);

  const done = useCallback(() => {
    callback();
  }, [callback]);

  return { start, clear, done, isExiting };
}

export default useTimeout;
