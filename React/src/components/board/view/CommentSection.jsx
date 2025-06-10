import React from 'react'
import { Comment } from './Comment'
import { CommentMenu } from './CommentMenu'
import { CommentInput } from './CommentInput'

export const CommentSection = () => {
  return (
    <>
      <Comment />
      <CommentMenu />
      <CommentInput />
    </>
  );
}
