import * as styles from './title.css';

interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps) => {
  return <p className={styles.title}>{title}</p>;
};

export default Title;
