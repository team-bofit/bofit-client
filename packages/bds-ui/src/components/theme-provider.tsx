import { type ReactNode } from 'react';

import '../styles/reset.css';
import { themeClass } from '../styles/theme.css';

export default function ThemeProvider({
  theme,
  className,
  children,
}: {
  children: ReactNode;
  theme?: string;
  className?: string;
}) {
  return (
    <div className={`${theme ?? themeClass} ${className}`}>{children}</div>
  );
}
