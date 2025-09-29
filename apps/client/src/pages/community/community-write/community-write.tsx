import { ChangeEvent, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Input, Navigation, TextButton, Title } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import CommunityLine from '@widgets/community/components/community-line/community-line';
import FilterDropDown from '@widgets/community/components/filter-dropdown/filter-dropdown';
import { categoryOptions } from '@widgets/community/configs/category-config';
import { PLACEHOLDER } from '@widgets/community/constant/input-placeholder';
import { CategoryType } from '@widgets/community/types/category-type';

import { COMMUNITY_MUTATION_OPTIONS } from '@shared/api/domain/community/queries';
import { COMMUNITY_QUERY_KEY } from '@shared/api/keys/query-key';
import {
  LIMIT_LONG_TEXT,
  LIMIT_SHORT_TEXT,
} from '@shared/constants/text-limits';
import { useLimitedInput } from '@shared/hooks/use-limited-input';
import { routePath } from '@shared/router/path';

import * as styles from './community-write.css';

const COMMUNITY_CONTENT = {
  TITLE: {
    HEADER: '제목',
    BODY: '내용',
  },
  BUTTON: '업로드',
};

const CommunityWrite = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<CategoryType | null>(null);

  const queryClient = useQueryClient();
  const { isErrorState } = useLimitedInput(LIMIT_SHORT_TEXT, title.length);
  const { mutate, isPending } = useMutation({
    ...COMMUNITY_MUTATION_OPTIONS.POST_FEED(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: COMMUNITY_QUERY_KEY.FEED_PREVIEW(),
      });
      navigate(routePath.COMMUNITY);
    },
  });

  const handlePostFeed = () => {
    if (isDisabled || !category) {
      return;
    }

    // @TODO  imageUrls 는 타입 에러로 작성해둠. 추후 구현 시 수정 필요
    mutate({
      title,
      content,
      category: category.value,
      imageUrls: [],
    });
  };

  const isTitleValid = title.trim().length > 0;
  const isContentValid = content.trim().length > 0;
  const isCategoryValid = Boolean(category?.value);

  const isDisabled =
    !(isTitleValid && isContentValid && isCategoryValid) || isPending;

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

  return (
    <div className={styles.container}>
      <Navigation
        title="글쓰기"
        leftIcon={<Icon name="caret_left_lg" width="2.4rem" height="2.4rem" />}
        onClickLeft={handleGoBack}
        rightIcon={
          <TextButton color="primary" disabled={isDisabled} size="sm">
            {COMMUNITY_CONTENT.BUTTON}
          </TextButton>
        }
        onClickRight={handlePostFeed}
        isTextButton={true}
      />
      <div className={styles.postContainer}>
        <div className={styles.postHeader}>
          <div className={styles.postTitle}>
            <Title fontStyle="eb_md">{COMMUNITY_CONTENT.TITLE.HEADER}</Title>
            <FilterDropDown
              optionTitle={category ? category.label : '카테고리 선택'}
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
          <Title fontStyle="eb_md">{COMMUNITY_CONTENT.TITLE.BODY}</Title>
          <CommunityLine value={content} onChange={handleContentChange} />
        </div>
      </div>
    </div>
  );
};

export default CommunityWrite;
