import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';

import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import type { Configuration } from 'webpack';

const devServer: DevServerConfiguration = {
  hot: true,
  open: true,
  client: {
    overlay: {
      errors: true,
      warnings: false,
    },
  },
  host: 'localhost',
  port: 5000,
};

const webpackConfig = (env: any): Configuration => {
  const config: Configuration = {
    mode: 'production',
    entry: {
      app: path.resolve('./src/core/bootstrap.ts'),
    },
    output: {
      filename: 'bundle.js',
      chunkFilename: '[name].chunk.js',
      path: path.join(__dirname, 'dist'),
      clean: true,
    },
    module: {
      rules: [
        // typescript
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },

        // html
        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: path.resolve('./src/index.html'),
        },

        // css
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve('./src/index.html'),
      }),

      new webpack.optimize.SplitChunksPlugin({
        name: 'common',
        filename: 'common.js',
      }),
    ],
  };
  if (env && env.dev) {
    config.devServer = devServer;
    (config.devtool = 'inline-source-map'),
      config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  if (env && env.production) {
    config.devtool = 'source-map';
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
    );
  }

  return config;
};

module.exports = webpackConfig;
