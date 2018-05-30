const webpack = require("webpack");
const path = require('path');
const nodeExternals = require('webpack-node-externals');
require('dotenv').config();

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

const clientFilename = process.env.NODE_ENV === 'production' ? 'images.min.js': 'images.js';
const serverFilename = process.env.NODE_ENV === 'production' ? 'images-server.min.js': 'images-server.js';

const browserConfig = {
  entry: `${SRC_DIR}/browser/index.js`,
  output: {
    filename: clientFilename,
    path: DIST_DIR
  },
  module: {
    rules: [
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        loader : 'babel-loader',      
        query: {
          presets: ['react', 'env']
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          }
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/i, 
        use: [
          {
            loader: 'url-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true 
            }
          }
        ]
      }
    ]
  }
};

const serverConfig = {
  entry: `${SRC_DIR}/server/index.js`,
  output: {
    filename: serverFilename,
    path: DIST_DIR,
    libraryTarget: 'commonjs-module'
  },
  target: 'node',
  devtool: "cheap-module-source-map",
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: [/\.png$/],
        loader: "file-loader",
        options: {
          name: "media/[name].[ext]",
          emit: false
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'isomorphic-style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          }
        ],
      },
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        loader : 'babel-loader',
        options: {
          presets: ['react', 'env', 'es2015'],
          sourceMap: true
        }
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true
            }
          }
        ]
      }
    ]
  }
};

module.exports = [
  browserConfig,
  serverConfig,
];
