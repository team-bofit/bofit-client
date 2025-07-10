import { useState } from 'react';

/**
 * 커스텀 훅 `useLimitedInput`
 *
 * 입력 값이 주어진 최대 길이를 초과하지 않도록 제한하면서,
 * 에러 상태(`isError`)를 관리하는 훅입니다.
 *
 * 이 훅은 입력 필드의 `value`를 상위 컴포넌트에서 관리하도록 하고,
 * 내부에서는 글자 수 제한과 에러 상태만 처리합니다.
 *
 * @param maxLength - 허용할 최대 문자열 길이
 * @param setValue - 문자열 값이 유효할 때 호출될 외부 상태 업데이트 함수
 * @returns
 * - `isError`: 현재 입력이 제한 길이를 초과했는지 여부 (boolean)
 * - `onChange`: input의 onChange에 연결할 핸들러 (React.ChangeEventHandler)
 *
 * @example
 * ```tsx
 * const [value, setValue] = useState('');
 * const { isError, onChange } = useLimitedInput(30, setValue);
 *
 * <Input
 *   value={value}
 *   onChange={onChange}
 *   errorState={isError}
 * />
 * ```
 */
export const useLimitedInput = (
  maxLength: number,
  setValue: (value: string) => void,
) => {
  const [isError, setIsError] = useState(false);

  const handleChangeIfValid = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (newValue.length > maxLength) {
      setIsError(true);
    } else {
      setIsError(false);
      setValue(newValue);
    }
  };

  return {
    isError,
    onChange: handleChangeIfValid,
  };
};
