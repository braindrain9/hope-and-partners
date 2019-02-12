var path = require('path');
var webpack = require('webpack');
var config = require('./config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/main.js'],
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'bundle.js',
    // filename: '[name].js',
    // chunkFilename: '[name]-[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'image-webpack-loader',
        // Specify enforce: 'pre' to apply the loader
        // before url-loader/svg-url-loader
        // and not duplicate it in rules with them
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              scss: [
                'vue-style-loader',
                'css-loader',
                {
                  loader: 'sass-loader'
                },
                {
                  loader: 'sass-resources-loader',
                  options: {
                    resources: [
                      path.resolve(__dirname, './src/assets/scss/_variables.scss'),
                      path.resolve(__dirname, './src/assets/scss/_mixins.scss'),
                    ]
                  }
                }
              ]
            }
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader?removeSVGTagAttrs=false'
      },
      {
        test: /\.(png|jpg|jpe?g|gif)$/,
        loader: 'url-loader',
        options: {
          // Images larger than 10 KB won’t be inlined
          limit: 10 * 1024,
          name (file) {
            return '/[path][name].[ext]';
          },
          exclude: '/src/assets/img/partners/'
        }
      },
      {
        test: /\.css$/,
        use: [
        'style-loader',
        'css-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin(config),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.ProvidePlugin({
      THREE: "three"
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets/json', to: 'src/assets/json' },
      { from: 'src/assets/img/partners', to: 'src/assets/img/partners' }
    ])
  ]
};

if (process.env.NODE_ENV === 'production') {

  module.exports.devtool = false;
  // module.exports.output.filename = '[name].[hash].js';

  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new ImageminPlugin({
      pngquant: {
        quality: '85-90'
      }
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: module => module.context && module.context.indexOf('node_modules') !== -1
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true,
    //   chunksSortMode: 'dependency'
    // })
  ]);

}
