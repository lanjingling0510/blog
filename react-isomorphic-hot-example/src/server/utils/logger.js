const spawn = require('child_process').spawn;
const through = require('through');
const path = require('path');
const fs = require('fs');

const prettyStream = function(args) {
    args = args || ['-o', 'short'];
    const bin = path.resolve(path.dirname(require.resolve('bunyan')), '..', 'bin', 'bunyan');
    const stream = through(function write(data) {
        this.queue(data);
    }, function end() {
        this.queue(null);
    });

    if (bin && fs.existsSync(bin)) {
        const formatter = spawn(bin, [
            '-o', 'short'
        ], {
            stdio: [null, process.stdout, process.stderr]
        });
        stream.pipe(formatter.stdin);
    }

    return stream;
};

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
    stream: process.stdout.isTTY ? prettyStream() : process.stdout,
    level: 'info'
};

// create bootstrapping logger
module.exports = bunyan.createLogger(options);
