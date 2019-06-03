/* webpack.client.js */
const path = require('path');
const projectRoot = path.resolve(__dirname, '..');
const UglifyJSPlugin = require('webpack/lib/optimize/UglifyJsPlugin');


module.exports = {
    entry: ['babel-polyfill', path.join(projectRoot, 'entry/entry-client.js')],
    output: {
        path: path.join(projectRoot, 'dist'),
        filename: 'bundle.client.js',
    },
    module: {
        rules: [{
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                // {
                //     test: /\.less$/,
                //     // use: [ 'style-loader', 'css-loader', 'less-loader' ],
                //     loader: "style-loader!css-loader!less-loader"
                // },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    include: projectRoot,
                    exclude: /node_modules/,
                    options: {
                        presets: ['es2015']
                    }
                }
        ]
    },
    plugins: [
        new UglifyJSPlugin({
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                // 删除所有的 `console` 语句，可以兼容ie浏览器
                drop_console: false,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true,
            },
            output: {
                // 最紧凑的输出
                beautify: false,
                // 删除所有的注释
                comments: false,
            }
        }),
    ],
    resolve: {
        alias: {
                'vue$': 'vue/dist/vue.runtime.esm.js'
        }
    }
};