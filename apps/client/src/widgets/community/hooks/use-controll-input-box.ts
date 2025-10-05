import { useCallback, useEffect, useState } from 'react';

import { InputBoxMode } from '@widgets/community/types/input-box-type';

import { LIMIT_SHORT_TEXT } from '@shared/constants/text-limits';

export const useControlledInputBox = (mode: InputBoxMode) => {
  const [content, setContent] = useState(
    'initialContent' in mode ? mode.initialContent : '',
  );

  useEffect(() => {
    setContent('initialContent' in mode ? mode.initialContent : '');
  }, [mode]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    if (next.length <= LIMIT_SHORT_TEXT) {
      setContent(next);
    }
  }, []);

  const reset = useCallback(() => {
    setContent('initialContent' in mode ? mode.initialContent : '');
  }, [mode]);

  return { content, handleChange, reset };
};
