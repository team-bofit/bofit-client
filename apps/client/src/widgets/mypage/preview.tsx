import { useSuspenseQuery } from '@tanstack/react-query';

import { Tab } from '@bds/ui';

import EmptyPlaceholder from '@widgets/community/components/empty-placeholder/empty-placeholder';

import { USER_QUERY_OPTIONS } from '@shared/api/domain/mypage/queries';

import PostPreview from './post-preview';

import * as styles from './preview.css';

const Preview = () => {
  const { data: mePostData } = useSuspenseQuery(USER_QUERY_OPTIONS.ME_POST());

  const posts = mePostData?.data?.content ?? [];

  return (
    <section className={styles.previewContainer}>
      <div>
        <Tab.Container initialValue="내 글" backgroundColor="white">
          <Tab.List>
            <Tab.Item value="내 글" />
            <Tab.Item value="내 댓글" />
          </Tab.List>
        </Tab.Container>
      </div>

      {posts.length === 0 ? (
        <div className={styles.previewEmptyContainer}>
          <EmptyPlaceholder content="아직 작성한 글이 없어요" />
        </div>
      ) : (
        <div className={styles.previewContentSection}>
          {posts.map((post) => (
            <PostPreview
              key={post.id}
              title={post.title ?? ''}
              content={post.content ?? ''}
              commentCount={post.commentCount ?? 0}
              createdAt={post.createdAt ?? ''}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Preview;
