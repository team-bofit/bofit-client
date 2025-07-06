import type { ReactNode } from 'react';

import * as styles from './content.css';

interface ContentProps {
  children: ReactNode;
}

const Content = ({ children }: ContentProps) => {
  return <p className={styles.content}>{children}</p>;
};

export default Content;
