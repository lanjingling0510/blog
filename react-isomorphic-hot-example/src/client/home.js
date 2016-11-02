import './css/reset.css';
import './css/home.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../shared/page/Home';
import ReactHotLoader from '../shared/component/ReactHotLoader';
const container = document.getElementById('react-container');

function renderApp(TheApp) {
    ReactDOM.render(
      <ReactHotLoader>
          <TheApp />
      </ReactHotLoader>,
      container
    );
}

renderApp(Home);

// The following is needed so that we can support hot reloading our application.
if (__DEV__ && module.hot) {
    // Accept changes to this file for hot reloading.
    module.hot.accept('./home.js');
    // Any changes to our App will cause a hotload re-render.
    module.hot.accept(
      '../shared/page/Home',
      () => renderApp(require('../shared/page/Home').default)
    );
}
