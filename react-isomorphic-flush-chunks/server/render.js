import React from 'react';
import ReactDOM from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import App from '../src/components/App';

export default ({ clientStats, outputPath }) => (req, res) => {
  const context = {};

  const app = ReactDOM.renderToString(
    <StaticRouter location={req.path} context={context}>
      <App />
    </StaticRouter>
  );

  const chunkNames = flushChunkNames();

  const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames });

  if (context.url) {
    // Somewhere a `<Redirect>` was rendered
    ctx.redirect(301, context.url);
  }
  else {
    console.log('PATH', req.path);
    console.log('CHUNK NAMES RENDERED', chunkNames);

    res.send(
      `<!doctype html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>react-universal-component-boilerplate</title>
              <link rel="icon" href="/static/favicon.png" />
              ${styles}
            </head>
            <body>
              <div id="root">${app}</div>
             ${js}
             ${cssHash}
            </body>
          </html>`
    );
  }
};
