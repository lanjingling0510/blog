/* ------------------------------------------------------------
 * hot server
 * 监听server
 * ------------------------------------------------------------ */

const webpack = require('webpack');
const webpackConfig = require('../config/webpack.server-dev.js');
const chokidar = require('chokidar');
const once = require('ramda').once;
const nodemon = require('nodemon');
const path = require('path');


let compiler;

function runCompiler() {
    compiler.run(() => undefined);
}

function startServer() {
    const mainPath = path.resolve(compiler.options.output.path, 'server.js');

    nodemon({script: mainPath, watch: mainPath, flags: []})
        .on('quit', process.exit);
}

const startServerOnce = once(() => startServer());


// 监听server文件的变化
const watcher = chokidar.watch([
    path.resolve(__dirname, '../src'),
    path.resolve(__dirname)
], {
    ignored: path.resolve(__dirname, '../src/client')
});

watcher.on('ready', () => {
    watcher
    .on('add', runCompiler)
    .on('addDir', runCompiler)
    .on('change', runCompiler)
    .on('unlink', runCompiler)
    .on('unlinkDir', runCompiler);
});

// 开始编译
compiler = webpack(webpackConfig, (err) => {
    if (err) return;
    startServerOnce();
});


// An easy way to send the SIGINT signal is with <Ctrl>-C in most terminal programs.
process.on('SIGINT', () => {
    console.log('😗  Good Bye ~');
    process.exit(0);
});

module.exports = compiler;
