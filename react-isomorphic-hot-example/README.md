<p align='center'>
  <h1 align='center'>React Isomorphic, Hot Reload</h1>
  <p align='center'><img width='500' src='https://raw.githubusercontent.com/lanjingling0510/blog/master/react-isomorphic-hot-example/src/shared/image/home.png' /></p>
  <p align='center'>react服务器渲染  🍺  热加载Demo</p>
</p>


## 目录
- [关于](#about)
- [特性](#features)
- [使用](#usage)
- [概述](#overview)
    - [项目目录](#project)
    - [hot reload流程](#development)


##关于<a name="about"></a>
关于`react`服务器渲染的项目中，开发模式下热加载、局部更新的的解决方案


## 特性<a name="features"></a>
- 🙄 koa2 server(服务器渲染)
- ☕️ react-router3, 作为单页面路由
- 🌍 webpack2工具流
- 🐶 hot-react-loader3, 静态资源的热加载
- 🤔 es6, es7的支持，使用babel编译
- 👀 环境变量`__DEV__`, `__PRODUCTION__`, `__CLIENT__`, `__SERVER__`配置
- 🚀 postcss预编译css
- ✅ 分布式CDN的, 非覆盖式的发布方案(静态资源缓存cache，hash文件名)


## 使用<a name="usage"></a>
```script
    git clone https://github.com/lanjingling0510/blog.git
    cd ./blog/react-isomorphic-hot-example
    yarn install --no-lockfile
```

Development
```script
    npm run start
```

Production
```script
    npm run build
```

## 概述<a name="overview"></a>


### 项目目录<a name="project"></a>
```
.
├── README.md                  // 说明
├── babel.config.js            // babel 配置文件
├── development                // 开发模式下的命令
│   ├── client.js
│   ├── listenerManager.js
│   └── server.js
├── dist                       // 编译后生成server代码的路径
├── node_modules               
├── package.json
├── src                        // 真正的源代码
│   ├── client                 // 客户端代码
│   ├── server                 // 服务器代码
│   └── shared                 // 共享的代码
├── static
│   ├── dist                   // 编译后生成client代码的路径
│   └── favicon.png
├── stats.generated.json
├── config     // webpack配置
│   ├── webpack.client-dev.js      // 开发模式下客户端webpack配置
│   ├── webpack.client.js          // 生产模式下客户端webpack配置
│   ├── webpack.server.js          // 生产模式下服务器webpack配置
│   └── webpack.server-dev.js      // 开发模式下服务器webpack配置
└── yarn.lock

```




###`hot reload`流程<a name="development"></a>

开发模式下，服务器渲染react同构直出，比纯静态的react的热加载更加复杂，需要分三种情况更新代码。

1. 修改client代码。本例通过`WebpackDevServer`配合`react-hot-loader3`
2. 修改server代码。server代码修改后，杀死所有与客户端的连接，关闭server，通过webpack重新编译代码，重新打开server
3. 修改公共的代码。同时进行上面两个步骤

![development](https://raw.githubusercontent.com/lanjingling0510/blog/master/react-isomorphic-hot-example/.github/development.png)
