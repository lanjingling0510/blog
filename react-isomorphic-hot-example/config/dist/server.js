module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://127.0.0.1:8080/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = require("react");

/***/ },
/* 1 */
/***/ function(module, exports) {

module.exports = require("react-router");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

const spawn = __webpack_require__(17).spawn;
const through = __webpack_require__(27);
const path = __webpack_require__(5);
const fs = __webpack_require__(18);

const prettyStream = function (args) {
    args = args || ['-o', 'short'];
    const bin = path.resolve(path.dirname(/*require.resolve*/(4)), '..', 'bin', 'bunyan');
    const stream = through(function write(data) {
        this.queue(data);
    }, function end() {
        this.queue(null);
    });

    if (bin && fs.existsSync(bin)) {
        const formatter = spawn(bin, ['-o', 'short'], {
            stdio: [null, process.stdout, process.stderr]
        });
        stream.pipe(formatter.stdin);
    }

    return stream;
};

let bunyan = __webpack_require__(4),
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

/***/ },
/* 3 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
let JsonError = exports.JsonError = class JsonError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status || 500;
    }
};
let PageError = exports.PageError = class PageError extends Error {
    constructor(message) {
        super(message);
        this.status = status || 500;
    }
};

/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = require("bunyan");

/***/ },
/* 5 */
/***/ function(module, exports) {

module.exports = require("path");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _koa = __webpack_require__(20);

var _koa2 = _interopRequireDefault(_koa);

var _logger = __webpack_require__(2);

var _logger2 = _interopRequireDefault(_logger);

var _middleware = __webpack_require__(8);

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa2.default();
const hostname = {"NODE_ENV":"development"}.HOSTNAME || '127.0.0.1';
const port = {"NODE_ENV":"development"}.PORT || 8000;

// Middleware
(0, _middleware2.default)(app);

// listen
const listener = __webpack_require__(19).createServer(app.callback());

listener.listen(port, () => {
    _logger2.default.info('==> ✅  Server is listening');
    _logger2.default.info('==> 🌎  Go to http://%s:%s', hostname, port);
});

// Focus capture all errors
app.on('error', err => {
    _logger2.default.error('error occured:', err.message || err.stack);
});

exports.default = listener;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

// 首页
let homeRouter = (() => {
    var _ref = _asyncToGenerator(function* (ctx) {
        const App = _react2.default.createFactory(Home);
        return ctx.body = (0, _render2.default)({
            title: '首页',
            name: 'home',
            content: (0, _server.renderToString)(App())
        });
    });

    return function homeRouter(_x) {
        return _ref.apply(this, arguments);
    };
})();

// 个人信息


let accountRouter = (() => {
    var _ref2 = _asyncToGenerator(function* (ctx) {
        const routes = Account;
        return new Promise(function (resolve) {
            (0, _reactRouter.match)({ routes, location: ctx.request.path }, function (error, redirectLocation, renderProps) {
                if (error) {
                    throw new _serverError.PageError(error.message, 500);
                }

                if (redirectLocation) {
                    ctx.redirect(302, redirectLocation.pathname + redirectLocation.search);
                }

                if (renderProps) {
                    const reactHtml = (0, _server.renderToString)(_react2.default.createElement(_reactRouter.RouterContext, renderProps));

                    const body = (0, _render2.default)({
                        title: '个人中心',
                        name: 'account',
                        content: reactHtml
                    });

                    ctx.body = body;
                    resolve(body);
                }
            });
        });
    });

    return function accountRouter(_x2) {
        return _ref2.apply(this, arguments);
    };
})();

//404


let notFoundRouter = (() => {
    var _ref3 = _asyncToGenerator(function* (ctx) {
        return ctx.render('404');
    });

    return function notFoundRouter(_x3) {
        return _ref3.apply(this, arguments);
    };
})();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(26);

var _koaRouter = __webpack_require__(23);

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _reactRouter = __webpack_require__(1);

var _render = __webpack_require__(9);

var _render2 = _interopRequireDefault(_render);

var _serverError = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const router = new _koaRouter2.default();

let Home = __webpack_require__(14).default,
    Account = __webpack_require__(13).default;

router.get('/', homeRouter);
router.get('/account/:type', accountRouter);
router.get('/404', notFoundRouter);

exports.default = router;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = middlewreRegister;

var _koaStatic = __webpack_require__(24);

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaEtag = __webpack_require__(22);

var _koaEtag2 = _interopRequireDefault(_koaEtag);

var _koaConditionalGet = __webpack_require__(21);

var _koaConditionalGet2 = _interopRequireDefault(_koaConditionalGet);

var _koaViews = __webpack_require__(25);

var _koaViews2 = _interopRequireDefault(_koaViews);

var _controller = __webpack_require__(7);

var _controller2 = _interopRequireDefault(_controller);

var _logger = __webpack_require__(2);

var _logger2 = _interopRequireDefault(_logger);

var _serverError = __webpack_require__(3);

var _path = __webpack_require__(5);

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const templatePath = _path2.default.join(__dirname, './templates');

function middlewreRegister(app) {
    // logger
    app.use((() => {
        var _ref = _asyncToGenerator(function* (ctx, next) {
            const start = new Date();
            yield next();
            const ms = new Date() - start;
            _logger2.default.info(`${ ctx.method } ${ ctx.url } - ${ ms }ms`);
        });

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    })());

    // error handle
    app.use((() => {
        var _ref2 = _asyncToGenerator(function* (ctx, next) {
            try {
                yield next();
            } catch (e) {
                let status = e.status || 500;
                let message = e.message || '服务器错误';
                if (e instanceof _serverError.JsonError || e instanceof _serverError.PageError) {
                    // 错误是 json or page 错误
                    ctx.body = {
                        status,
                        message
                    };
                    if (status == 500) {
                        // 触发 koa 统一错误事件，可以打印出详细的错误堆栈 log
                        app.emit('error', e, ctx);
                    }
                    return;
                }

                ctx.status = status;
                // 根据 status 渲染不同的页面
                if (status == 404) {
                    ctx.redirect('/404');
                }
                if (status == 500) {
                    // this.body = yield this.render('500.html', {
                    //     'err': e
                    // });
                    ctx.body = '亲，>.<服务器出错啦~';
                    // 触发 koa 统一错误事件，可以打印出详细的错误堆栈 log
                    app.emit('error', e, ctx);
                }
            }
        });

        return function (_x3, _x4) {
            return _ref2.apply(this, arguments);
        };
    })());

    app.use((0, _koaConditionalGet2.default)());

    // cache and static resource
    app.use((0, _koaStatic2.default)('static', {
        maxage: 1000 * 60 * 60 * 24 * 30
    }));

    // etag middleware
    app.use((0, _koaEtag2.default)());

    // template ejs
    app.use((0, _koaViews2.default)(templatePath, { extension: 'ejs' }));

    // router dispatcher
    app.use(_controller2.default.routes());
    // 404
    app.use(_asyncToGenerator(function* () {
        throw { status: 404 };
    }));
}
/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _statsGenerated = __webpack_require__(15);

var _statsGenerated2 = _interopRequireDefault(_statsGenerated);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const render = options => {
  const resources = _statsGenerated2.default[options.name];

  const links = `<link rel="stylesheet" href="${ resources.css }" />`;

  const scripts = [`<script src="${ _statsGenerated2.default.vendor.js }"></script>`, `<script src="${ resources.js }"></script>`];

  return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>${ options.title }</title>
            <meta content="width=device-width, initial-scale=1.0" name="viewport">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <meta http-equiv="cache-control" content="no-cache, no-store" />
            <link rel="icon" href="/favicon.png" />
            ${ links }
          </head>
          <body>
              <div id="react-container">${ options.content }</div>
            ${ scripts.join('') }
          </body>
        </html>
        `;
};

exports.default = render;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Avatar = class Avatar extends _react2.default.Component {
    render() {
        return _react2.default.createElement(
            'div',
            { className: 'container' },
            _react2.default.createElement(
                'div',
                { className: 'account-navs' },
                _react2.default.createElement(
                    'h2',
                    { className: 'flex-1' },
                    '\u5934\u50CF'
                ),
                _react2.default.createElement(
                    'h2',
                    { className: 'flex-1' },
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { to: '/account/information' },
                        '\u4FE1\u606F'
                    )
                )
            ),
            _react2.default.createElement('img', { src: __webpack_require__(16), alt: '', width: '100%' }),
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'a',
                    { href: '/' },
                    '\u9996\u9875'
                )
            )
        );
    }
};
exports.default = Avatar;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _twemoji = __webpack_require__(28);

var _twemoji2 = _interopRequireDefault(_twemoji);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Emoji = class Emoji extends _react2.default.Component {
    render() {
        let {
            children
        } = this.props;
        return _react2.default.createElement('span', { dangerouslySetInnerHTML: {
                __html: _twemoji2.default.parse(_twemoji2.default.convert.fromCodePoint(children.codePointAt()))
            } });
    }
};


Emoji.propTypes = {
    children: _react2.default.PropTypes.string
};

exports.default = Emoji;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(1);

var _Emoji = __webpack_require__(11);

var _Emoji2 = _interopRequireDefault(_Emoji);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Information = class Information extends _react2.default.Component {
    render() {
        const labelStyle = {
            width: 120
        };

        return _react2.default.createElement(
            'div',
            { className: 'container' },
            _react2.default.createElement(
                'div',
                { className: 'account-navs' },
                _react2.default.createElement(
                    'h2',
                    { className: 'flex-1' },
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { to: '/account/avatar' },
                        '\u5934\u50CF'
                    )
                ),
                _react2.default.createElement(
                    'h2',
                    { className: 'flex-1' },
                    '\u4FE1\u606F'
                )
            ),
            _react2.default.createElement(
                'ul',
                { className: 'account-information' },
                _react2.default.createElement(
                    'li',
                    { className: 'flex' },
                    _react2.default.createElement(
                        'span',
                        { style: labelStyle },
                        _react2.default.createElement(
                            _Emoji2.default,
                            null,
                            '\uD83D\uDE08'
                        ),
                        'Name:'
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'flex-1' },
                        'rainie'
                    )
                ),
                _react2.default.createElement(
                    'li',
                    { className: 'flex' },
                    _react2.default.createElement(
                        'span',
                        { style: labelStyle },
                        _react2.default.createElement(
                            _Emoji2.default,
                            null,
                            '\uD83D\uDE80'
                        ),
                        'Github:'
                    ),
                    _react2.default.createElement(
                        'a',
                        {
                            className: 'flex-1',
                            href: 'https://github.com/lanjingling0510' },
                        'https://github.com/lanjingling0510'
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'a',
                    { href: '/' },
                    '\u9996\u9875'
                )
            )
        );
    }
};
exports.default = Information;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(1);

var _Avatar = __webpack_require__(10);

var _Avatar2 = _interopRequireDefault(_Avatar);

var _Information = __webpack_require__(12);

var _Information2 = _interopRequireDefault(_Information);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The React Router routes for both the server and the client.
 */
const router = _react2.default.createElement(
    _reactRouter.Router,
    null,
    _react2.default.createElement(
        _reactRouter.Route,
        { path: '/account' },
        _react2.default.createElement(_reactRouter.Route, { path: 'avatar', component: _Avatar2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: 'information', component: _Information2.default })
    )
);

exports.default = router;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Home = class Home extends _react2.default.Component {
    render() {
        return _react2.default.createElement(
            "div",
            { className: "container" },
            _react2.default.createElement(
                "a",
                { href: "./account/information" },
                "\u4E2A\u4EBA\u4FE1\u606F"
            )
        );
    }
};
exports.default = Home;

/***/ },
/* 15 */
/***/ function(module, exports) {

module.exports = {
	"account": {
		"js": "http://0.0.0.0:8080/dist/account.js",
		"css": "http://0.0.0.0:8080/dist/account.css"
	},
	"home": {
		"js": "http://0.0.0.0:8080/dist/home.js",
		"css": "http://0.0.0.0:8080/dist/home.css"
	},
	"vendor": {
		"js": "http://0.0.0.0:8080/dist/vendor.js"
	}
};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "68e5c0274ccaace5f1fce6f2feb6a14d.gif";

/***/ },
/* 17 */
/***/ function(module, exports) {

module.exports = require("child_process");

/***/ },
/* 18 */
/***/ function(module, exports) {

module.exports = require("fs");

/***/ },
/* 19 */
/***/ function(module, exports) {

module.exports = require("http");

/***/ },
/* 20 */
/***/ function(module, exports) {

module.exports = require("koa");

/***/ },
/* 21 */
/***/ function(module, exports) {

module.exports = require("koa-conditional-get");

/***/ },
/* 22 */
/***/ function(module, exports) {

module.exports = require("koa-etag");

/***/ },
/* 23 */
/***/ function(module, exports) {

module.exports = require("koa-router");

/***/ },
/* 24 */
/***/ function(module, exports) {

module.exports = require("koa-static");

/***/ },
/* 25 */
/***/ function(module, exports) {

module.exports = require("koa-views");

/***/ },
/* 26 */
/***/ function(module, exports) {

module.exports = require("react-dom/server");

/***/ },
/* 27 */
/***/ function(module, exports) {

module.exports = require("through");

/***/ },
/* 28 */
/***/ function(module, exports) {

module.exports = require("twemoji");

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _server = __webpack_require__(6);

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _server2.default;

/***/ }
/******/ ]);