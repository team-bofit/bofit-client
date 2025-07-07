import { titleVariants } from './title.css';

interface TitleProps {
  children: string;
  fontStyle: 'bd_sm' | 'bd_md' | 'eb_md';
}

const Title = ({ children, fontStyle }: TitleProps) => {
  return <h2 className={titleVariants[fontStyle]}>{children}</h2>;
};

export default Title;
