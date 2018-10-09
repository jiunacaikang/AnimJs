const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    mode: 'production',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname,'./lib')
    },
    module: {
        rules: [{
            test: /\.js$/, //匹配.js文件
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    },
    plugins: [
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false,
                    drop_console: true,//console
                }
              }
        })
    ]
}