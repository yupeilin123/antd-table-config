'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const InlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
  mode: 'production',
  entry: {
    index: './src/app.js',
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve('dist'),
  },
  devtool: 'false',
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': path.resolve('src'),
    },
  },
  module: {
    noParse: [
      /moment/,
    ],
    rules: [
      {
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
        include: path.resolve('src'),
      },
      // css
      {
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
        include: /node_modules/,
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      // svg
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          limit: 10000,
          noquotes: true,
        },
      },
      // image
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:8].[ext]',
        },
      },
      // font
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      favicon: './public/favicon.ico',
      inject: true,
      inlineSource: 'runtime~.+\\.js',
    }),
    new OptimizeCSSAssetsPlugin(),
    new ManifestPlugin(),
    new InlineSourcePlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false,
          },
        },
        cache: true,
        parallel: true,
      }),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial',
        },
        antdUI: {
          name: 'chunk-antd',
          priority: 20,
          test: /[\\/]node_modules[\\/]antd[\\/]/,
        },
        commons: {
          name: 'chunk-comomns',
          test: /src\/components/,
          minChunks: 3,
          priority: 2,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: true,
    concatenateModules: true,
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  performance: {
    hints: false,
  },
};