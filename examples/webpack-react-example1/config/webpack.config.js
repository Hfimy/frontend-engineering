// @ts-nocheck
/**
 * @typedef {import('webpack').Configuration} WebpackConfiguration
 * @typedef {import('webpack-dev-server').Configuration} WebpackDevServerConfiguration
 */

const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const { resolve, getDevtool, getOutputPublicPath, getStyleModuleRules, getGlobalConstants } = require('./webpack.util');
const devProxy = require('./devProxy');

module.exports = (env = {}) => {
  const __ENV__ = env.__ENV__ || 'prod';
  const isDev = (process.env.isDev = __ENV__ === 'dev');
  process.env.NODE_ENV = isDev ? 'development' : 'production'; // different browserslist environments in package.json

  /** @type WebpackConfiguration */
  const config = {
    mode: isDev ? 'development' : 'production',

    devtool: getDevtool(__ENV__),

    entry: {
      main: [
        resolve('../node_modules/core-js/modules/es.set'),
        resolve('../node_modules/core-js/modules/es.map'),
        resolve('../node_modules/core-js/modules/es.array.iterator.js'),
        resolve('../src/index.js'),
      ],
    },

    output: {
      path: resolve('../dist'),
      filename: 'js/[name].bundle.[contenthash:8].js',
      chunkFilename: 'js/[name].chunk.[contenthash:8].js',
      assetModuleFilename: 'assets/[hash][ext]',
      publicPath: getOutputPublicPath(__ENV__),
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx|mjs|cjs)$/,
          include: resolve('../src'),
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        ...getStyleModuleRules(isDev),
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024,
            },
          },
          generator: {
            filename: 'assets/imgs/[hash][ext]',
          },
        },
      ],
    },

    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: resolve('../src/index.html'),
      }),
      new webpack.DefinePlugin(getGlobalConstants(__ENV__)),
    ],

    // 解析
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.mjs', '.cjs', '.css', '.less'],
      alias: {
        '@common': resolve('../src/common'),
        '@components': resolve('../src/components'),
        '@hooks': resolve('../src/hooks'),
        '@pages': resolve('../src/pages'),
        '@api': resolve('../src/api'),
      },
    },

    // 优化
    optimization: {
      runtimeChunk: { name: 'runtime' },
      moduleIds: isDev ? 'named' : 'deterministic', // 稳定moduleId
      chunkIds: isDev ? 'named' : 'deterministic', // 稳定chunkId
      minimize: !isDev, // 开发环境下不启用压缩
      minimizer: ['...', new CssMinimizerPlugin()], // '...' 使用默认值(TerserPlugin)
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|axios|history|scheduler|react-is|prop-types|object-assign|mini-create-react-context|hoist-non-react-statics|resolve-pathname|value-equal|tiny-invariant)[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 100,
          },
        },
      },
    },
  };

  if (isDev) {
    // development模式下配置devServer
    /** @type WebpackDevServerConfiguration */
    config.devServer = {
      contentBase: resolve('../dist'),
      port: 8080,
      historyApiFallback: true,
      hot: true,
      proxy: devProxy,
      open: true,
    };
    // Fast Refresh
    config.plugins.push(new ReactRefreshWebpackPlugin());
  } else {
    // production模式下分离css文件
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].bundle.[contenthash:8].css',
        chunkFilename: 'css/[name].chunk.[contenthash:8].css',
      })
    );

    // npm run analyze - 配置webpack-bundle-analyzer
    if (process.env.npm_config_analyze === 'true') {
      config.plugins.push(new BundleAnalyzerPlugin());
    }
  }

  return config;
};
