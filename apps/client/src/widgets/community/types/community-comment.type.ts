export interface CommentType {
  content?: string;
  writerNickName?: string;
  createdAt?: string;
  onCommentDeleteClick?: VoidFunction;
  profileImage?: string;
  isCommentOwner: boolean;
}
