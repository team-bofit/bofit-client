import { content } from './content.css';

interface ContentProps {
  children: string;
  length: 'short' | 'long';
}

const Content = ({ children, length }: ContentProps) => {
  return <p className={content[length]}>{children}</p>;
};

export default Content;
