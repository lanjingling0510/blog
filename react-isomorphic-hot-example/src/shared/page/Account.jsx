import React from 'react';
import { Router, Route } from 'react-router';
import Avatar from '../component/Avatar';
import Information from '../component/Information';

/**
 * The React Router routes for both the server and the client.
 */
const router = (
    <Router>
        <Route path="/account">
            <Route path="avatar" component={Avatar} />
            <Route path="information" component={Information} />
        </Route>
    </Router>
);

export default router;
