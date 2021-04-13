const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  // https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader?url=false'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              // options...
            }
          },
        ]
      },
      {
        test: /\.(html)$/,
        use: 'html-loader'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].bundle.css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html")
    })
  ]
};