import { subtitleVariants } from './insurance-subtitle.css';

interface InsuranceSubtitleProps {
  name: string; // API 연동
  type: keyof typeof DEFAULT_PLACEHOLDER;
}

const DEFAULT_PLACEHOLDER = {
  report: '님께 추천드리는 보험은',
  home: '님께 딱 맞는 보험이에요',
} as const;

const InsuranceSubtitle = ({ type, name }: InsuranceSubtitleProps) => {
  return (
    <h1 className={subtitleVariants({ type })}>
      {name}
      {DEFAULT_PLACEHOLDER[type]}
    </h1>
  );
};

export default InsuranceSubtitle;
