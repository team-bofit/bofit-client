import { useCallback, useState } from 'react';

import { postImage, uploadImageToS3 } from '@shared/api/domain/queries';
import { extractS3Urls } from '@shared/utils/utils';

const uploadImageFilesInternal = async (files: File[]): Promise<string[]> => {
  if (files.length === 0) {
    return [];
  }

  const { presignedUrls } = await postImage(files.map((file) => file.type));

  await Promise.all(
    files.map((file, idx) => uploadImageToS3(presignedUrls[idx], file)),
  );

  return extractS3Urls(presignedUrls);
};

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(false);

  const uploadImageFiles = useCallback(async (files: File[]) => {
    setIsUploading(true);
    setError(false);

    try {
      return await uploadImageFilesInternal(files);
    } catch (e) {
      setError(true);
      throw e;
    } finally {
      setIsUploading(false);
    }
  }, []);

  return { uploadImageFiles, isUploading, error };
};
