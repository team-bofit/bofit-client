export const getTimeAgo = (createdAt?: string): string => {
  if (!createdAt) {
    return '';
  }
  const now = new Date();
  const created = new Date(createdAt);

  const createdTime = created.getTime();
  if (isNaN(createdTime)) {
    return '방금 전';
  }

  const diffMs = now.getTime() - created.getTime();

  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) {
    return '방금 전';
  }
  if (diffMin < 60) {
    return `${diffMin}분 전`;
  }
  if (diffHour < 24) {
    return `${diffHour}시간 전`;
  }
  return `${diffDay}일 전`;
};
