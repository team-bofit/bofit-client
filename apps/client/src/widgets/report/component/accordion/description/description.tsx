import * as styles from './description.css';

interface DescriptionProps {
  description: string;
}
const Description = ({ description }: DescriptionProps) => {
  return <div className={styles.description}>{description}</div>;
};

export default Description;
