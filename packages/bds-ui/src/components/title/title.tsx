import type { ReactNode } from 'react';

import * as styles from './title.css';

interface TitleProps {
  children: ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return <div className={styles.title}>{children}</div>;
};

export default Title;
