import { useRef } from 'react';

import * as styles from './input.css';

const PLACE_HOLDER = '제목을 입력해주세요';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  bgColor: 'gray' | 'white';
}

const Input = ({ value, onChange, bgColor }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const hasText = value.trim().length > 0;

  const handleContainer = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className={styles.container({ bgColor: bgColor })}
      onClick={handleContainer}
    >
      <input
        ref={inputRef}
        className={`${styles.inputContent} ${
          hasText ? styles.inputFilled : ''
        }`}
        placeholder={PLACE_HOLDER}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
