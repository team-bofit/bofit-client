import { useMutation, useQueryClient } from '@tanstack/react-query';

import CommentInputBox from '@widgets/community/components/comment-input-box/comment-input-box';
import FeedContent from '@widgets/community/components/feed-content/feed-content';
import { useChangeInputMode } from '@widgets/community/context/input-mode-context';
import { useInputBox } from '@widgets/community/hooks/use-input-box';

import { COMMUNITY_MUTATION_OPTIONS } from '@shared/api/domain/community/queries';
import { COMMUNITY_QUERY_KEY } from '@shared/api/keys/query-key';
import { LIMIT_MEDIUM_TEXT } from '@shared/constants/text-limits';
import { useLimitedInput } from '@shared/hooks/use-limited-input';

interface DetailSectionProps {
  postId: string;
}

const DetailSection = ({ postId }: DetailSectionProps) => {
  const { mode } = useChangeInputMode();
  const { content, handleChange, reset } = useInputBox(mode);
  const { isErrorState } = useLimitedInput(LIMIT_MEDIUM_TEXT, content.length);

  const queryClient = useQueryClient();
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

  const handleSubmitComment = () => {
    const trimmed = content.trim();
    if (!trimmed) {
      return;
    }

    switch (`${mode.type}-${mode.action}` as const) {
      case 'comment-create':
        createCommentMutate({ postId, content: trimmed }, { onSuccess: reset });
        break;

      // @ TODO: 댓글 수정, 대댓글 작성, 대댓글 수정 api 연동 필요.
      // case 'comment-edit':
      //   updateCommentMutate({
      //     postId,
      //     commentId: mode.commentId,
      //     content: trimmed,
      //   });
      //   break;
      // case 'reply-create':
      //   createReplyMutate(
      //     { postId, parentCommentId: mode.parentCommentId, content: trimmed },
      //     { onSuccess: reset },
      //   );
      //   break;
      // case 'reply-edit':
      //   updateReplyMutate({
      //     postId,
      //     commentId: mode.commentId,
      //     content: trimmed,
      //   });
      //   break;
    }
  };

  return (
    <>
      <FeedContent postId={postId} />
      <CommentInputBox
        value={content}
        onChange={handleChange}
        errorState={isErrorState}
        onSubmit={handleSubmitComment}
      />
    </>
  );
};

export default DetailSection;
