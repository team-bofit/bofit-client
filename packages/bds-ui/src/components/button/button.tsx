import { ButtonHTMLAttributes, ReactNode } from 'react';

import {
  buttonSizes,
  ButtonSizeType,
  buttonVariants,
  ButtonVariantType,
} from './button.css';

interface ButtonComponentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  disabled?: boolean;
  variant?: ButtonVariantType;
  size?: ButtonSizeType;
}

const Button = ({
  children,
  disabled = false,
  size = 'md',
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
