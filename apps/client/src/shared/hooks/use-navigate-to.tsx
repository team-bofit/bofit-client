import { useNavigate } from 'react-router-dom';

export const useNavigateTo = (path: string | number) => {
  const navigate = useNavigate();

  return () => {
    if (typeof path === 'string') {
      navigate(path);
    } else {
      navigate(path);
    }
  };
};
