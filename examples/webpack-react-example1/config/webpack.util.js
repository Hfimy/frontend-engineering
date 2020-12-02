const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const resolve = _path => path.resolve(__dirname, _path);

const getDevtool = __ENV__ => {
  switch (__ENV__) {
    case 'dev':
      return 'cheap-module-source-map';
    case 'test':
    case 'uat':
      return 'source-map';
    case 'prod':
      return false;
    default:
      return false;
  }
};

const getOutputPublicPath = __ENV__ => {
  switch (__ENV__) {
    case 'dev':
      return '/';
    case 'test':
      return 'https://testcdn.com/projectname/last/dist/';
    case 'uat':
      return 'https://uatcdn.com/projectname/last/dist/';
    case 'prod':
      return 'https://prodcdn.com/projectname/last/dist/';
    default:
      return 'https://prodcdn.com/projectname/last/dist/';
  }
};

const getStyleModuleRules = isDev => {
  // style files regexes
  const cssRegex = /\.css$/;
  const cssModuleRegex = /\.module\.css$/;
  const lessRegex = /\.less$/;

  const styleInclude = resolve('../src');
  const styleLoader = isDev ? 'style-loader' : MiniCssExtractPlugin.loader;
  const cssModulesLocalIdentName = isDev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:5]';
  return [
    {
      test: cssRegex,
      include: styleInclude,
      exclude: cssModuleRegex,
      use: [styleLoader, 'css-loader', 'postcss-loader'],
    },
    {
      test: cssModuleRegex,
      include: styleInclude,
      use: [
        styleLoader,
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: cssModulesLocalIdentName,
            },
          },
        },
        'postcss-loader',
      ],
    },
    {
      test: lessRegex,
      include: styleInclude,
      use: [styleLoader, 'css-loader', 'postcss-loader', 'less-loader'],
    },
  ];
};

const getGlobalConstants = (__ENV__ = 'prod') => {
  const _path = `../globalConstants/env.${__ENV__}.js`;
  const originalConstants = require(_path);
  const appliedConstants = {};
  Object.keys(originalConstants).forEach(key => {
    appliedConstants[key] = JSON.stringify(originalConstants[key]);
  });
  return appliedConstants;
};

module.exports = {
  resolve,
  getDevtool,
  getOutputPublicPath,
  getStyleModuleRules,
  getGlobalConstants,
};
