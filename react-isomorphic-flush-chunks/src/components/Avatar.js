import React from 'react';
import { Link } from 'react-router-dom';
import theme from './Avatar.css';
import AvatarImage from '../image/avatar.gif';

function Avatar() {
  return (
    <div className={theme.container}>
      <div className={theme['account-navs']}>
        <h2 className={theme['flex-1']}>头像</h2>
        <h2 className={theme['flex-1']}>
          <Link to="/account/information">信息</Link>
        </h2>
      </div>
      <img src={AvatarImage} alt="" width="100%" />
      <div>
        <a href="/">首页</a>
      </div>
    </div>
  );
}

export default Avatar;
