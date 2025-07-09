import { useRef } from 'react';

import { COMMUNITY_LINE_PLACEHOLDER } from '@widgets/community/constant/community-line-placeholder';

import * as styles from './community-line.css';

interface CommunityLineProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const CommunityLine = ({ value, onChange }: CommunityLineProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const hasText = value.trim().length > 0;

  return (
    <div className={styles.postBody}>
      <textarea
        ref={inputRef}
        className={`${styles.inputContent} ${
          hasText ? styles.inputFilled : ''
        }`}
        placeholder={COMMUNITY_LINE_PLACEHOLDER.CONTENT}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CommunityLine;
