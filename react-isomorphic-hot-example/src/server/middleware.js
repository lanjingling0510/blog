import koaStatic from 'koa-static';
import koaEtag from 'koa-etag';
import conditional from 'koa-conditional-get';
import views from 'koa-views';
import controller from './controller.js';
import logger from './utils/logger.js';
import { JsonError } from './utils/serverError.js';
import path from 'path';

const templatePath = path.join(__dirname, './templates');

export default function middlewreRegister(app) {
    // logger
    app.use(async (ctx, next) => {
        const start = new Date();
        await next();
        const ms = new Date() - start;
        logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
    });

    // error handle
    app.use(async function(ctx, next) {
        try {
            await next();
        } catch (e) {
            let status = e.status || 500;
            let message = e.message || '服务器错误';
            if (e instanceof JsonError) { // 错误是 json 错误
                ctx.body = {
                    status,
                    message,
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


    app.use(conditional());

    // cache and static resource
    app.use(koaStatic('static', {
        maxage: 1000 * 60 * 60 * 24 * 30,
    }));

    // etag middleware
    app.use(koaEtag());

    // template ejs
    app.use(views(templatePath, { extension: 'ejs' }));

    // router dispatcher
    app.use(controller.routes());
    // 404
    app.use(async() => {
        throw {status: 404};
    });
}
