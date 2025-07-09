import * as styles from './title.css';

interface TitleProps {
  title: string;
  catogory: 'mainCategory' | 'subCategory';
}

const Title = ({ title, catogory }: TitleProps) => {
  return <p className={styles.title({ catogory })}>{title}</p>;
};

export default Title;
