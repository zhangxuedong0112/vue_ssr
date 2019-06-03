## 简介
---
## 此项目为 VUE+VUEX+SSR+Elementui 服务端渲染demo

## 运行命令
---
> npm run server 打包服务bundle代码

> npm run client 打包客户端bundle代码

> npm run build 同时打包客户端跟服务端代码

> npm run start 运行服务

> npm run build:start 打包并运行服务

## 目录
---
- dist //打包输出文件，服务做了静态目录
    - elementui //样式文件
    - 404.html //404页面，单独处理
    - bundle.client.js //webpack 客户端包
    - bundle.server.js //服务端渲染包
- entry //webpack入口文件
    - entry-client.js //客户端webpack入口
    - entry-server.js //服务端webpack入口
- src 跟vue相关逻辑
    - components
    - lib //资源
    - main_conf //因为服务端没有window等对象，客户端跟服务端分别引不同VUE对象
        - client.js //配置前端element组件引入等
        - server.js //服务端尽量简单，能满足SEO优化需求就好
    - App.vue
    - main.js
    - route.js
    - store.js
- webpack
    - webpack.client.js
    - webpack.server.js
- .babelrc
- package.json
- README.md
- server.js //服务启动代码

## 注意事项
---
- 因为现在是服务加浏览器混合开发，服务编译vue时是没有window相关对象，所以使用window相关对象时需要加判断 
```
if (typeof window !== 'undefined') {}
```
- 访问页面之前会触发组件内serverRequest，若需要渲染前获取数据，在这里边触发vuex相关方法，根据业务合理设计vuex缓存每页数据

## 文档
---
[博客链接](https://www.jianshu.com/p/c6a07755b08d)