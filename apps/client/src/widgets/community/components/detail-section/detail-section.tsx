import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import CommentInputBox from '@widgets/community/components/comment-input-box/comment-input-box';
import FeedContent from '@widgets/community/components/feed-content/feed-content';

import { COMMUNITY_MUTATION_OPTIONS } from '@shared/api/domain/community/queries';
import { postImage, uploadImageToS3 } from '@shared/api/domain/queries';
import { COMMUNITY_QUERY_KEY } from '@shared/api/keys/query-key';
import {
  LIMIT_MEDIUM_TEXT,
  LIMIT_SHORT_TEXT,
} from '@shared/constants/text-limits';
import { useLimitedInput } from '@shared/hooks/use-limited-input';
import { extractS3Urls } from '@shared/utils/utils';

interface DetailSectionProps {
  postId: string;
}

const DetailSection = ({ postId }: DetailSectionProps) => {
  const [content, setContent] = useState('');
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= LIMIT_SHORT_TEXT) {
      setContent(e.target.value);
    }
  };

  const onSubmitComment = async (file?: File) => {
    if (!content.trim() && !file) {
      return;
    }

    let imageUrls: string[] = [];
    if (file) {
      const response = await postImage([file.type]);
      const presignedUrl = response.presignedUrls[0];
      await uploadImageToS3(presignedUrl, file);
      imageUrls = [extractS3Urls([presignedUrl])[0]];
    }

    createCommentMutate(
      { postId, content: content.trim(), imageUrls },
      { onSuccess: () => setContent('') },
    );
  };

  return (
    <>
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

export default DetailSection;
