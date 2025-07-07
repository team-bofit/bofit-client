import { ChangeEvent, ChangeEventHandler, useCallback, useState } from 'react';

/**
 * @description
 * 입력값 상태 관리를 간편하게 해주는 React 커스텀 훅입니다.
 *
 * @param {string} [initialValue=""] - 입력값의 초기 상태를 지정합니다. 기본값은 빈 문자열("")입니다.
 * @param {(value: string) => string} [transformValue=(v: string) => v] - 입력값 변경 시 실행할 변환 함수입니다.
 *   기본값은 입력값을 그대로 반환하는 함수입니다.
 *  * 예시:
 * - 공백 제거: (v) => v.trim()
 * - 소문자 변환: (v) => v.toLowerCase()
 * - 대문자 변환: (v) => v.toUpperCase()
 *
 * @returns {[string, ChangeEventHandler<HTMLInputElement>]}
 * - 현재 입력값 상태 (string)
 * - 입력값 변경 핸들러 함수 (input 요소의 onChange에 직접 연결 가능)
 *
 * @example
 * function Example() {
 *   const [value, onChange] = useInputState('');
 *   return <input type="text" value={value} onChange={onChange} />;
 * }
 */
export function useInputState(
  initialValue = '',
  transformValue: (value: string) => string = echo,
) {
  const [value, setValue] = useState(initialValue);

  const handleValueChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setValue(transformValue(value));
    },
    [transformValue],
  );

  return [value, handleValueChange] as const;
}

function echo(v: string) {
  return v;
}
