const path = require('path');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    <<0>>: [
      path.resolve(__dirname, './src/js', 'index.js'),
      path.resolve(__dirname, './src/styles', 'index.scss'),
    ]
  },
  resolve: {
    modules: [
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, './src/js'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env'],
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.(css|scss|sass)$/,
        include: path.resolve(__dirname, './src/styles'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
              },
            },
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '.'),
    }),
    new ExtractTextPlugin('[name].bundle.css'),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: '<<1>>',
      notify: false,
      files: ['./dist/*', './*.php']
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
  }
}