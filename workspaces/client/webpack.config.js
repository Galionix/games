// // const path = require("path");
// // const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// // const HtmlWebPackPlugin = require("html-webpack-plugin");

// // module.exports = {
// //   entry: "./src/index.ts",
// //   target: "web",
// //   output: {
// //     filename: "[name].js",
// //     sourceMapFilename: "[file].map",
// //     path: path.resolve(__dirname, "dist"),
// //   },
// //   devtool: "source-map",
// //   module: {
// //     rules: [
// //       {
// //         test: /\.(png|svg|jpg|jpeg|gif|tmx)$/i,
// //         type: "asset/resource",
// //       },
// //       {
// //         test: /\.js$/,
// //         use: ["source-map-loader"],
// //         exclude: [path.resolve(__dirname, "node_modules/excalibur")],
// //         enforce: "pre",
// //       },
// //       {
// //         test: /\.tsx?$/,
// //         use: "ts-loader",
// //         exclude: /node_modules/,
// //       },
// //     ],
// //   },
// //   resolve: {
// //     extensions: [".tsx", ".ts", ".js"],
// //   },
// //   optimization: {
// //     splitChunks: {
// //       chunks: "all",
// //     },
// //   },
// //   plugins: [
// //     new CleanWebpackPlugin(),
// //     new HtmlWebPackPlugin({
// //       title: "Excalibur Webpack Sample",
// //     }),
// //   ],
// // };

// const path = require("path");
// const webpack = require("webpack");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const CopyPlugin = require("copy-webpack-plugin");
// const HtmlWebPackPlugin = require("html-webpack-plugin");
// const webpackMerge = require("webpack-merge");

// const modeConfig = (env) => require(`./build-utils/webpack.${env}`)(env);

// module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
//   return webpackMerge(
//     {
//       entry: "./src/index.ts",
//       mode,
//       devtool: "source-map",
//       module: {
//         rules: [
//           {
//             test: /\.js$/,
//             use: ["source-map-loader"],
//             exclude: [path.resolve(__dirname, "node_modules/excalibur")],
//             enforce: "pre",
//           },
//           {
//             test: /\.tsx?$/,
//             use: "ts-loader",
//             exclude: /node_modules/,
//           },
//           {
//             test: /\.json$/,
//             use: "file-loader",
//             type: "javascript/auto",
//           },
//           {
//             test: /\.(png|jpg|bmp)$/,
//             use: [
//               {
//                 loader: "file-loader",
//                 options: {
//                   emitFile: true,
//                 },
//               },
//             ],
//           },
//         ],
//       },
//       resolve: {
//         extensions: [".tsx", ".ts", ".js"],
//       },
//       output: {
//         filename: "[name].js",
//         sourceMapFilename: "[file].map",
//         path: path.resolve(__dirname, "dist"),
//       },
//       optimization: {
//         splitChunks: {
//           chunks: "all",
//         },
//       },
//       plugins: [
//         new CleanWebpackPlugin({}),
//         new HtmlWebPackPlugin({
//           title: "Excalibur Webpack Sample",
//         }),
//         new CopyPlugin([
//           {
//             from: ".//src//assets//maps//map1//tileset.jpg",
//             to: "./tileset.jpg",
//           },
//         ]),
//       ],
//     },
//     modeConfig(mode),
//   );
// };

const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/main.ts",
  mode: "development",
  devtool: "source-map",
  devServer: {
    port: 9000,
    devMiddleware: {
      writeToDisk: true,
    },
    static: {
      directory: path.resolve(__dirname),
    },
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        "index.html",
        { from: "assets/", to: "assets/" },
        { from: "img/", to: "img/" },
      ],
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    sourceMapFilename: "[file].map",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|bmp|wav|mp3)$/,
        type: "asset/resource",
      },
    ],
  },
};
