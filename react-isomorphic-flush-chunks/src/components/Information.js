import React from 'react';
import { Link } from 'react-router-dom';
import Emoji from './Emoji';
import theme from './Infomation.css';

const labelStyle = {
  width: 120
};

function Information() {
  return (
    <div className={theme.container}>
      <div className={theme['account-navs']}>
        <h2 className={theme['flex-1']}>
          <Link to="/account/avatar">头像</Link>
        </h2>
        <h2 className={theme['flex-1']}>信息</h2>
      </div>
      <ul className={theme['account-information']}>
        <li className={theme.flex}>
          <span style={labelStyle}><Emoji>😈</Emoji>Name:</span>
          <span className="flex-1">rainie</span>
        </li>
        <li className={theme.flex}>
          <span style={labelStyle}><Emoji>🚀</Emoji>Github:</span>
          <a className={theme['flex-1']} href="https://github.com/lanjingling0510">
            https://github.com/lanjingling0510
          </a>
        </li>
      </ul>
      <div>
        <a href="/">首页</a>
      </div>
    </div>
  );
}

export default Information;
