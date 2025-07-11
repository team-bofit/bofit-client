import { titleVariants } from './insurance-title.css';

interface InsuranceTitleProps {
  company: string; //api 연동
  name: string; //api 연동
  type: 'report' | 'home';
}

const InsuranceTitle = ({ company, name, type }: InsuranceTitleProps) => {
  return (
    <h1 className={titleVariants({ type })}>
      {company}의<br /> {name}
    </h1>
  );
};

export default InsuranceTitle;
