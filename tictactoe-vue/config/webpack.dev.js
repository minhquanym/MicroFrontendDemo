const commonConfig = require("./webpack.common");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require('../package.json');

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8082/"
  },
  devServer: {
    port: 8082,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'tictactoe',
      filename: 'remoteEntry.js',
      exposes: {
        './Tictactoe': './src/bootstrap'
      },
      shared: packageJson.dependencies
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};

module.exports = merge(commonConfig, devConfig);