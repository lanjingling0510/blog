import React from 'react';
import ReactDOM from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import App from '../src/components/App';

export default ({ clientStats, outputPath }) => (req, res, next) => {
  const context = {};

  const app = ReactDOM.renderToString(
    <StaticRouter location={req.path} context={context}>
      <App />
    </StaticRouter>
  );

  const chunkNames = flushChunkNames();

  const {
    // react components:
    Js,
    Styles, // external stylesheets
    Css, // raw css

    // strings:
    js,
    styles, // external stylesheets
    css, // raw css

    // arrays of file names (not including publicPath):
    scripts,
    stylesheets,

    publicPath
  } = flushChunks(clientStats, {
    chunkNames,
    before: ['bootstrap'],
    after: ['main'],

    // only needed if serving css rather than an external stylesheet
    // note: during development css still serves as a stylesheet
    outputPath
  });

  if (context.url) {
    // Somewhere a `<Redirect>` was rendered
    ctx.redirect(301, context.url);
  }
  else {
    console.log('PATH', req.path);
    console.log('SERVED SCRIPTS', scripts);
    console.log('SERVED STYLESHEETS', stylesheets);

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
            </body>
          </html>`
    );
  }
};
