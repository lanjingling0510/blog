import './css/reset.css';
import './css/account.css';
import ReactDOM from 'react-dom';
import React from 'react';
import Account from '../shared/page/Account';
import { BrowserRouter } from 'react-router-dom';
import ReactHotLoader from '../shared/component/ReactHotLoader';

const container = document.getElementById('react-container');
const { pathname, search } = window.location;
const location = `${pathname}${search}`;

function renderApp(Account) {
    ReactDOM.render(
        <ReactHotLoader>
            <BrowserRouter>
                <Account />
            </BrowserRouter>
        </ReactHotLoader>,
        container
    );
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
