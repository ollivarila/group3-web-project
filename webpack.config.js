const path = require('path')
const  webpack  = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')

const config = (env, argv) => {
  console.log(argv)
  const backend_url = argv.mode === 'production'
    ? 'deployment url here'
    : 'http://localhost:3001'
  return {
    entry: './website/src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
      static: path.resolve(__dirname, 'dist'),
      compress: true,
      port: 3000,
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url)
      }),
      new HtmlWebPackPlugin({
        template: "./website/public/index.html",
        filename: "./index.html",
      })
    ]
  }
}

module.exports = config