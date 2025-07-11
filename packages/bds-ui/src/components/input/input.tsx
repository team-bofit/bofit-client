/**
 * 공통 Input 컴포넌트입니다.
 *
 * - 입력값은 value와 onChange를 통해 외부에서 제어합니다.
 * - 입력 길이 제한 등의 비즈니스 로직은 반드시 외부에서 처리해주세요.
 * - 에러 표시 여부도 외부에서 errorState를 통해 주입받아야 합니다.
 *
 * - 길이 제한과 에러 상태를 함께 관리하려면, 아래와 같이 useLimitedInput 훅을 사용할 수 있습니다.
 *
 * @example
 * const [value, setValue] = useState(’’);
 * const handleChange = (e: React.ChangeEvent) => {
 *   if (e.target.value.length <= 30) {
 *     setValue(e.target.value);
 *   }
 * };
 * const { isErrorState } = useLimitedInput(30, value.length);
 *
 * <Input
 *   value={value}
 *   onChange={handleChange}
 *   bgColor=“gray”
 *   errorState={isErrorState}
 * />
 */

import { InputHTMLAttributes, useRef } from 'react';

import * as styles from './input.css';

const PLACE_HOLDER = '제목을 입력해주세요';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  bgColor: 'gray' | 'white';
  errorState?: boolean;
}

const Input = ({
  value,
  onChange,
  bgColor,
  errorState,
  ...props
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const hasText = value.trim().length > 0;

  const handleContainer = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className={styles.container({ bgColor, hasError: errorState })}
      onClick={handleContainer}
    >
      <input
        enterKeyHint="done"
        ref={inputRef}
        className={`${styles.inputContent} ${
          hasText ? styles.inputFilled : ''
        }`}
        placeholder={PLACE_HOLDER}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default Input;
