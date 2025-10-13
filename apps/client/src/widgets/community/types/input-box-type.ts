import { components } from '@shared/types/schema';

export type UpdateImage = components['schemas']['UpdateImageRequest'];

export type InputBoxMode =
  | { type: 'comment'; action: 'create'; postId: string }
  | {
      type: 'comment';
      action: 'edit';
      postId: string;
      commentId: number;
      initialContent: string;
      initialImages?: UpdateImage[];
    }
  | { type: 'reply'; action: 'create'; postId: string; parentCommentId: number }
  | {
      type: 'reply';
      action: 'edit';
      postId: string;
      commentId: number;
      commentReplyId: number;
      initialContent: string;
      initialImages?: UpdateImage[];
    };

export type ReducerAction =
  | {
      type: 'COMMENT_EDIT';
      commentId: number;
      initialContent: string;
      initialImages?: UpdateImage[];
    }
  | { type: 'REPLY_CREATE'; parentCommentId: number }
  | {
      type: 'REPLY_EDIT';
      commentId: number;
      commentReplyId: number;
      initialContent: string;
      initialImages?: UpdateImage[];
    }
  | { type: 'RESET' };
