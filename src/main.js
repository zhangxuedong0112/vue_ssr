/* main.js */
// import Vue from 'vue'
import createRouter from './route.js'
import App from './App.vue'
import createStore from './store'


// 导出一个工厂函数，用于创建新的vue实例

// main.js文件导出的是一个工厂函数，使用这个工厂函数会创建一个新的vue实例，
// 这样可以隔离开各个客户端的请求。每次客户端的请求，都会创建一个新的vue实例，
// 接着对这个实例进行路由渲染，然后返回给客户端
export function createApp(type) {
    let Vue = type == "window"?require("./main_conf/client"):require("./main_conf/server");
    // let Vue = require("./main_conf/server");

    const router = createRouter()
    const store = createStore()
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })

    return app
}