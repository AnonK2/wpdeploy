var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    bundle: './src/index.js',
  },
  output: {
    path: path.join(__dirname, 'dist'), // output bundle to "dist" folder
    filename: '[name].[chunkhash].js', // [name] replaced by entry's key(ex: bundle, vendor)
  },
  optimization: {
    runtimeChunk: {
      name: "manifest",
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          enforce: true,
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new webpack.HashedModuleIdsPlugin(), // to prevent hash changed in "vendor.[hash].js" when bundle.[xxx].js changed
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        // CUSTOM_HOST: JSON.stringify(process.env.CUSTOM_HOST),
        // HTTPS: JSON.stringify(process.env.HTTPS),
        // RUBY_BACKEND: JSON.stringify(process.env.RUBY_BACKEND),
      }
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, //don't apply babel-loader to any files inside node_modules
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};
