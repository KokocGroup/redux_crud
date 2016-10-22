var path = require('path');
var webpack = require('webpack');

var plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    function () {
        this.plugin('watch-run', function (watching, callback) {
            console.log('Begin compile at ' + new Date());
            callback();
        })
    }
];

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'babel-polyfill',
        './src/index'
    ],
    watch: true,
    output: {
        path: path.join(__dirname, '/static/'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: plugins,
    module: {
        loaders: [
            {
                loaders: ['babel-loader'],
                include: [
                    path.resolve(__dirname, "src")
                ],
                test: /\.js$/,
                plugins: ['transform-runtime']
            }
        ]
    }
};