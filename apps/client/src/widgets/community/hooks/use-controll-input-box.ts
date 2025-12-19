import { useEffect, useRef, useState } from 'react';

import { InputBoxMode } from '@widgets/community/types/input-box-type';

import { LIMIT_SHORT_TEXT } from '@shared/constants/text-limits';

export const useControlledInputBox = (mode: InputBoxMode) => {
  const [content, setContent] = useState(
    'initialContent' in mode ? mode.initialContent : '',
  );
  const prevModeRef = useRef(mode);

  useEffect(() => {
    const prevMode = prevModeRef.current;
    prevModeRef.current = mode;

    const isStillCreatingMode =
      prevMode.action === 'create' && mode.action === 'create';
    const typeChanged = prevMode.type !== mode.type;

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
