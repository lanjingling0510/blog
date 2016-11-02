import React from 'react';
import {Link} from 'react-router';

class Avatar extends React.Component {
    render () {
        return (
            <div className="container">
                <div className="account-navs">
                    <h2 className="flex-1">头像</h2>
                    <h2 className="flex-1">
                        <Link to="/account/information">信息</Link>
                    </h2>
                </div>
                <img src={require('../image/avatar.gif')} alt="" width="100%" />
                <div>
                    <a href="/">首页</a>
                </div>
            </div>
        );
    }
}

export default Avatar;
