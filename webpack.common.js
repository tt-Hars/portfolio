/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
// const HandlebarsPlugin = require("handlebars-webpack-plugin");
// const CopyPlugin = require('copy-webpack-plugin');
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devtool: 'source-map',
  optimization: {
    usedExports: true
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            // disable type checker - we will use it in fork plugin
            transpileOnly: true
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
            isDevelopment
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      { test: /\.(handlebars|hbs)$/, loader: "handlebars-loader" }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
        'handlebars': 'handlebars/dist/handlebars.js'
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].css'
    }),
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    // new CopyPlugin({
    //   patterns: [{ from: 'src/assets', to: 'assets' }]
    // }),
    new ESLintPlugin({
      extensions: ['.tsx', '.ts', '.js'],
      exclude: 'node_modules',
      context: 'src'
    }),
    new HtmlWebpackPlugin({
        title: 'My portfolio',
        template: path.join(process.cwd(), "src","templates", "index.hbs"),
        minify: !isDevelopment && {
            html5: true,
            collapseWhitespace: true,
            caseSensitive: true,
            removeComments: true,
            removeEmptyElements: true
        },
})
    // new HandlebarsPlugin({
    //     // path to hbs entry file(s). Also supports nested directories if write path.join(process.cwd(), "app", "src", "**", "*.hbs"),
    //     entry: path.join(process.cwd(), "src","templates", "*.hbs"),
    //     // output path and filename(s). This should lie within the webpacks output-folder
    //     // if ommited, the input filepath stripped of its extension will be used
    //     output: path.join(process.cwd(), "src", "index.html"),
    //     // you can also add a [path] variable, which will emit the files with their relative path, like
    //     // output: path.join(process.cwd(), "build", [path], "[name].html"),
        
    //     // data passed to main hbs template: `main-template(data)`
    //     // data: require("./app/data/project.json"),
    //     // or add it as filepath to rebuild data on change using webpack-dev-server
    //     // data: path.join(__dirname, "app/data/project.json"),
  
    //     // globbed path to partials, where folder/filename is unique
    //     partials: [
    //       path.join(process.cwd(), "app", "src", "templates", "partials", "*.hbs")
    //     ],
  
    //     // register custom helpers. May be either a function or a glob-pattern
    //     // helpers: {
    //     //   nameOfHbsHelper: Function.prototype,
    //     //   projectHelpers: path.join(process.cwd(), "app", "helpers", "*.helper.js")
    //     // },
  
    //     // hooks
    //     // getTargetFilepath: function (filepath, outputTemplate) {},
    //     // getPartialId: function (filePath) {}
    //     // onBeforeSetup: function (Handlebars) {},
    //     // onBeforeAddPartials: function (Handlebars, partialsMap) {},
    //     // onBeforeCompile: function (Handlebars, templateContent) {},
    //     // onBeforeRender: function (Handlebars, data, filename) {},
    //     // onBeforeSave: function (Handlebars, resultHtml, filename) {},
    //     // onDone: function (Handlebars, filename) {}
    //   })
  ]
};