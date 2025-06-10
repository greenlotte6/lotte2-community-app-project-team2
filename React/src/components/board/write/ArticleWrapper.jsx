import React from 'react'
import { MoveListButton } from './MoveListButton';
import { PostForm } from './PostForm';

const ArticleWrapper = () => {
  return (
    <div class="article-wrapper">
      <MoveListButton />
      <PostForm />
    </div>
  );
}

export default ArticleWrapper