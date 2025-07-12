import * as styles from './divider.css';

interface DividerProps {
  children: string;
}

const Divider = ({ children }: DividerProps) => {
  return (
    <div className={styles.dividerContainer}>
      <p className={styles.title}>{children}</p>
      <hr className={styles.dividerLine} />
    </div>
  );
};

export default Divider;
