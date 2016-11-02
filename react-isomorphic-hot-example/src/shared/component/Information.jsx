import React from 'react';
import {Link} from 'react-router';
import Emoji from './Emoji';

class Information extends React.Component {
    render () {
        const labelStyle = {
            width: 120,
        };

        return (
            <div className="container">
                <div className="account-navs">
                    <h2 className="flex-1">
                        <Link to="/account/avatar">头像</Link>
                    </h2>
                    <h2 className="flex-1">信息</h2>
                </div>
                <ul className="account-information">
                    <li className="flex">
                        <span style={labelStyle}><Emoji>😈</Emoji>Name:</span>
                        <span className="flex-1">rainie</span>
                    </li>
                    <li className="flex">
                        <span style={labelStyle}><Emoji>🚀</Emoji>Github:</span>
                        <a
                            className="flex-1"
                            href="https://github.com/lanjingling0510">
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
}

export default Information;
