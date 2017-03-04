import './css/reset.css';
import './css/account.css';
import ReactDOM from 'react-dom';
import React from 'react';
import Account from '../shared/page/Account';
import { Router, browserHistory, match } from 'react-router';
import ReactHotLoader from '../shared/component/ReactHotLoader';

const container = document.getElementById('react-container');
const { pathname, search } = window.location;
const location = `${pathname}${search}`;

const referenctiallyEqualRootRoute = {};

function renderApp(routes) {

    // FIXED: [react-router] You cannot change <Router routes>; it will be ignored
    const newRoutes = Object.assign(referenctiallyEqualRootRoute, routes);

    match({ routes: newRoutes, location }, () => {
        ReactDOM.render(
            <ReactHotLoader>
                <Router routes={newRoutes} history={browserHistory} />
            </ReactHotLoader>,
            container
        );
    });
}

renderApp(Account);

// The following is needed so that we can support hot reloading our application.
if (__DEV__ && module.hot) {
    // Accept changes to this file for hot reloading.
    module.hot.accept('./account.js');
    // Any changes to our App will cause a hotload re-render.
    module.hot.accept(
      '../shared/page/Account',
      () => renderApp(require('../shared/page/Account').default)
    );
}
