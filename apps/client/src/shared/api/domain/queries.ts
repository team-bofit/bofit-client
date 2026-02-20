import ky from '@toss/ky';

import { END_POINT } from '../config/end-point';
import { api } from '../config/instance';
import { ImageUploadResponse } from '../types/types';

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
