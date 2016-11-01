
/* ------------------------------------------------------------
 * hot server
 * 监听server
 * ------------------------------------------------------------ */

 const webpack = require('webpack');
 const webpackConfig = require('../webpack.server-dev.js');
 const chokidar = require('chokidar');
 const ListenerManager = require('./listenerManager.js');
 const compiler  = webpack(webpackConfig);
 const path = require('path');
 const compiledOutputPath = path.resolve(
   compiler.options.output.path, 'server.js'
 );

 let listenerManager;
 let compiling = 0;

 function runCompiler() {
     compiler.run(() => undefined);
 }

 // 关闭所有连接，关闭服务器，重新编译
 function compileHotServer() {
     compiling ++;
     if (listenerManager) {
         listenerManager.dispose(true).then(runCompiler);
     } else {
         runCompiler();
     }
 }

 function dispose() {
     console.log('🔪  kill server....');
     return listenerManager
         ? listenerManager.dispose()
         : Promise.resolve();
 }

 compileHotServer();

 // server代码编译完成
 // 开启server服务器
 compiler.plugin('done', stats => {
     compiling --;
     if (compiling !== 0) return;

     if (stats.hasErrors()) {
         console.log(stats.toString());
         return;
     }

     console.log('🚀 😝  Build server bundle done.');
     // Make sure our newly built server bundles aren't in the module cache.
     Object.keys(require.cache).forEach((modulePath) => {
         if (modulePath.indexOf(compiler.options.output.path) !== -1) {
             delete require.cache[modulePath];
         }
     });

     try {
         const listener = require(compiledOutputPath).default;
         listenerManager = new ListenerManager(listener, 'server');
     } catch (err) {
         console.log(err);
     }
 });

 // 监听server文件的变化
 const watcher = chokidar.watch([
     path.resolve(__dirname, '../src'),
     path.resolve(__dirname),
 ], {ignored: path.resolve(__dirname, '../src/client')});

 watcher.on('ready', () => {
     watcher
     .on('add', compileHotServer)
     .on('addDir', compileHotServer)
     .on('change', compileHotServer)
     .on('unlink', compileHotServer)
     .on('unlinkDir', compileHotServer);
 });


 // If we receive a kill cmd then we will first try to dispose our listeners.
 process.on('SIGTERM', () => dispose().then(() => process.exit(0)));
 module.exports = compiler;
