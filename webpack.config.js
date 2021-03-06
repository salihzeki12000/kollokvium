const Path = require('path');
const Webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const sourceFolder = Path.resolve(__dirname, 'src');
const outFolder = Path.resolve(__dirname, 'dist', 'client');
const assetFolders = ['css', 'img'];

const package = require('./package.json');

module.exports = {
  mode:"production", 
  watch: false,
  entry: {    
    kollkovium : Path.join(sourceFolder, 'client', 'app'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            allowTsInNodeModules: 'true'
          }
        }
      },
    ],
  },
  plugins: [

    new CopyPlugin(assetFolders.map(folder => new Object({ from : Path.join(sourceFolder, folder), to: folder}))),

    new HtmlWebpackPlugin({
      template: Path.join(sourceFolder, 'index.html')
    }),
    new Webpack.DefinePlugin({
      'process.env.WSS_SERVER_URL': JSON.stringify(process.env.WSS_SERVER_URL),
      'process.env.KOLLOKVIUM_VERSION': JSON.stringify(process.env.KOLLOKVIUM_VERSION || package.version)
    })
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  
  output: {
    path: outFolder,
    filename: Path.join('js', '[name]-bundle.js')
  }
}