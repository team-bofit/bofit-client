import { useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { COMMUNITY_LINE_PLACEHOLDER } from '@widgets/community/constant/community-line-placeholder';

import { useSubmitOnEnter } from '@shared/hooks/use-mobile-submit';

import * as styles from './community-line.css';

interface CommunityLineProps {
  value: string;
  onSubmit?: () => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const CommunityLine = ({ value, onChange, onSubmit }: CommunityLineProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const hasText = value.trim().length > 0;

  const { onKeyDown } = useSubmitOnEnter(() => {
    onSubmit?.();
  }, inputRef);

  return (
    <div className={styles.postBody}>
      <TextareaAutosize
        name="content"
        ref={inputRef}
        className={`${styles.inputContent} ${
          hasText ? styles.inputFilled : ''
        }`}
        placeholder={COMMUNITY_LINE_PLACEHOLDER.CONTENT}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default CommunityLine;
