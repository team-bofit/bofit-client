import type { ReactNode } from 'react';

import * as styles from './title.css';

interface TitleProps {
  children: ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return <h2 className={styles.title}>{children}</h2>;
};

export default Title;
