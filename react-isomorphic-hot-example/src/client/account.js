
import './css/account.css';
import ReactDOM from 'react-dom';
import React from 'react';
import Account from '../shared/page/Account';
import { Router, browserHistory, match } from 'react-router';

const container = document.getElementById('react-container');

function renderApp(routes) {
    match({ routes }, () => {
        ReactDOM.render(
            <ReactHotLoader>
                <Router routes={routes} history={browserHistory} />
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
