const path = require('path')

module.exports = {
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
    }
}