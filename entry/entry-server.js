/* entry-server.js */
import { createApp } from '../src/main'

// 因为这里会有很多处理步骤，所以为了保证同步，使用promise函数来处理。当调用这个函数时，会创建一个新的vue实例，然后通过路由的push()方法，来更改实例的路由状态。更改完成后获取到该路由下将加载的组件，根据所得组件的长度来判断该路由页面是否存在
export default context => {
    return new Promise((resolve, reject) => {
        const app = createApp()

        // 更改路由
        app.$router.push(context.url)

        // 获取相应路由下的组件
        const matchedComponents = app.$router.getMatchedComponents()

        // 如果没有组件，说明该路由不存在，报错404
        if (!matchedComponents.length) { return reject({ code: 404 }) }
        // if (!matchedComponents.length) { 
        //     app.$router.push("404")
        //     return resolve(app)
        //  }

        // 遍历路由下所以的组件，如果有需要服务端渲染的请求，则进行请求
        Promise.all(matchedComponents.map(component => {
            if (component.serverRequest) {
                return component.serverRequest(app.$store)
            }
        })).then(() => {
            context.state = app.$store.state;
            resolve(app)
        }).catch(reject)
    })

}