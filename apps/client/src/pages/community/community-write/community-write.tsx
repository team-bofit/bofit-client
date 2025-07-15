import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { Input, Navigation, TextButton, Title } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import CommunityLine from '@widgets/community/components/community-line/community-line';
import { PLACEHOLDER } from '@widgets/community/constant/input-placeholder';

import { LIMIT_SHORT_TEXT } from '@shared/constants/text-limits';
import { useInputState } from '@shared/hooks/use-input-state';
import { useLimitedInput } from '@shared/hooks/use-limited-input';
import { useTextAreaState } from '@shared/hooks/use-textarea-state';

import * as styles from './community-write.css';

const COMMUNITY_CONTENT = {
  TITLE: {
    HEADER: '제목',
    BODY: '내용',
  },
  BUTTON: '게시물 올리기',
};

const CommunityWrite = () => {
  const [title, onTitleChange] = useInputState('', (v) => v.trim());
  const [content, onContentChange] = useTextAreaState();
  const [isDisabled, setIsDisabled] = useState(true);
  const navigation = useNavigate();
  const { isErrorState } = useLimitedInput(LIMIT_SHORT_TEXT, title.length);

  useEffect(() => {
    const isTitleValid = title.trim().length > 0;
    const isContentValid = content.trim().length > 0;

    setIsDisabled(!(isTitleValid && isContentValid));
  }, [title, content]);

  const handleGoBack = () => {
    navigation(-1);
  };

  return (
    <div className={styles.container}>
      <Navigation
        title="글쓰기"
        leftIcon={
          <Icon
            name="caret_left_lg"
            width="2.4rem"
            height="2.4rem"
            onClick={handleGoBack}
          />
        }
        rightIcon={
          <TextButton
            color="primary"
            disabled={isDisabled}
            // TODO : POST 핸들러 추가
          >
            올리기
          </TextButton>
        }
        isTextButton={true}
      />
      <div className={styles.postContainer}>
        <div className={styles.postHeader}>
          <Title fontStyle="eb_md">{COMMUNITY_CONTENT.TITLE.HEADER}</Title>
          <Input
            value={title}
            onChange={onTitleChange}
            bgColor="gray"
            errorState={isErrorState}
            placeholder={PLACEHOLDER.TITLE}
          />
        </div>
        <div className={styles.postContent}>
          <Title fontStyle="eb_md">{COMMUNITY_CONTENT.TITLE.BODY}</Title>
          <CommunityLine value={content} onChange={onContentChange} />
        </div>
      </div>
    </div>
  );
};

export default CommunityWrite;
