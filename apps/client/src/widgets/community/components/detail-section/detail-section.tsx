import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import CommentInputBox from '@widgets/community/components/comment-input-box/comment-input-box';
import FeedContent from '@widgets/community/components/feed-content/feed-content';
import { useChangeInputMode } from '@widgets/community/context/input-mode-context';
import { useControlledInputBox } from '@widgets/community/hooks/use-controll-input-box';
import { ReplyImage } from '@widgets/community/types/reply-image.type';
import { isValidImage } from '@widgets/community/utils/type-guard';

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
  const { mode, dispatch } = useChangeInputMode();
  const { content, handleChange, reset } = useControlledInputBox(mode);
  const { isErrorState } = useLimitedInput(LIMIT_MEDIUM_TEXT, content.length);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const prevModeRef = useRef(mode);

  const queryClient = useQueryClient();

  useEffect(() => {
    const isStillCreatingMode =
      prevModeRef.current.action === 'create' && mode.action === 'create';
    const typeChanged = prevModeRef.current.type !== mode.type;

    prevModeRef.current = mode;

    if (mode.type === 'comment' && mode.action === 'edit') {
      const remaining = (mode.images ?? []).filter(
        (img) => !(mode.deleteImageIds ?? []).includes(img.imageId ?? -1),
      );

      if (remaining.length === 0) {
        setImagePreview(null);
        setImageFile(null);
        return;
      }

      setImagePreview(remaining[0]?.imageUrl ?? null);
      setImageFile(null);
      return;
    }

    if (mode.type === 'reply' && mode.action === 'edit') {
      const remaining = ((mode.images as ReplyImage[]) ?? []).filter(
        (img) =>
          !(mode.deleteImageIds ?? []).includes(
            (img.imageId ?? img.commentReplyImageId ?? -1) as number,
          ),
      );

      if (remaining.length === 0) {
        setImagePreview(null);
        setImageFile(null);
        return;
      }

      setImagePreview(remaining[0]?.imageUrl ?? null);
      setImageFile(null);
      return;
    }

    if (isStillCreatingMode && typeChanged) {
      return;
    }

    setImagePreview(null);
    setImageFile(null);
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

  const onSubmitComment = async () => {
    const trimmed = content.trim();
    if (!trimmed && !imageFile) {
      return;
    }

    let uploadedUrl: string | undefined;
    if (imageFile) {
      const { presignedUrls } = await postImage([imageFile.type]);
      const presignedUrl = presignedUrls[0];
      await uploadImageToS3(presignedUrl, imageFile);
      uploadedUrl = extractS3Urls([presignedUrl])[0];
    }

    const imageUrls = uploadedUrl ? [uploadedUrl] : [];

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

        const hasNewImage = !!uploadedUrl;
        const prevImages = mode.images ?? [];

        const baseDeletes = (mode.deleteImageIds ?? []).filter(
          (id): id is number => typeof id === 'number',
        );

        const remaining = prevImages.filter(
          (img) => !baseDeletes.includes(img.imageId ?? -1),
        );

        let updatedImages: {
          id?: number;
          imageUrl?: string;
          sequence?: number;
        }[] = [];
        let deleteImageIds = [...baseDeletes];

        if (hasNewImage) {
          const prevIds = prevImages
            .map((img) => img.imageId)
            .filter((id): id is number => typeof id === 'number');

          deleteImageIds = Array.from(new Set([...deleteImageIds, ...prevIds]));
          if (uploadedUrl) {
            updatedImages = [{ imageUrl: uploadedUrl, sequence: 1 }];
          }
        } else {
          updatedImages = remaining
            .filter(
              (img): img is { imageId: number } =>
                typeof img.imageId === 'number',
            )
            .map((img, idx) => ({ id: img.imageId, sequence: idx + 1 }));
        }

        const body = {
          content: trimmed || mode.initialContent || '',
          updatedImages,
          deleteImageIds,
        };

        updateCommentMutate(
          { postId, commentId: mode.commentId, body },
          {
            onSuccess: () => {
              reset();
              setImageFile(null);
              setImagePreview(null);
              dispatch({ type: 'RESET' });
            },
          },
        );
        break;
      }

      case 'reply-create': {
        if (!('parentCommentId' in mode)) {
          break;
        }
        if (!trimmed) {
          return;
        }

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
              setImageFile(null);
              setImagePreview(null);
              dispatch({ type: 'RESET' });
            },
          },
        );
        break;
      }

      case 'reply-edit': {
        if (!('commentId' in mode) || !('commentReplyId' in mode)) {
          break;
        }

        const trimmed = content.trim();
        const hasNewImage = !!uploadedUrl;

        const prevImages = ((mode.images as ReplyImage[]) ?? []).map((img) => ({
          imageId: img.imageId ?? img.commentReplyImageId,
          imageUrl: img.imageUrl,
        }));

        const baseDeletes = (mode.deleteImageIds ?? []).filter(
          (id): id is number => typeof id === 'number',
        );

        const remaining = prevImages.filter(
          (img) => !baseDeletes.includes(img.imageId ?? -1),
        );

        let updatedImages: {
          id?: number;
          imageUrl?: string;
          sequence?: number;
        }[] = [];
        let deleteImageIds = [...baseDeletes];

        if (hasNewImage) {
          const prevIds = prevImages
            .map((img) => img.imageId)
            .filter((id): id is number => typeof id === 'number');

          deleteImageIds = Array.from(new Set([...deleteImageIds, ...prevIds]));
          if (uploadedUrl) {
            updatedImages = [{ imageUrl: uploadedUrl, sequence: 1 }];
          }
        } else {
          updatedImages = remaining
            .filter(isValidImage)
            .map((img, idx) => ({ id: img.imageId, sequence: idx + 1 }));
        }

        const body = {
          content: trimmed || mode.initialContent || '',
          updatedImages,
          deleteImageIds,
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
              setImageFile(null);
              setImagePreview(null);
              dispatch({ type: 'RESET' });
            },
          },
        );
        break;
      }
    }
  };

  const handleImageChange = (file: File | null) => {
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleClearImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const focusKey = `${mode.type}-${mode.action}-${'commentId' in mode ? mode.commentId : ''}-${'commentReplyId' in mode ? mode.commentReplyId : ''}-${imagePreview ?? ''}`;

  return (
    <>
      <FeedContent postId={postId} />
      <CommentInputBox
        key={focusKey}
        value={content}
        onChange={handleChange}
        errorState={isErrorState}
        onSubmit={onSubmitComment}
        focusKey={focusKey}
        selectedFile={imageFile}
        previewUrl={imagePreview ?? undefined}
        onImageChange={handleImageChange}
        onClearImage={handleClearImage}
      />
    </>
  );
};

export default DetailSection;
