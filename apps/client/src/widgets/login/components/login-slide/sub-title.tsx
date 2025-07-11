import * as styles from './sub-title.css';

interface subtitleProps {
  subtitle: string;
}

const SubTitle = ({ subtitle }: subtitleProps) => {
  return <p className={styles.descriptionText}>{subtitle}</p>;
};

export default SubTitle;
