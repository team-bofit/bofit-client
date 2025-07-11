import { titleVariants } from './insurance-title.css';

interface InsuranceTitleProps {
  company: string; // TODO 명세 필드명 반영
  name: string; // TODO 명세 필드명 반영
  fontColor: 'gray900' | 'white';
  fontStyle: 'eb_md' | 'eb_lg';
}

const InsuranceTitle = ({
  company,
  name,
  fontColor,
  fontStyle,
}: InsuranceTitleProps) => {
  return (
    <h1 className={titleVariants({ fontColor, fontStyle })}>
      {company}의<br /> {name}
    </h1>
  );
};

export default InsuranceTitle;
