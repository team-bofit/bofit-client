import { ChangeEvent } from 'react';

import { Input } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import { PLACEHOLDER } from '@widgets/community/constant/input-placeholder';

import * as styles from './comment-box.css';

interface CommentBoxProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errorState?: boolean;
  onSubmit: () => void;
}

const CommentBox = ({
  value,
  onChange,
  errorState,
  onSubmit,
}: CommentBoxProps) => {
  return (
    <div className={styles.container}>
      <Input
        value={value}
        onChange={onChange}
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

export default CommentBox;
