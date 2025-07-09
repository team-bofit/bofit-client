import { useEffect, useState } from 'react';
import { Button, Input, Navigation, Title } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import CommunityLine from '@widgets/community/components/community-line/community-line';

import { useInputState } from '@shared/hooks/use-input-state';
import { useTextAreaState } from '@shared/hooks/use-textarea-state';

import * as styles from './community-post-write.css';

const COMMUNITY_CONTENT = {
  TITLE: {
    HEADER: '제목',
    BODY: '내용',
  },
  BUTTON: '게시물 올리기',
};

const CommunityPostWrite = () => {
  const [title, onTitleChange] = useInputState('', (v) => v.trim());
  const [content, onContentChange] = useTextAreaState('', (v) => v.trim());

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const isTitleValid = title.trim().length > 0;
    const isContentValid = content.trim().length > 0;

    setIsDisabled(!(isTitleValid && isContentValid));
  }, [title, content]);

  return (
    <div className={styles.container}>
      <Navigation
        title="글쓰기"
        rightIcon={<Icon name="home" width="2.4rem" height="2.4rem" />}
      />
      <div className={styles.postContainer}>
        <div className={styles.postHeader}>
          <Title fontStyle="eb_md">{COMMUNITY_CONTENT.TITLE.HEADER}</Title>
          <Input value={title} onChange={onTitleChange} />
        </div>
        <div className={styles.postContent}>
          <Title fontStyle="eb_md">{COMMUNITY_CONTENT.TITLE.BODY}</Title>
          <CommunityLine value={content} onChange={onContentChange} />
          <div className={styles.button}>
            <Button variant="primary" size="lg" disabled={isDisabled}>
              {COMMUNITY_CONTENT.BUTTON}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPostWrite;
