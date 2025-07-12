import { ButtonHTMLAttributes, ReactNode } from 'react';

import { buttonColor, buttonFontSize } from './text-button.css';

interface TextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color: 'black' | 'primary' | 'white';
  disabled?: boolean;
  fontSize: 'sm' | 'lg';
}

const TextButton = ({
  children,
  color,
  disabled = false,
  fontSize,
  ...props
}: TextButtonProps) => {
  return (
    <button
      className={`${buttonColor[color]} ${buttonFontSize[fontSize]}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default TextButton;
