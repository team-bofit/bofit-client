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
    }
  | { type: 'reply'; action: 'create'; postId: string; parentCommentId: number }
  | {
      type: 'reply';
      action: 'edit';
      postId: string;
      commentId: number;
      initialContent: string;
    };

export type ReducerAction =
  | {
      type: 'COMMENT_EDIT';
      commentId: number;
      initialContent: string;
      images?: Image[];
    }
  | { type: 'REPLY_CREATE'; parentCommentId: number }
  | { type: 'REPLY_EDIT'; commentId: number; initialContent: string }
  | { type: 'REMOVE_IMAGE' }
  | { type: 'RESET' };
