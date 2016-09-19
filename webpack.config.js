const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const sources = [
  './node_modules/ng-admin/build/ng-admin.min.css',
  './src/style/main.css',
  './src/index.js',
];

module.exports = {
  entry: sources,
  output: {
    path: __dirname + '/public/js',
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.js/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.html$/, loader: 'html' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('css') },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass') }
    ]
  },
  plugins: [
    new ExtractTextPlugin('../css/style.css', {
      allChunks: true
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3100,
      proxy: 'http://localhost:2403',
    })
  ]
};
