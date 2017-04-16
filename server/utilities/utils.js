const chalk = require('chalk')

const log = (err) => {
  if (err.stack) {
    let log = err.stack.split('\n').slice(0, 10)
    log.push('    ...')
    console.log(chalk.red(log.join('\n')))
  } else {
    let msg = ''
    if (err.code) {
      msg += `${chalk.bold(err.code)} `
      if (err.errno) msg += `(${chalk.bold(err.errno)}) `
    }
    if (err.message) msg += err.message
    console.log(chalk.red(msg))
  }
}

module.exports = exports = {
  log
}
