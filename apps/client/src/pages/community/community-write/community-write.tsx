import { ChangeEvent, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Input, Navigation, TextButton, Title } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import CommunityImageUploader from '@widgets/community/components/community-image-uploader/community-image-uploader';
import CommunityLine from '@widgets/community/components/community-line/community-line';
import FilterDropDown from '@widgets/community/components/filter-dropdown/filter-dropdown';
import { categoryOptions } from '@widgets/community/configs/category-config';
import { PLACEHOLDER } from '@widgets/community/constant/input-placeholder';
import { CategoryType } from '@widgets/community/types/category-type';

import { COMMUNITY_MUTATION_OPTIONS } from '@shared/api/domain/community/queries';
import {
  MUTATION_QUERY_OPTIONS,
  uploadImageToS3,
} from '@shared/api/domain/queries';
import { COMMUNITY_QUERY_KEY } from '@shared/api/keys/query-key';
import {
  LIMIT_LONG_TEXT,
  LIMIT_SHORT_TEXT,
} from '@shared/constants/text-limits';
import { useLimitedInput } from '@shared/hooks/use-limited-input';
import { routePath } from '@shared/router/path';
import { extractS3Urls } from '@shared/utils/utils';

import * as styles from './community-write.css';

const CommunityWrite = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [uploadedImages, setUploadedImages] = useState<
    { file: File; previewUrl: string }[]
  >([]);

  const { isErrorState } = useLimitedInput(LIMIT_SHORT_TEXT, title.length);

  const { mutate: postFeedMutate, isPending } = useMutation({
    ...COMMUNITY_MUTATION_OPTIONS.POST_FEED(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: COMMUNITY_QUERY_KEY.FEED_PREVIEW(),
      });
      navigate(routePath.COMMUNITY);
    },
  });

  const { mutate: postImageUploadMutate } = useMutation({
    ...MUTATION_QUERY_OPTIONS.POST_IMAGE(),
  });

  const isDisabled =
    !(title.trim() && content.trim() && category?.value) || isPending;

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= LIMIT_SHORT_TEXT) {
      setTitle(e.target.value);
    }
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= LIMIT_LONG_TEXT) {
      setContent(e.target.value);
    }
  };

  const handleCategory = (option: CategoryType) => {
    setCategory(option);
  };

  const handleImageChange = (files: FileList) => {
    const newImages = Array.from(files).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setUploadedImages((prev) => [...prev, ...newImages]);
  };

  const handleRemoveImage = (urlToRemove: string) => {
    setUploadedImages((prev) =>
      prev.filter((item) => item.previewUrl !== urlToRemove),
    );
  };

  const uploadAllImages = async () => {
    if (uploadedImages.length === 0) {
      return [];
    }

    const data = await new Promise<{ presignedUrls: string[] }>(
      (resolve, reject) =>
        postImageUploadMutate(
          uploadedImages.map((item) => item.file.type),
          {
            onSuccess: resolve,
            onError: reject,
          },
        ),
    );
    await Promise.all(
      data.presignedUrls.map((url, idx) =>
        uploadImageToS3(url, uploadedImages[idx].file),
      ),
    );

    return extractS3Urls(data.presignedUrls);
  };

  const submitFeed = async (imageUrls: string[]) => {
    postFeedMutate({
      title,
      content,
      category: category!.value,
      imageUrls,
    });
  };

  const handlePostFeed = async () => {
    if (isDisabled) {
      return null;
    }
    return submitFeed(await uploadAllImages());
  };

  return (
    <div className={styles.container}>
      <Navigation
        title="글쓰기"
        leftIcon={<Icon name="caret_left_lg" width="2.4rem" height="2.4rem" />}
        onClickLeft={handleGoBack}
        rightIcon={
          <TextButton color="primary" disabled={isDisabled} size="sm">
            업로드
          </TextButton>
        }
        onClickRight={handlePostFeed}
        isTextButton
      />
      <div className={styles.postContainer}>
        <div className={styles.postHeader}>
          <div className={styles.postTitle}>
            <Title fontStyle="eb_md">제목</Title>
            <FilterDropDown
              optionTitle={category ? category.label : '카테고리 선택'}
              rightIcon={<Icon name="caret_down_sm" />}
              isIconRotate
            >
              {categoryOptions.map((option) => (
                <TextButton
                  key={option.value}
                  size="sm"
                  color={category?.value === option.value ? 'primary' : 'black'}
                  onClick={() => handleCategory(option)}
                >
                  {option.label}
                </TextButton>
              ))}
            </FilterDropDown>
          </div>
          <Input
            value={title}
            onChange={handleTitleChange}
            bgColor="background"
            errorState={isErrorState}
            placeholder={PLACEHOLDER.TITLE}
          />
        </div>
        <div className={styles.postContent}>
          <Title fontStyle="eb_md">내용</Title>
          <CommunityLine value={content} onChange={handleContentChange} />
          {uploadedImages.length > 0 && (
            <div className={styles.imageContainer}>
              {uploadedImages.map((image) => (
                <div key={image.previewUrl} className={styles.imageItem}>
                  <img className={styles.postImage} src={image.previewUrl} />
                  <TextButton
                    color="black"
                    size="sm"
                    onClick={() => handleRemoveImage(image.previewUrl)}
                  >
                    삭제
                  </TextButton>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <CommunityImageUploader onChange={handleImageChange} />
    </div>
  );
};

export default CommunityWrite;
