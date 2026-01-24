import { useEffect, useState } from 'react';

import { InputBoxMode } from '@widgets/community/types/input-box-type';

import { LIMIT_SHORT_TEXT } from '@shared/constants/text-limits';

export const useControlledInputBox = (mode: InputBoxMode) => {
  const [content, setContent] = useState('');

  const initialContent = 'initialContent' in mode ? mode.initialContent : null;

  useEffect(() => {
    if (initialContent !== null) {
      setContent(initialContent);
    }
  }, [initialContent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    if (next.length <= LIMIT_SHORT_TEXT) {
      setContent(next);
    }
  };

  const reset = () => {
    setContent('');
  };

  return { content, handleChange, reset };
};
