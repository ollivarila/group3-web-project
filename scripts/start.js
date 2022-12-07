/* eslint-disable no-sequences */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack')
const chalk = require('react-dev-utils/chalk')
const clearConsole = require('react-dev-utils/clearConsole')
const WebpackDevServer = require('webpack-dev-server')
const { prepareUrls, createCompiler } = require('react-dev-utils/WebpackDevServerUtils')
const openBrowser = require('react-dev-utils/openBrowser')
const configFactory = require('../webpack.config')

process.env.NODE_ENV = 'development'

process.on('unhandledRejection', err => {
  throw err;
})

const config = configFactory({}, { mode: 'development' })

const { port } = config.devServer

const protocol = 'http'
const host = '0.0.0.0'

const urls = prepareUrls(protocol, host, port)

const useYarn = false
const useTypeScript = false

const compiler = createCompiler({
  appName: 'app',
  config,
  urls,
  useYarn,
  useTypeScript,
  webpack,
})

const options = config.devServer

const devServer = new WebpackDevServer(
  options,
  compiler,
)

devServer.startCallback(() => {
  clearConsole()
  console.log(chalk.cyan('Starting development server...'))
  console.log(chalk.cyan(`Opening browser in ${urls.localUrlForBrowser}...`))
  openBrowser(urls.localUrlForBrowser)
})
