import * as styles from './title.css';

interface TitleProps {
  category: 'mainCategory' | 'subCategory';
  title?: string;
}

const Title = ({ title, category }: TitleProps) => {
  return <p className={styles.title({ category })}>{title}</p>;
};

export default Title;
