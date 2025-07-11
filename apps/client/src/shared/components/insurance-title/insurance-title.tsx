import { titleVariants } from './insurance-title.css';

interface InsuranceTitleProps {
  company: string; // TODO 명세 필드명 반영
  name: string; // TODO 명세 필드명 반영
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
