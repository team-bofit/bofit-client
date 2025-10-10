import { ChangeEvent, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

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

import * as styles from './community-edit.css';

const CommunityEdit = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { postId } = useParams<{ postId: string }>();
  const location = useLocation();
  const state = location.state as {
    title: string;
    content: string;
    category?: { category: string; description: string };
  };
  const [title, setTitle] = useState(state.title);
  const [content, setContent] = useState(state.content);

  const getInitialCategory = () => {
    return (
      categoryOptions.find(
        (option) => option.value === state.category?.category,
      ) ?? null
    );
  };

  const [category, setCategory] = useState(getInitialCategory);
  const { isErrorState } = useLimitedInput(LIMIT_SHORT_TEXT, title.length);

  if (!postId) {
    throw new Error('게시글 Id가 존재하지 않습니다.');
  }

  const { mutate, isPending } = useMutation({
    ...COMMUNITY_MUTATION_OPTIONS.PUT_FEED(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: COMMUNITY_QUERY_KEY.FEED_DETAIL(postId),
      });
      navigate(routePath.COMMUNITY_DETAIL.replace(':postId', postId));
    },
  });

  const handlePutFeed = () => {
    if (isDisabled || !category) {
      return;
    }
    //@TODO 타입 에러로 임시 작성해둠. 추후 구현 시 수정 필요
    mutate({
      body: {
        newTitle: title,
        newContent: content,
        newCategory: category.value,
        deleteImageIds: [],
        updatedImages: [],
      },
    });
  };

  const isDisabled =
    !(
      title.trim().length > 0 &&
      content.trim().length > 0 &&
      Boolean(category?.value)
    ) || isPending;

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
            완료
          </TextButton>
        }
        isTextButton={true}
      />
      <div className={styles.postContainer}>
        <div className={styles.postHeader}>
          <div className={styles.postTitle}>
            <Title fontStyle="eb_md">제목</Title>
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
          <Title fontStyle="eb_md">내용</Title>
          <CommunityLine value={content} onChange={handleContentChange} />
        </div>
      </div>
    </div>
  );
};

export default CommunityEdit;
