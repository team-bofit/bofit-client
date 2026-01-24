import { ButtonHTMLAttributes, ReactNode } from 'react';

import { textButtonColor, textButtonSizes } from './text-button.css';

interface TextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color: textButtonColor;
  size: textButtonSizes;
  disabled?: boolean;
}

const TextButton = ({
  children,
  color,
  disabled = false,
  size,
  ...props
}: TextButtonProps) => {
  return (
    <button
      className={`${textButtonColor[color]} ${textButtonSizes[size]}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default TextButton;
