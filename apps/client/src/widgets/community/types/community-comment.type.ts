export interface CommentType {
  content?: string;
  writerNickName?: string;
  createdAt?: string;
  onClickDelete?: VoidFunction;
  profileImage?: string;
  isCommentOwner: boolean;
}
