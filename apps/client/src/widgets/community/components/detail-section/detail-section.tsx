import { useMutation, useQueryClient } from '@tanstack/react-query';

import CommentInputBox from '@widgets/community/components/comment-input-box/comment-input-box';
import FeedContent from '@widgets/community/components/feed-content/feed-content';
import { useChangeInputMode } from '@widgets/community/context/input-mode-context';
import { useControlledInputBox } from '@widgets/community/hooks/use-controll-input-box';

import { COMMUNITY_MUTATION_OPTIONS } from '@shared/api/domain/community/queries';
import { COMMUNITY_QUERY_KEY } from '@shared/api/keys/query-key';
import { LIMIT_MEDIUM_TEXT } from '@shared/constants/text-limits';
import { useLimitedInput } from '@shared/hooks/use-limited-input';

interface DetailSectionProps {
  postId: string;
}

const DetailSection = ({ postId }: DetailSectionProps) => {
  const { mode, dispatch } = useChangeInputMode();
  const { content, handleChange, reset } = useControlledInputBox(mode);
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
  const { mutate: createReplyMutate } = useMutation({
    ...COMMUNITY_MUTATION_OPTIONS.POST_COMMENT_REPLY(),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: COMMUNITY_QUERY_KEY.COMMENTS_REPLY(
          variables.postId,
          variables.commentId,
        ),
      });
      queryClient.invalidateQueries({
        queryKey: COMMUNITY_QUERY_KEY.COMMENTS(variables.postId),
      });
    },
  });

  const { mutate: updateCommentMutate } = useMutation({
    ...COMMUNITY_MUTATION_OPTIONS.PATCH_COMMENT(),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: COMMUNITY_QUERY_KEY.COMMENTS(variables.postId),
      });
      queryClient.invalidateQueries({
        queryKey: COMMUNITY_QUERY_KEY.FEED_DETAIL(variables.postId),
      });
    },
  });

  const { mutate: updateReplyMutate } = useMutation({
    ...COMMUNITY_MUTATION_OPTIONS.PATCH_COMMENT_REPLY(),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: COMMUNITY_QUERY_KEY.COMMENTS_REPLY(
          variables.postId,
          variables.commentId,
        ),
      });
      queryClient.invalidateQueries({
        queryKey: COMMUNITY_QUERY_KEY.COMMENTS(variables.postId),
      });
    },
  });

  const handleSubmitComment = () => {
    const trimmed = content.trim();
    if (!trimmed) {
      return;
    }

    const imageUrls: string[] = [];

    switch (`${mode.type}-${mode.action}` as const) {
      case 'comment-create':
        createCommentMutate(
          { postId, content: trimmed, imageUrls },
          {
            onSuccess: () => {
              reset();
              dispatch({ type: 'RESET' });
            },
          },
        );
        break;

      case 'comment-edit': {
        if (!('commentId' in mode)) {
          break;
        }
        const body = {
          content: trimmed,
          updatedImages: [],
          deleteImageIds: [],
        };
        updateCommentMutate(
          { postId, commentId: mode.commentId, body },
          {
            onSuccess: () => {
              reset();
              dispatch({ type: 'RESET' });
            },
          },
        );
        break;
      }

      case 'reply-create': {
        const imageUrls: string[] = [];
        if ('parentCommentId' in mode) {
          createReplyMutate(
            {
              postId,
              commentId: mode.parentCommentId,
              content: trimmed,
              imageUrls,
            },
            {
              onSuccess: () => {
                reset();
                dispatch({ type: 'RESET' });
              },
            },
          );
        }
        break;
      }

      case 'reply-edit': {
        if (!('commentId' in mode) || !('commentReplyId' in mode)) {
          break;
        }

        const body = {
          content: trimmed,
          updatedImages: [],
          deleteImageIds: [],
        };

        updateReplyMutate(
          {
            postId,
            commentId: mode.commentId,
            commentReplyId: mode.commentReplyId,
            body,
          },
          {
            onSuccess: () => {
              reset();
              dispatch({ type: 'RESET' });
            },
          },
        );
        break;
      }
    }
  };

  const focusKey = `${mode.type}-${mode.action}-${'commentId' in mode ? mode.commentId : ''}`;

  return (
    <>
      <FeedContent postId={postId} />
      <CommentInputBox
        value={content}
        onChange={handleChange}
        errorState={isErrorState}
        onSubmit={handleSubmitComment}
        focusKey={focusKey}
      />
    </>
  );
};

export default DetailSection;
