import React from 'react';
import { renderToString } from 'react-dom/server';
import koaRouter from 'koa-router';
import { StaticRouter } from 'react-router-dom';
import render from './utils/render.js';
import { PageError } from './utils/serverError.js';

const router = new koaRouter();

let Home = require('../shared/page/Home').default,
    Account = require('../shared/page/Account').default;

// 首页
async function homeRouter(ctx) {
    const App = React.createFactory(Home);
    return (ctx.body = render({
        title: '首页',
        name: 'home',
        content: renderToString(App()),
    }));
}

// 个人信息
async function accountRouter(ctx) {
    const context = {};
    const app = (
        <StaticRouter location={ctx.request.path} context={context}>
            <Account />
        </StaticRouter>
    );

    if (context.url) {
        // Somewhere a `<Redirect>` was rendered
        ctx.redirect(301, context.url);
    } else {
        // we're good, send the response
        const body = render({
            title: '个人中心',
            name: 'account',
            content: renderToString(app),
        });

        return (ctx.body = body);
    }
}

//404
async function notFoundRouter(ctx) {
    return ctx.render('404');
}

router.get('/', homeRouter);
router.get('/account/:type', accountRouter);
router.get('/404', notFoundRouter);

export default router;
