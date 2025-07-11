/**
 * 공통 Input 컴포넌트입니다.
 * - 외부에서 onChange 핸들러를 주입받아 사용합니다.
 * - 입력 길이 제한 등의 비즈니스 로직은 외부에서 처리해주세요.
 *
 * 예시:
 * const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 *   if (e.target.value.length <= 30) {
 *     setValue(e.target.value);
 *   }
 * };
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
