import React from 'react'
import { Box } from './box';
import { CommentSection } from './CommentSection';
import { Button } from './Button';

export const Article_Wrapper = () => {
  return (
    <div className="article-wrapper">
      <a href="#" class="move-list">
        &lt; 목록으로
      </a>
      <Box/>
      <CommentSection/>
      <Button/>
    </div>
  );
}