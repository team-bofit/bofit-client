import { api } from '@shared/api/config/instance';
import { END_POINT } from '@shared/constants/end-point';
import { paths } from '@shared/types/schema';

export type communityListResponse =
  paths['/posts']['get']['responses']['200']['content']['*/*']['data'];

export const getPosts = async ({
  pageParam,
}: { pageParam?: number } = {}): Promise<communityListResponse> => {
  const cursorQuery = pageParam ? `&cursor=${pageParam}` : '';
  const response = await api
    .get(`${END_POINT.COMMUNITY.GET_POSTS_INFO}?size=15${cursorQuery}`)
    .json<communityListResponse>();
  return response.data;
};
