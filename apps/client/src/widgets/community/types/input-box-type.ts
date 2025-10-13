import { Image } from '@shared/types/type.ts';

export type InputBoxMode =
  | { type: 'comment'; action: 'create'; postId: string; images?: Image[] }
  | {
      type: 'comment';
      action: 'edit';
      postId: string;
      commentId: number;
      initialContent: string;
      images?: Image[];
      deleteImageIds?: number[];
    }
  | { type: 'reply'; action: 'create'; postId: string; parentCommentId: number }
  | {
      type: 'reply';
      action: 'edit';
      postId: string;
      commentId: number;
      commentReplyId: number;
      initialContent: string;
      images?: Image[];
      deleteImageIds?: number[];
    };

export type ReducerAction =
  | {
      type: 'COMMENT_EDIT';
      commentId: number;
      initialContent: string;
      images?: Image[];
    }
  | { type: 'REPLY_CREATE'; parentCommentId: number }
  | {
      type: 'REPLY_EDIT';
      commentId: number;
      commentReplyId: number;
      initialContent: string;
      images?: Image[];
    }
  | { type: 'COMMENT_EDIT_DELETE_IMAGE'; imageId: number }
  | { type: 'REPLY_EDIT_DELETE_IMAGE'; imageId: number }
  | { type: 'RESET' };
