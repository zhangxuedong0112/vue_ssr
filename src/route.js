/* route.js */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default function createRouter() {
    let router = new VueRouter({
        // 要记得增加mode属性，因为#后面的内容不会发送至服务器，服务器不知道请求的是哪一个路由
        mode: 'history',
        routes: [
            {
                alias: '/',
                path: '/home',
                name:"home",
                component: require('./components/home.vue')
            },
            {
                path: '/animal',
                name:"animal",
                component: require('./components/animal.vue')
            },
            {
                path: '/people',
                name:"people",
                component: require('./components/people.vue')
            },
            {
                path: '/login',
                name:"login",
                component: require('./components/login.vue')
            },
        ]
    })

    // if (typeof window == 'undefined') {
    //     return router;
    // }
    return router;
    
    router.beforeEach((to, from, next) => {
        // LoadingBar.start();
        // 根据 token 和 path.name 确定路由跳转行为
        const token = localStorage.getItem("token");
        if (token) {
          if (to.name == "login") {
              
            next({
              name: "home"
            });
          } else {
            next();
          }
        } else {
          if (["login", "modifyPwd", "firstPwd"].includes(to.name)) {
            next();
          } else {
            console.log("to login")
            next({
              name: "login"
            });
          }
        }
    });
      
    router.afterEach(to => {
        // LoadingBar.finish();
        // window.scrollTo(0, 0);
    });

    return router
}