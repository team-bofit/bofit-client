import { titleVariants } from './insurance-title.css';

interface InsuranceTitleProps {
  company?: string; // TODO 명세 필드명 반영
  name?: string; // TODO 명세 필드명 반영
  fontColor: 'gray900' | 'white';
  fontStyle: 'eb_24' | 'eb_28';
}

const DEFAULT_PLACEHOLDER = '보험, 어디서부터 시작해야\n할지 막막하다면?';

const InsuranceTitle = ({
  company,
  name,
  fontColor,
  fontStyle,
}: InsuranceTitleProps) => {
  const hasContent = company && name;

  return (
    <h1 className={titleVariants({ fontColor, fontStyle })}>
      {hasContent ? `${company}의\n${name}` : DEFAULT_PLACEHOLDER}
    </h1>
  );
};

export default InsuranceTitle;
