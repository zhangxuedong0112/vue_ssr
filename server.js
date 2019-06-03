/* server.js */
const exp = require('express')
const express = exp()
const renderer = require('vue-server-renderer').createRenderer()
const createApp = require('./dist/bundle.server.js')['default']
const LRU = require('lru-cache')

//设置页面缓存
const microCache = new LRU({ max: 500
    , length: function (n, key) { return n * 2 + key.length }
    , dispose: function (key, n) { n.close() }
    , maxAge: 1000 * 60 * 60 })//毫秒,1小时
const isCacheable = req => {
    // 实现逻辑为，检查请求是否是用户特定(user-specific)。
    // 只有非用户特定 (non-user-specific) 页面才会缓存
    // return true;
    const not_cache_pages = ["/people"];//不需要缓存的页面
    if(not_cache_pages.indexOf(req.url) == -1){
        return true;
    }else{
        return false;
    }
    
}  

// 设置静态文件目录
express.use('/', exp.static(__dirname + '/dist'))


const clientBundleFileUrl = '/bundle.client.js'

// getHomeInfo请求
express.get('/api/getHomeInfo', (req, res) => {
    res.send('SSR发送请求')
})

// 响应路由请求
express.get('*', (req, res) => {
    let cacheable = isCacheable(req);
    if(cacheable){
        const hit = microCache.get(req.url)
        if (hit) {
            console.log(req.url," get from cache")
            return res.end(hit)
        }
    }

    const context = { url: req.url }

    // 创建vue实例，传入请求路由信息
    createApp(context).then(app => {
        let state = JSON.stringify(context.state);

        renderer.renderToString(app, (err, html) => {
            if (err) { return res.state(500).end('运行时错误') }

            // 需要特别注意的是：一般script标签我们都会放置在body标签内的最下方，来防止长时间的白屏，但是如果这里也这样做，会发现进入页面后会看到大量没有样式的SEO内容，短暂的延迟后，由于script文件的加载完毕，会闪屏至正常的有样式的页面，这样用户的体验非常不好。因此我们将脚本标签放在head中先加载，并且设置window的onload事件，当body的内容加载完毕后再触发脚本，虽然有了白屏时间，但是时间短暂，用户体验相比之下会更好
            let res_html = `
                <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <title>Vue2.0 SSR渲染页面</title>
                        <script>window.__INITIAL_STATE__ = ${state}</script>
                        <script src="${clientBundleFileUrl}"></script>
                        <link rel="stylesheet" type="text/css" href="/elementui/index.css">
                    </head>
                    <body>
                        <div id="app">${html}</div>
                    </body>
                </html>
            `;

            if(cacheable){
                console.log(req.url, " set cache")
                microCache.set(req.url, res_html)
            }
          
            res.send(res_html);

        })
    }, err => {
        if(err.code === 404) {
            //  res.status(404).end('所请求的页面不存在') 
            res.redirect(302, '/404.html');
        }
    })
})


// 服务器监听地址
express.listen(8080, () => {
    console.log('8080 服务器已启动！')
})