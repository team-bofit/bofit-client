import * as styles from './onboarding-title.css';

interface TitleProps {
  title: string;
  description: string;
  caption?: string;
}

const OnboardingTitle = ({ title, description, caption }: TitleProps) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      {caption && <small className={styles.caption}>{caption}</small>}
    </section>
  );
};

export default OnboardingTitle;
