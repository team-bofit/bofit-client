import { useRef } from 'react';

import { COMMUNITY_LINE_PLACEHOLDER } from '@widgets/community/constant/community-line-placeholder';

import { useSubmitOnEnter } from '@shared/hooks/use-mobile-submit';

import * as styles from './community-line.css';

interface CommunityLineProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit?: () => void;
}

const CommunityLine = ({ value, onChange, onSubmit }: CommunityLineProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const hasText = value.trim().length > 0;

  const { onKeyDown } = useSubmitOnEnter(() => {
    onSubmit?.();
  }, inputRef);

  return (
    <div className={styles.postBody}>
      <textarea
        name="content" // api 연동시 변경 예정
        enterKeyHint="done"
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
