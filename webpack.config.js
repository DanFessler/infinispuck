const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const SRC = path.resolve(__dirname, "src");

module.exports = {
  mode: "development",
  entry: "./src/js/main.js",
  output: {
    path: __dirname + "/dist/",
    filename: "./js/main.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
        },
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.(wav|png)$/,
        include: SRC,
        loader: "file-loader",
        exclude: /(node_modules|bower_components)/,
        options: {
          name: "images/[name].[ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new BrowserSyncPlugin({
      host: "localhost",
      port: 3000,
      server: { baseDir: ["dist"] },
      files: ["./dist/*"],
      notify: false,
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      favicon: "favicon.ico",
      template: "src/index.html",
    }),
  ],
  watch: true,
  devtool: "source-map",
};
