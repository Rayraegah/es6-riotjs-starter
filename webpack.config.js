const { resolve } = require('path');
const webpack = require('webpack');

// webpack plugins
const DashboardPlugin = require('webpack-dashboard/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// variables
const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

// with HMR
let config = {
    devtool: isProd ? 'cheap-module-source-map' : 'cheap-eval-source-map',
    context: resolve(__dirname, 'src'),
    entry: ['./app.js'],
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, isProd ? 'public/build' : 'public'),
        publicPath: '/build'
        // HMR needs to know where to load the hot update chunks
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                // preload
                test: /\.tag$/,
                // preload tag files
                exclude: ['node_modules'],
                loader: 'riotjs-loader',
                options: { type: 'none' }
            },
            {
                test: /\.js$|\.tag$/,
                // babel all javascript
                exclude: ['node_modules'],
                loader: 'babel-loader',
                options: { presets: ['es2015-riot'] }
            },
            {
                test: /\.css$/,
                // vanilla css
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                // base64 assets
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.tag'],
        modules: [resolve(__dirname, 'src'), 'node_modules']
    },
    plugins: [
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(require('./package.json').version)
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: JSON.stringify(nodeEnv)
        }),
        new webpack.ProvidePlugin({
            riot: 'riot'
        }),
        new DashboardPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    performance: (
        isProd &&
            {
                maxAssetSize: 100,
                maxEntrypointSize: 300,
                hints: 'warning'
            }
    ),
    stats: {
        colors: {
            green: '\u001b[32m'
        }
    }
};

if (!isProd) {
    config.devServer = {
        hot: true,
        // enable HMR
        contentBase: resolve(__dirname, 'public'),
        watchContentBase: true,
        // must match the output path
        publicPath: '/build',
        // must match the output
        historyApiFallback: true,
        compress: false,
        inline: true,
        stats: {
            assets: true,
            children: false,
            chunks: false,
            hash: false,
            modules: false,
            publicPath: false,
            timings: true,
            version: false,
            warnings: true,
            colors: {
                green: '\u001b[32m'
            }
        }
    },
    config.entry.push(
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server'
    );
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
