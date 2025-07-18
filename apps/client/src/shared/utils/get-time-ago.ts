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
