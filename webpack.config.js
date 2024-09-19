const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = (env, argv) => {
  console.log(`Webpack Mode: ${argv.mode}`); // Directly log the mode

  const isDevMode = argv.mode === "development";

  return {
    entry: "./src/index.js",
    // https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production
    watch: isDevMode,
    stats: "verbose",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                // options...
              },
            },
          ],
        },
        {
          test: /\.(html)$/,
          use: "html-loader",
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          type: "asset/resource",
        },
      ],
    },
    optimization: {
      minimizer: [
        `...`, // Extend existing minimizers (like `terser-webpack-plugin`)
        new CssMinimizerPlugin(),
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/[name].bundle.css",
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html"),
      }),
    ],
  };
};
