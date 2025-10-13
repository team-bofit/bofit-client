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
  _prev: prev,
  action,
}: ComposeModeReducerType): InputBoxMode => {
  switch (action.type) {
    case 'COMMENT_EDIT':
      return {
        type: 'comment',
        action: 'edit',
        postId,
        commentId: action.commentId,
        initialContent: action.initialContent,
        images: action.images ?? [],
      };
    case 'REPLY_CREATE':
      return {
        type: 'reply',
        action: 'create',
        postId,
        parentCommentId: action.parentCommentId,
      };
    case 'REPLY_EDIT':
      return {
        type: 'reply',
        action: 'edit',
        postId,
        commentId: action.commentId,
        initialContent: action.initialContent,
      };
    case 'REMOVE_IMAGE':
      if (prev.type === 'comment' && prev.action === 'edit') {
        return { ...prev, images: [] };
      }
      return prev;
    case 'RESET':
    default:
      return { type: 'comment', action: 'create', postId };
  }
};
