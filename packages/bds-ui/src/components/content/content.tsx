import type { ReactNode } from 'react';

import * as styles from './content.css';

interface ContentProps {
  children: ReactNode;
}

const Content = ({ children }: ContentProps) => {
  return <div className={styles.content}>{children}</div>;
};

export default Content;
