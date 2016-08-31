const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const sources = [
  './node_modules/ng-admin/build/ng-admin.min.css',
  './node_modules/ng-admin/build/ng-admin.min.js',
  './src/index.js'
];

module.exports = {
  entry: {
    'bundle': sources
  },
  output: {
    path: "public/js",
    filename: "[name].js"
  },
  module: {
    loaders: [
      { test: /\.js/, loader: 'babel' },
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
