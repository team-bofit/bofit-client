import { titleVariants } from './insurance-title.css';

interface InsuranceTitleProps {
  company: string; //api 연동
  name: string; //api 연동
  size: 'md' | 'lg';
  color: 'white' | 'black';
}

const InsuranceTitle = ({
  company,
  name,
  size,
  color,
}: InsuranceTitleProps) => {
  return (
    <h1 className={titleVariants({ size, color })}>
      {company}의<br /> {name}
    </h1>
  );
};

export default InsuranceTitle;
