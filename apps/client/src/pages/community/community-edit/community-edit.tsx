import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Input, Navigation, TextButton, Title } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import CommunityLine from '@widgets/community/components/community-line/community-line';
import { PLACEHOLDER } from '@widgets/community/constant/input-placeholder';

import { COMMUNITY_MUTATION_OPTIONS } from '@shared/api/domain/community/queries';
import { COMMUNITY_QUERY_KEY } from '@shared/api/keys/query-key';
import {
  LIMIT_LONG_TEXT,
  LIMIT_SHORT_TEXT,
} from '@shared/constants/text-limits';
import { useLimitedInput } from '@shared/hooks/use-limited-input';
import { routePath } from '@shared/router/path';

import * as styles from './community-edit.css';

const COMMUNITY_CONTENT = {
  TITLE: {
    HEADER: '제목',
    BODY: '내용',
  },
  BUTTON: '수정',
};

const CommunityEdit = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const queryClient = useQueryClient();
  const { postId } = useParams<{ postId: string }>();
  const location = useLocation();
  const state = location.state as { title: string; content: string };
  const [title, setTitle] = useState(state.title);
  const [content, setContent] = useState(state.content);
  const { isErrorState } = useLimitedInput(LIMIT_SHORT_TEXT, title.length);

  if (!postId) {
    throw new Error('게시글 Id가 존재하지 않습니다.');
  }

  const { mutate } = useMutation({
    ...COMMUNITY_MUTATION_OPTIONS.PUT_FEED(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: COMMUNITY_QUERY_KEY.FEED_DETAIL(postId),
      });
      navigate(routePath.COMMUNITY_DETAIL.replace(':postId', postId));
    },
  });

  const handlePutFeed = () => {
    mutate({
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

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= LIMIT_LONG_TEXT) {
      setContent(e.target.value);
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
            size="sm"
            color="primary"
            disabled={isDisabled}
            onClick={() => {
              (handlePutFeed(), handleGoBack());
            }}
          >
            {COMMUNITY_CONTENT.BUTTON}
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
          <CommunityLine value={content} onChange={handleContentChange} />
        </div>
      </div>
    </div>
  );
};

export default CommunityEdit;
