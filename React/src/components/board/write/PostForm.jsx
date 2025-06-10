import React from 'react'
import { TypeSelector } from "./TypeSelector";
import { TitleInput } from "./TitleInput";
import { FileUploader } from "./FileUploader";
import { ContentInput } from "./ContentInput";
import { CommentSetting } from "./CommentSetting";
import { FormButtons } from "./FormButtons";


export const PostForm = () => {
  return (
    <form action="#">
      <TypeSelector />
      <TitleInput />
      <FileUploader />
      <ContentInput />
      <hr />
      <CommentSetting />
      <FormButtons />
    </form>
  );
}
