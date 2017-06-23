import React from 'react';
import { Route } from 'react-router-dom';
import Dynamic from '../utils/dynamic';

/**
 * The React Router routes for both the server and the client.
 */

 const Avatar = Dynamic({loader: () => import(/* webpackChunkName: 'avatar' */ '../component/Avatar.jsx')});
 const Information = Dynamic({loader: () => import(/* webpackChunkName: 'information' */ '../component/Information.jsx')});

const Account = () => (
    <div>
        <Route path="/account/avatar" exact component={Avatar} />
        <Route path="/account/information" exact component={Information} />
    </div>
);

export default Account;
