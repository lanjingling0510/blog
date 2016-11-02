
import Koa from 'koa';
import logger from './utils/logger.js';
import middlewareRegister from './middleware.js';

const app = new Koa();
const hostname = process.env.HOSTNAME || '0.0.0.0';
const port = process.env.PORT || 8000;

// Middleware
middlewareRegister(app);

// listen
const listener = require('http').createServer(app.callback());

listener.listen(port, () => {
    logger.info('==> ✅  Server is listening');
    logger.info('==> 🌎  Go to http://%s:%s', hostname, port);
});

// Focus capture all errors
app.on('error', (err) => {
    logger.error('error occured:', err.message || err.stack);
});

export default listener;
