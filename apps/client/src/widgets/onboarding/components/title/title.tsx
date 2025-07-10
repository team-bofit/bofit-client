import * as styles from './title.css';
interface TitleProps {
  title: string;
  description: string;
  caption?: string;
}

const Title = ({ title, description, caption }: TitleProps) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      {caption && <small className={styles.caption}>{caption}</small>}
    </section>
  );
};

export default Title;
