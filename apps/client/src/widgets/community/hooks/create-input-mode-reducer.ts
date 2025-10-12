import type {
  InputBoxMode,
  ReducerAction,
} from '@widgets/community/types/input-box-type';

interface ComposeModeReducerType {
  postId: string;
  _prev: InputBoxMode;
  action: ReducerAction;
}

export const createInputModeReducer = ({
  postId,
  action,
}: ComposeModeReducerType) => {
  switch (action.type) {
    case 'COMMENT_EDIT':
      return {
        type: 'comment',
        action: 'edit',
        postId,
        commentId: action.commentId,
        initialContent: action.initialContent,
      } as const;
    case 'REPLY_CREATE':
      return {
        type: 'reply',
        action: 'create',
        postId,
        parentCommentId: action.parentCommentId,
      } as const;
    case 'REPLY_EDIT':
      return {
        type: 'reply',
        action: 'edit',
        postId,
        commentId: action.commentId,
        initialContent: action.initialContent,
      } as const;
    case 'RESET':
    default:
      return { type: 'comment', action: 'create', postId } as const;
  }
};
