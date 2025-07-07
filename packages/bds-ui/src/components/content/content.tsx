import { content } from './content.css';

interface ContentProps {
  text: string;
  length: 'sm' | 'lg';
}

const Content = ({ text, length }: ContentProps) => {
  return <p className={content[length]}>{text}</p>;
};

export default Content;
