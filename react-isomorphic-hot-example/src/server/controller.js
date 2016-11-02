import React from 'react';
import { renderToString } from 'react-dom/server';
import koaRouter from 'koa-router';
import { match, RouterContext } from 'react-router';
import render from './utils/render.js';
import { PageError } from './utils/serverError.js';

const router = new koaRouter();

let Home = require('../shared/page/Home').default,
    Account = require('../shared/page/Account').default;

// 首页
async function homeRouter (ctx) {
    const App = React.createFactory(Home);
    return ctx.body = render({
        title: '首页',
        name: 'home',
        content: renderToString(App()),
    });
}

// 个人信息
async function accountRouter (ctx) {
    const routes = Account;
    return new Promise((resolve) => {
        match({ routes, location: ctx.request.path }, (error, redirectLocation, renderProps) => {
            if (error) {
                throw new PageError(error.message, 500);
            }

            if (redirectLocation) {
                ctx.redirect(302, redirectLocation.pathname + redirectLocation.search);
            }

            if (renderProps) {
                const reactHtml = renderToString(
                    <RouterContext {...renderProps} />
                );

                const body = render({
                    title: '个人中心',
                    name: 'account',
                    content: reactHtml,
                });

                ctx.body = body;
                resolve(body);
            }
        });
    });
}

//404
async function notFoundRouter (ctx) {
    return ctx.render('404');
}

router.get('/', homeRouter);
router.get('/account/:type', accountRouter);
router.get('/404', notFoundRouter);

export default router;
