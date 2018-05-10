const webpack = require("webpack");
const path = require('path');
const nodeExternals = require('webpack-node-externals');
require('dotenv').config();

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = process.env.NODE_ENV === 'production' 
  ? path.join(__dirname, '/client/public') 
  : path.join(__dirname, '/client/dist');

const filename = process.env.NODE_ENV === 'production' ? 'bundle.min.js': 'bundle.js';

const browserConfig = {
  entry: `${SRC_DIR}/browser/index.js`,
  output: {
    filename: filename,
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
              localIdentName: '[local]___[hash:base64:5]'
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
  entry: `./client/src/server/index.js`,
  output: {
    filename: 'serverBundle.js',
    path: path.join(__dirname, './server/'),
    libraryTarget: 'commonjs2'
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
          name: "public/media/[name].[ext]",
          publicPath: url => url.replace(/public/, ""),
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
              localIdentName: '[local]___[hash:base64:5]'
            }
          }
        ],
      },
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        loader : 'babel-loader',     
        // query: {

        // },
        options: {
          presets: ['react', 'env'],
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
  // browserConfig,
  serverConfig,
];
