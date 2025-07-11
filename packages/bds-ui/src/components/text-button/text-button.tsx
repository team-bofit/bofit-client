import { ButtonHTMLAttributes, ReactNode } from 'react';

import { buttonColor } from './text-button.css';

interface TextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color: 'black' | 'primary' | 'white';
  disabled?: boolean;
}

const TextButton = ({
  children,
  color,
  disabled = false,
  ...props
}: TextButtonProps) => {
  return (
    <button className={buttonColor[color]} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default TextButton;
