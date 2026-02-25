export const isPostAuthor = (
  writerId?: number | null,
  userId?: number | null,
) => {
  if (writerId == null || userId == null) {
    return false;
  }

  return writerId === userId;
};
