import { subtitleVariants } from './insurance-subtitle.css';

interface InsuranceSubtitleProps {
  name: string; // TODO 명세 필드명 반영
  type: keyof typeof DEFAULT_PLACEHOLDER;
  fontColor: 'primary500' | 'primary100';
  fontStyle: 'm_16' | 'sb_14';
}

const DEFAULT_PLACEHOLDER = {
  report: '님께 추천드리는 보험은',
  home: '님께 딱 맞는 보험이에요',
} as const;

const InsuranceSubtitle = ({
  type,
  name,
  fontColor,
  fontStyle,
}: InsuranceSubtitleProps) => {
  return (
    <h2 className={subtitleVariants({ fontColor, fontStyle })}>
      {name}
      {DEFAULT_PLACEHOLDER[type]}
    </h2>
  );
};

export default InsuranceSubtitle;
