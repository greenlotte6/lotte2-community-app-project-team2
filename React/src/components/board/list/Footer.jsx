import React from 'react'
import {Delete_Button} from './Delete_Button';
import {Page} from "./Page";
import {Write_Button} from './Write_Button';

export const Footer = () => {
  return <div className="footer">
    <Delete_Button/>
    <Page/>
    <Write_Button/>
  </div>;
}
