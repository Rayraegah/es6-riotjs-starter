const { join, resolve } = require('path');
const ExtractText = require('extract-text-webpack-plugin');
const { isProd, plugins } = require('./setup');
const babelrc = require('./babel');

const out = join(__dirname, '../dist');
const exclude = /(node_modules|bower_components)/;

if (isProd) {
  babelrc.presets.push('babili');
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: out,
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  resolve: {
      extensions: ['.js', '.tag'],
      modules: [resolve(__dirname, 'src'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.tag$/,
        exclude: exclude,
        loader: 'riot-tag-loader',
        options: {
          type: 'es6', // transpile the riot tags using babel
          hot: !isProd,
          debug: !isProd
        }
      },
      {
        test: /\.js$/,
        exclude: exclude,
        loader: 'babel-loader',
        options: babelrc
      },
      {
        test: /\.(less|css)$/,
        loader: (
          isProd
            ? ExtractText.extract({
                fallbackLoader: 'style-loader',
                loader: 'css-loader!postcss-loader!less-loader'
              })
            : 'style-loader!css-loader!postcss-loader!less-loader'
        )
      }
    ]
  },
  plugins: plugins,
  devtool: !isProd && 'eval',
  devServer: {
    contentBase: out,
    port: process.env.PORT || 3000,
    historyApiFallback: true,
    compress: isProd,
    inline: !isProd,
    hot: !isProd,
    open: true
  }
};
