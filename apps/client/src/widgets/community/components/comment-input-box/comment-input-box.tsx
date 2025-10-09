import { ChangeEvent, KeyboardEvent } from 'react';

import { Input } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import { PLACEHOLDER } from '@widgets/community/constant/input-placeholder';

import * as styles from './comment-input-box.css';

interface CommentInputBoxProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errorState?: boolean;
  onSubmit: () => void;
}

const CommentInputBox = ({
  value,
  onChange,
  errorState,
  onSubmit,
}: CommentInputBoxProps) => {
  const shouldShowClear = value.trim().length > 0;

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) {
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className={styles.commentWrapper}>
      <div className={styles.inputWrapper}>
        <Input
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          bgColor="white"
          placeholder={PLACEHOLDER.COMMENT}
          errorState={errorState}
          inputSize="sm"
        />
      </div>
      <div className={styles.controlWrapper}>
        <span className={styles.imageWrapper}>
          <Icon
            name="img_add"
            width="2.4rem"
            height="2.4rem"
            color="gray800"
            onClick={onSubmit}
            style={{ cursor: 'pointer' }}
          />
          <p>사진 올리기</p>
        </span>
        <span className={styles.buttonWrapper}>
          {shouldShowClear && (
            <Icon
              name="x_btn_comment"
              width="4rem"
              height="4rem"
              onClick={onSubmit}
              style={{ cursor: 'pointer' }}
            />
          )}
          <Icon
            name="btn_comment"
            width="4rem"
            height="4rem"
            onClick={onSubmit}
            style={{ cursor: 'pointer' }}
          />
        </span>
      </div>
    </div>
  );
};

export default CommentInputBox;
