/**
 * presigned URL 배열에서 실제 S3 URL만 추출
 *
 * @param {string[]} presignedUrls - presigned URL 배열
 * @returns {string[]} 쿼리 스트링을 제거한 실제 접근 가능한 S3 URL 배열
 *
 * @example
 * const urls = [
 *   "https://bucket.s3.amazonaws.com/image.jpg?X-Amz-Signature=xxx",
 *   "https://bucket.s3.amazonaws.com/image2.jpg?X-Amz-Signature=yyy"
 * ];
 * extractS3Urls(urls);
 * // ["https://bucket.s3.amazonaws.com/image.jpg", "https://bucket.s3.amazonaws.com/image2.jpg"]
 */
export const extractS3Urls = (presignedUrls: string[]): string[] => {
  return presignedUrls.map((url) => url.split('?')[0]);
};

/**
 * 특정 시간으로부터 얼마나 지났는지 "몇 분 전 / 몇 시간 전 / YYYY-MM-DD" 형식으로 반환
 *
 * @param {string} [createdAt] - 기준 시간 (ISO 문자열)
 * @returns {string} 경과 시간 문자열, `createdAt`이 없거나 유효하지 않으면 빈 문자열 반환
 *
 * @example
 * getTimeAgo("2025-10-06T05:00:00Z"); // "30분 전" 혹은 "2025-10-06"
 */
export const getTimeAgo = (createdAt?: string): string => {
  if (!createdAt) {
    return '';
  }

  const now = new Date();
  const created = new Date(createdAt);

  const createdTime = created.getTime();
  if (isNaN(createdTime)) {
    return '';
  }

  const diffMs = now.getTime() - created.getTime();

  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);

  if (diffHour < 1) {
    return `${Math.max(1, diffMin)}분 전`;
  }

  if (diffHour < 24) {
    return `${diffHour}시간 전`;
  }

  const year = created.getFullYear();
  const month = String(created.getMonth() + 1).padStart(2, '0');
  const day = String(created.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

/**
 * 숫자 가격을 한국 원화 표기법으로 포맷팅
 *
 * @param {number} price - 포맷팅할 가격
 * @returns {string} 콤마가 포함된 가격 문자열
 *
 * @example
 * formatPrice(1234567); // "1,234,567"
 */
export const formatPrice = (price: number): string => {
  return price.toLocaleString('ko-KR');
};
