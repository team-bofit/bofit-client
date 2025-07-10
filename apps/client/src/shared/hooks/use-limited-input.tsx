/**
 * 커스텀 훅 `useLimitedInput`
 *
 * 문자열 길이(`currentLength`)가 최대 길이(`maxLength`)를 초과했는지 여부만 판단하여
 * boolean 상태값(`isErrorState`)을 반환합니다.
 *
 * 외부에서 value 상태를 관리하고, 이 훅은 오직 길이 비교 및 에러 상태 제공에만 집중합니다.
 *
 * @param maxLength - 허용할 최대 문자열 길이
 * @param currentLength - 현재 문자열 길이
 * @returns
 * - `isErrorState`: 현재 길이가 제한을 초과했는지 여부
 *
 * @example
 * const [value, setValue] = useState('');
 * const { isErrorState } = useLimitedInput(30, value.length);
 */
import { useEffect, useState } from 'react';

export const useLimitedInput = (maxLength: number, currentLength: number) => {
  const [isErrorState, setErrorState] = useState(false);

  useEffect(() => {
    setErrorState(currentLength >= maxLength);
  }, [currentLength, maxLength]);

  return { isErrorState };
};
