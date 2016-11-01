
let bunyan = require('bunyan'),
    options;

//"trace" (10): Logging from external libraries used by your app or very detailed application logging.
//"debug" (20): Anything else, i.e. too verbose to be included in "info" level.
//"info" (30): Detail on regular operation.
//"warn" (40): A note on something that should probably be looked at by an operator eventually.
//"error" (50): Fatal for a particular request, but the service/app continues servicing other requests. An operator should look at this soon(ish).
//"fatal" (60): The service/app is going to stop or become unusable now. An operator should definitely look into this soon.

options = {
    name: 'server',
    stream: process.stdout,
    level: 'info'
};

// create bootstrapping logger
module.exports = bunyan.createLogger(options);
