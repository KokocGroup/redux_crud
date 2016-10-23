var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');

var plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    function () {
        this.plugin('watch-run', function (watching, callback) {
            console.log('Begin compile at ' + new Date());
            callback();
        })
    }
];

module.exports = {
    devtool: 'source-map',
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
        preLoaders: [
            {
                test: /\.js$/,
                loaders: ['eslint'],
                include: [
                    path.resolve(__dirname, "src"),
                ],
            }
        ],
        loaders: [
            {
                loaders: ['babel-loader'],
                include: [
                    path.resolve(__dirname, "src"),
                ],
                test: /\.js$/,
                plugins: ['transform-runtime'],
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!postcss-loader"
            }
        ]
    },
    postcss: function () {
        return [autoprefixer, precss];
    }
};