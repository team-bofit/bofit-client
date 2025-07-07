import * as styles from './content.css';

interface ContentProps {
  children: string;
}

const Content = ({ children }: ContentProps) => {
  return <p className={styles.content}>{children}</p>;
};

export default Content;
