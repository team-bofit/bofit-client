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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= 30) {
      onChange(e);
    }
  };

  return (
    <div
      className={styles.container({ bgColor: bgColor, hasError: errorState })}
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
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};

export default Input;
