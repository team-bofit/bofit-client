import { KeyboardEvent, RefObject, useCallback } from 'react';

/**
 * @description Enter 키 입력 시 onSubmit 실행 및 키보드 블러 처리
 */
export function useSubmitOnEnter<T extends HTMLElement>(
  onSubmit: () => void,
  blurRef?: RefObject<T | null>,
) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<T>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        blurRef?.current?.blur(); // 키보드 내리기
        onSubmit();
      }
    },
    [onSubmit, blurRef],
  );

  return {
    onKeyDown: handleKeyDown,
  };
}
