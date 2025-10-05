export interface CommentType {
  content?: string;
  writerNickName?: string;
  createdAt?: string;
  onDeleteClick?: VoidFunction;
  profileImage?: string;
  isCommentOwner: boolean;
}
