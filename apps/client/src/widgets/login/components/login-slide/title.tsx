import * as styles from './title.css';

interface titleProps {
  title: string;
}

const Title = ({ title }: titleProps) => {
  return <h2 className={styles.headerText}>{title}</h2>;
};

export default Title;
