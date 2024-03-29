/* entry-client.js */
import { createApp } from '../src/main'


const app = createApp("window")

//同步时服务端信息
if (window.__INITIAL_STATE__) {
    app.$store.replaceState(window.__INITIAL_STATE__)
}

// 绑定app根元素
window.onload = function() {
    app.$mount('#app')
}