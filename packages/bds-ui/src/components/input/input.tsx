/**
 * 공통 Input 컴포넌트입니다.
 *
 * - 입력값은 `value`와 `onChange`를 통해 외부에서 제어하는 **Controlled Component**입니다.
 * - 입력 길이 제한, 유효성 검사 등의 비즈니스 로직은 반드시 외부에서 처리해야 합니다.
 * - 에러 표시 여부는 `errorState`를 통해 제어합니다.
 * - 에러 메시지는 `errorMessage`를 통해 표시됩니다.
 * - 왼쪽 아이콘은 `icon` prop으로 전달할 수 있으며, 값이 입력된 상태(`hasText=true`)에서는 자동으로 숨겨집니다.
 * - `hasClearButton`을 true로 설정하면,
 *   - 값이 입력되었을 때 오른쪽에 clear 버튼(`cancel` 아이콘)이 표시됩니다.
 *   - clear 버튼을 누르면 `onChange`가 호출되어 value가 빈 문자열로 초기화됩니다.
 *
 * @example
 * const [value, setValue] = useState('');
 * const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 *   if (e.target.value.length <= 30) {
 *     setValue(e.target.value);
 *   }
 * };
 * const { isErrorState } = useLimitedInput(30, value.length);
 *
 * <Input
 *   value={value}
 *   onChange={handleChange}
 *   bgColor="background"
 *   placeholder="검색어를 입력하세요"
 *   hasClearButton
 *   icon={
 *     <Icon
 *       name="search"
 *       width="2.4rem"
 *       height="2.4rem"
 *       color="gray300"
 *     />
 *   }
 * />
 */

import { InputHTMLAttributes, type ReactNode, useRef } from 'react';

import { Icon } from '../../icons';

import * as styles from './input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  bgColor: 'white' | 'background';
  placeholder: string;
  errorState?: boolean;
  errorMessage?: string;
  icon?: ReactNode;
  hasClearButton?: boolean;
}

const Input = ({
  value,
  onChange,
  bgColor,
  placeholder,
  errorState,
  errorMessage,
  icon,
  hasClearButton = false,
  ...props
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const hasText = value.trim().length > 0;

  const handleContainer = () => {
    inputRef.current?.focus();
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onChange?.({
      ...e,
      target: { value: '' } as HTMLInputElement,
    } as unknown as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <>
      <div
        className={styles.container({
          bgColor,
          hasError: errorState,
          hasIcon: !!icon && !hasText,
          hasClearButton,
        })}
        onClick={handleContainer}
      >
        {icon && !hasText && <span>{icon}</span>}
        <input
          enterKeyHint="done"
          ref={inputRef}
          className={`${styles.inputContent} ${
            hasText ? styles.inputFilled : ''
          }`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
          autoComplete="off"
        />
        {hasClearButton && hasText && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClear}
          >
            <Icon name="cancel" width="2.4rem" height="2.4rem" />
          </button>
        )}
      </div>
      {errorState && <p className={styles.errorMessagetext}>{errorMessage}</p>}
    </>
  );
};

export default Input;
