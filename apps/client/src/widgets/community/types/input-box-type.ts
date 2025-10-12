export type InputBoxMode =
  | { type: 'comment'; action: 'create'; postId: string }
  | {
      type: 'comment';
      action: 'edit';
      postId: string;
      commentId: number;
      initialContent: string;
    }
  | { type: 'reply'; action: 'create'; postId: string; parentCommentId: number }
  | {
      type: 'reply';
      action: 'edit';
      postId: string;
      commentId: number;
      commentReplyId: number;
      initialContent: string;
    };

export type ReducerAction =
  | { type: 'COMMENT_EDIT'; commentId: number; initialContent: string }
  | { type: 'REPLY_CREATE'; parentCommentId: number }
  | {
      type: 'REPLY_EDIT';
      commentId: number;
      commentReplyId: number;
      initialContent: string;
    }
  | { type: 'RESET' };
