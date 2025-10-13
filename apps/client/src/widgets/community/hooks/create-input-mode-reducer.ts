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
  _prev,
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
        deleteImageIds: [],
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
        commentReplyId: action.commentReplyId,
        initialContent: action.initialContent,
        images: action.images ?? [],
        deleteImageIds: [],
      } as const;

    case 'COMMENT_EDIT_DELETE_IMAGE': {
      if (!(_prev.type === 'comment' && _prev.action === 'edit')) {
        return _prev;
      }
      const nextImages = (_prev.images ?? []).filter(
        (img) => img.imageId !== action.imageId,
      );
      const nextDelete = [...(_prev.deleteImageIds ?? []), action.imageId];
      return { ..._prev, images: nextImages, deleteImageIds: nextDelete };
    }

    case 'REPLY_EDIT_DELETE_IMAGE': {
      if (!(_prev.type === 'reply' && _prev.action === 'edit')) {
        return _prev;
      }
      const nextImages = (_prev.images ?? []).filter(
        (img) => img.imageId !== action.imageId,
      );
      const nextDelete = [...(_prev.deleteImageIds ?? []), action.imageId];
      return { ..._prev, images: nextImages, deleteImageIds: nextDelete };
    }

    case 'RESET':
    default:
      return { type: 'comment', action: 'create', postId } as const;
  }
};
