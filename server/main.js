const express = require('express')
const debug = require('debug')('app:server')
const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('../config/webpack.config')
const project = require('../config/project.config')
const compress = require('compression')
const bodyParser = require('body-parser')
const chalk = require('chalk')

const config = require('./config/config')
const db = require('./utilities/db')

const app = express()

// Apply gzip compression
app.use(compress())

// Apply Body-Parser Middleware
app.use(bodyParser())

// API : App route for
app.use('/api/', require('./routes/index'))

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (project.env === 'development') {
  const compiler = webpack(webpackConfig)

  debug('Enabling webpack dev and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : project.paths.client(),
    hot         : true,
    quiet       : project.compiler_quiet,
    noInfo      : project.compiler_quiet,
    lazy        : false,
    stats       : project.compiler_stats
  }))
  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr'
  }))

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(project.paths.public()))

  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.
  app.use('*', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
} else {
  debug(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(project.paths.dist()))
}

// ------------------------------------
// Connecting to MySQL
// ------------------------------------
if (Object.keys(config).length === 0 && config.constructor === Object) {
  console.error(
    chalk.red(
      '\n' +
      '=============================================================================================\n' +
      chalk.bold('Config File Error: No config file\n') +
      'Please copy file in server/config/config.sample.js to config.js then configuration your file.\n' +
      '=============================================================================================\n'
    )
  )
} else {
  db.connect(config.test ? db.MODE_TEST : db.MODE_PRODUCTION, (err) => {
    if (err) {
      console.error(chalk.red(chalk.bold('[sql] Cannot Connect To MySQL ') + err.message))
    } else {
      console.log(
        chalk.green('[sql] Successfully connect') +
        ' to MySQL on ' + config.db.hostName + ':' + config.db.port
      )
    }
  })
}

module.exports = app
