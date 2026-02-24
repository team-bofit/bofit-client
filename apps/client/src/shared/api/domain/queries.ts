import { queryOptions } from '@tanstack/react-query';
import ky from '@toss/ky';

import { USER_QUERY_KEY } from '@shared/api/keys/query-key';

import { END_POINT } from '../config/end-point';
import { api } from '../config/instance';
import { ImageUploadResponse, UserProfile } from '../types/types';

// =============================================================================
// QUERY OPTIONS
// =============================================================================

export const USER_QUERY_OPTIONS = {
  PROFILE: () =>
    queryOptions({
      queryKey: USER_QUERY_KEY.PROFILE(),
      queryFn: getUserProfile,
    }),
};

// =============================================================================
// QUERY FUNCTIONS
// =============================================================================

export const getUserProfile = async (): Promise<UserProfile | null> => {
  const response = await api
    .get(END_POINT.USER.GET_USER_INFO)
    .json<UserProfile>();
  return response;
};

// =============================================================================
// IMAGE FUNCTIONS
// =============================================================================

export const postImage = async (mediaType: string[]) => {
  const response = await api
    .post(END_POINT.SHARED.IMAGE_UPLOAD, { json: { mediaType } })
    .json<ImageUploadResponse>();

  return response.data;
};

export const uploadImageToS3 = async (url: string, file: File) => {
  await ky.put(url, {
    body: file,
  });
};
