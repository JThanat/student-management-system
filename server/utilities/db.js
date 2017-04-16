const mysql = require('mysql')
const async = require('async')
const config = require('../config/config.js')

// const PRODUCTION_DB = 'app_prod_database'
// const TEST_DB = 'app_test_database'

const state = {
  connection: null,
  mode: null
}

exports.MODE_TEST = 'MODE_TEST'
exports.MODE_PRODUCTION = 'MODE_PRODUCTION'

exports.connect = (mode, done) => {
  state.connection = mysql.createConnection({
    connectionLimit: config.db.connectionLimit,
    host: config.db.hostName,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.databaseName,
    debug: config.debug
  })

  state.connection.connect(done)
  state.mode = mode
}

exports.getConnection = () => {
  return state.connection
}

// This function will insert from bundle of table into database
// we might not use this because we can run auto script file as well
exports.fixtures = (data, done) => {
  let connection = state.connection
  if (!connection) return done(new Error('Missing database connection.'))

  let names = Object.keys(data.tables)
  let keys = null
  let values = null

  async.each(names, (name, callBack) => {
    async.each(data.tables[name], (row, callBack) => {
      keys = Object.keys(row)
      values = keys.map((key) => {
        return "'" + row[key] + "'"
      })

      connection.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', callBack)
    }, callBack)
  }, done)
}

// This function will clear the data in the database (This does not drop the table)
exports.clear = (tables, done) => {
  let connection = state.connection
  if (!connection) return done(new Error('Missing database connection.'))

  async.each(tables, (name, callBack) => {
    connection.query('DELETE * FROM ' + name, callBack)
  }, done)
}
