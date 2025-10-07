import { mutationOptions } from '@tanstack/react-query';
import ky from '@toss/ky';

import { END_POINT } from '../config/end-point';
import { api } from '../config/instance';
import { SHARED_MUTATION_KEY } from '../keys/query-key';
import { ImageUploadResponse } from '../types/types';

export const MUTATION_QUERY_OPTIONS = {
  POST_IMAGE: () => {
    return mutationOptions({
      mutationKey: SHARED_MUTATION_KEY.IMAGE_UPLOAD(),
      mutationFn: (mediaType: string[]) => postImage(mediaType),
    });
  },
};

// =============================================================================
// MUTATION FUNCTIONS
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
