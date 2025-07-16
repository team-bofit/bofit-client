import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Input, Navigation, TextButton, Title } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import CommunityLine from '@widgets/community/components/community-line/community-line';
import { PLACEHOLDER } from '@widgets/community/constant/input-placeholder';

import { PUT_FEED } from '@shared/api/domain/community/queries';
import { LIMIT_SHORT_TEXT } from '@shared/constants/text-limits';
import { useLimitedInput } from '@shared/hooks/use-limited-input';
import { useTextAreaState } from '@shared/hooks/use-textarea-state';
import { routePath } from '@shared/router/path';

import * as styles from './community-edit.css';

const COMMUNITY_CONTENT = {
  TITLE: {
    HEADER: '제목',
    BODY: '내용',
  },
  BUTTON: '게시물 올리기',
};

const CommunityEdit = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { mutate } = PUT_FEED(() => {
    navigate(routePath.COMMUNITY);
  });
  const location = useLocation();
  const state = location.state as { title: string; content: string };
  const [title, setTitle] = useState(state.title);

  const [content, onContentChange] = useTextAreaState(state.content);
  const { isErrorState } = useLimitedInput(LIMIT_SHORT_TEXT, title.length);

  const { postId } = useParams<{ postId: string }>();

  if (!postId) {
    throw new Error('잘못된 접근입니다.');
  }

  const handlePutFeed = () => {
    mutate({
      postId: postId,
      body: {
        title: title,
        content: content,
      },
    });
  };

  useEffect(() => {
    const isTitleValid = title.trim().length > 0;
    const isContentValid = content.trim().length > 0;

    setIsDisabled(!(isTitleValid && isContentValid));
  }, [title, content]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 30) {
      setTitle(e.target.value);
    }
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
            onClick={() => {
              (handlePutFeed(), handleGoBack());
            }}
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
            onChange={handleTitleChange}
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

export default CommunityEdit;
