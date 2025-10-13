import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import CommentInputBox from '@widgets/community/components/comment-input-box/comment-input-box';
import FeedContent from '@widgets/community/components/feed-content/feed-content';
import { useChangeInputMode } from '@widgets/community/context/input-mode-context';
import { useControlledInputBox } from '@widgets/community/hooks/use-controll-input-box';

import { COMMUNITY_MUTATION_OPTIONS } from '@shared/api/domain/community/queries';
import { postImage, uploadImageToS3 } from '@shared/api/domain/queries';
import { COMMUNITY_QUERY_KEY } from '@shared/api/keys/query-key';
import { LIMIT_MEDIUM_TEXT } from '@shared/constants/text-limits';
import { useLimitedInput } from '@shared/hooks/use-limited-input';
import { extractS3Urls } from '@shared/utils/utils';

interface DetailSectionProps {
  postId: string;
}

const DetailSection = ({ postId }: DetailSectionProps) => {
  const { mode } = useChangeInputMode();
  const { content, handleChange, reset } = useControlledInputBox(mode);
  const { isErrorState } = useLimitedInput(LIMIT_MEDIUM_TEXT, content.length);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (
      mode.type === 'comment' &&
      mode.action === 'edit' &&
      mode.images?.length
    ) {
      setImagePreview(mode.images[0].imageUrl ?? null);
      setImageFile(null);
    } else {
      setImagePreview(null);
      setImageFile(null);
    }
  }, [mode]);

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

  const onSubmitComment = async () => {
    const trimmed = content.trim();
    if (!trimmed && !imageFile) {
      return;
    }

    let imageUrls: string[] = [];
    if (imageFile) {
      const response = await postImage([imageFile.type]);
      const presignedUrl = response.presignedUrls[0];
      await uploadImageToS3(presignedUrl, imageFile);
      imageUrls = [extractS3Urls([presignedUrl])[0]];
    }

    switch (`${mode.type}-${mode.action}` as const) {
      case 'comment-create':
        createCommentMutate(
          { postId, content: trimmed, imageUrls },
          { onSuccess: reset },
        );
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
  const handleImageChange = (file: File | null) => {
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const focusKey = `${mode.type}-${mode.action}-${'commentId' in mode ? mode.commentId : ''}`;

  return (
    <>
      <FeedContent postId={postId} />
      <CommentInputBox
        value={content}
        onChange={handleChange}
        errorState={isErrorState}
        onSubmit={onSubmitComment}
        focusKey={focusKey}
        selectedFile={imageFile}
        previewUrl={imagePreview ?? undefined}
        onImageChange={handleImageChange}
        onClearImage={clearImage}
      />
    </>
  );
};

export default DetailSection;
