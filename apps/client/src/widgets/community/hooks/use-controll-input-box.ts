import { useEffect, useRef, useState } from 'react';

import { InputBoxMode } from '@widgets/community/types/input-box-type';

import { LIMIT_SHORT_TEXT } from '@shared/constants/text-limits';

export const useControlledInputBox = (mode: InputBoxMode) => {
  const [content, setContent] = useState(
    'initialContent' in mode ? mode.initialContent : '',
  );
  const prevModeRef = useRef(mode);

  useEffect(() => {
    const isStillCreatingMode =
      prevModeRef.current.action === 'create' && mode.action === 'create';
    const typeChanged = prevModeRef.current.type !== mode.type;

    prevModeRef.current = mode;

    if (isStillCreatingMode && typeChanged) {
      return;
    }

    setContent('initialContent' in mode ? mode.initialContent : '');
  }, [mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    if (next.length <= LIMIT_SHORT_TEXT) {
      setContent(next);
    }
  };

  const reset = () => {
    setContent('initialContent' in mode ? mode.initialContent : '');
  };

  return { content, handleChange, reset };
};
