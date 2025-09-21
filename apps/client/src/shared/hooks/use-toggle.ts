import { useReducer } from 'react';

/**
 * @description
 * `useToggle`은 boolean 상태를 간단하게 관리할 수 있도록 도와주는 React 훅입니다.
 * 상태를 `true`와 `false` 사이에서 토글할 수 있는 함수를 제공합니다.
 *
 * @param {boolean} [initialValue=false] - 초기 상태 값. 기본값은 `false`입니다.
 *
 * @returns {[state: boolean, toggle: () => void]} 튜플을 반환합니다:
 * - state `boolean` - 현재 상태 값
 * - toggle `() => void` - 상태를 반전시키는 함수
 *
 * @example
 *
 * function Component() {
 *   const [open, toggle] = useToggle(false);
 *
 *   return (
 *     <div>
 *       <p>Bottom Sheet 상태: {open ? '열림' : '닫힘'}</p>
 *       <button onClick={toggle}>토글</button>
 *     </div>
 *   );
 * }
 */
export function useToggle(initialValue = false) {
  return useReducer(toggle, initialValue);
}

const toggle = (state: boolean) => !state;
