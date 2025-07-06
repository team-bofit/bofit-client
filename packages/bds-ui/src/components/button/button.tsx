import { ButtonHTMLAttributes, ReactNode } from 'react';

import { buttonSizes, buttonVariants } from './button.css';

interface ButtonComponentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  disabled?: boolean;
  variant?: 'primary' | 'error' | 'border';
  size?: 'small' | 'medium' | 'large';
}

const Button = ({
  children,
  disabled = false,
  size = 'medium',
  variant = 'primary',
  ...props
}: ButtonComponentProps) => {
  return (
    <button
      className={`${buttonVariants[variant]} ${buttonSizes[size]}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
