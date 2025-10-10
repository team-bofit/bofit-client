import { ChangeEvent, KeyboardEvent, useRef } from 'react';

import { Input } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import { PLACEHOLDER } from '@widgets/community/constant/input-placeholder';
import { useChangeInputMode } from '@widgets/community/context/input-mode-context';

import * as styles from './comment-input-box.css';

interface CommentInputBoxProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errorState?: boolean;
  onSubmit: () => void;
  focusKey?: string;
}

const CommentInputBox = ({
  value,
  onChange,
  errorState,
  onSubmit,
  focusKey,
}: CommentInputBoxProps) => {
  const { mode, dispatch } = useChangeInputMode();
  const skipResetRef = useRef(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) {
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      skipResetRef.current = true;
      onSubmit();
    }
  };

  const handleBlur = () => {
    if (skipResetRef.current) {
      return;
    }
    if (mode.type === 'reply' && mode.action === 'create') {
      dispatch({ type: 'RESET' });
    }
  };

  return (
    <div className={styles.container}>
      <Input
        key={focusKey}
        autoFocus
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        bgColor="white"
        placeholder={PLACEHOLDER.COMMENT}
        errorState={errorState}
      />
      <Icon
        name="btn_comment"
        width="4.8rem"
        height="4.8rem"
        onClick={onSubmit}
        style={{ cursor: 'pointer' }}
      />
    </div>
  );
};

export default CommentInputBox;
