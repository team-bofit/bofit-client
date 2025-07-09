import { useEffect, useState } from 'react';
import { Input, Navigation, TextButton, Title } from '@bds/ui';
import { Icon } from '@bds/ui/icons';
import { useNavigate } from 'react-router';

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
  const [content, onContentChange] = useTextAreaState();
  const [isDisabled, setIsDisabled] = useState(true);
  const navigation = useNavigate();

  useEffect(() => {
    const isTitleValid = title.trim().length > 0;
    const isContentValid = content.trim().length > 0;

    setIsDisabled(!(isTitleValid && isContentValid));
  }, [title, content]);

  return (
    <div className={styles.container}>
      <Navigation
        title="글쓰기"
        leftIcon={
          <Icon
            name="caret_left_lg"
            width="2.4rem"
            height="2.4rem"
            onClick={() => navigation(-1)}
          />
        }
        rightIcon={
          <TextButton
            color="primary"
            disabled={isDisabled}
            onClick={() => {
              console.log(JSON.stringify({ title, content }, null, 2));
            }}
          >
            올리기
          </TextButton>
        }
      />
      <div className={styles.postContainer}>
        <div className={styles.postHeader}>
          <Title fontStyle="eb_md">{COMMUNITY_CONTENT.TITLE.HEADER}</Title>
          <Input value={title} onChange={onTitleChange} bgColor="gray" />
        </div>
        <div className={styles.postContent}>
          <Title fontStyle="eb_md">{COMMUNITY_CONTENT.TITLE.BODY}</Title>
          <CommunityLine value={content} onChange={onContentChange} />
        </div>
      </div>
    </div>
  );
};

export default CommunityPostWrite;
