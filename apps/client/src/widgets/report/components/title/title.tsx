import * as styles from './title.css';

interface TitleProps {
  title: string;
  status: 'mainCategory' | 'subCategory';
}

const Title = ({ title, status }: TitleProps) => {
  return <p className={styles.title({ status })}>{title}</p>;
};

export default Title;
