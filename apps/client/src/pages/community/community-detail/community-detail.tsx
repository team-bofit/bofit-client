import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { Navigation } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import CommentInputBox from '@widgets/community/components/comment-input-box/comment-input-box';
import FeedContent from '@widgets/community/components/feed-content/feed-content';

import { COMMUNITY_MUTATION_OPTIONS } from '@shared/api/domain/community/queries';
import { COMMUNITY_QUERY_KEY } from '@shared/api/keys/query-key';
import {
  LIMIT_MEDIUM_TEXT,
  LIMIT_SHORT_TEXT,
} from '@shared/constants/text-limits';
import { useLimitedInput } from '@shared/hooks/use-limited-input';
import { routePath } from '@shared/router/path';

const CommunityDetail = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');

  const { postId } = useParams<{ postId: string }>();
  const { isErrorState } = useLimitedInput(LIMIT_MEDIUM_TEXT, content.length);
  const queryClient = useQueryClient();

  if (!postId) {
    throw new Error('postId가 존재하지 않습니다.');
  }

  const { mutate: createCommentMutate } = useMutation({
    ...COMMUNITY_MUTATION_OPTIONS.POST_COMMENT(),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: COMMUNITY_QUERY_KEY.COMMENTS(variables.postId),
      });
      queryClient.invalidateQueries({
        queryKey: COMMUNITY_QUERY_KEY.FEED_DETAIL(variables.postId),
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= LIMIT_SHORT_TEXT) {
      setContent(e.target.value);
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const onSubmitComment = () => {
    if (!content.trim()) {
      return;
    }
    createCommentMutate(
      { postId, content: content.trim() },
      {
        onSuccess: () => {
          setContent('');
        },
      },
    );
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Navigation
        title="커뮤니티"
        leftIcon={<Icon name="caret_left_lg" width="2.4rem" height="2.4rem" />}
        onClickLeft={handleGoBack}
        rightIcon={<Icon name="home" />}
        onClickRight={() => handleNavigate(routePath.HOME)}
      />

      <FeedContent postId={postId} />

      <CommentInputBox
        value={content}
        onChange={handleChange}
        errorState={isErrorState}
        onSubmit={onSubmitComment}
      />
    </>
  );
};

export default CommunityDetail;
