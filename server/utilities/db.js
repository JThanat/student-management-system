const mysql = require('mysql')
const async = requires('async')
const config = require('../config/config.js')

const PRODUCTION_DB = 'app_prod_database'
const TEST_DB = 'app_test_database'

const state = {
  pool: null,
  mode: null
}

exports.MODE_TEST = 'mode_test'
exports.MODE_PRODUCTION = 'mode_production'

exports.connect = (mode, done) => {
  state.pool = mysql.createPool({
    connectionLimit: config.db.connectionLimit,
    host: config.db.hostName,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.databaseName
  })
  state.mode = mode
  done()
}

exports.get = () => {
  return state.pool
}

// This function will insert from bundle of table into database 
exports.fixtures = (data, done) => {
  let pool = state.pool
  if (!pool) return done(new Error('Missing database connection.'))

  let names = Object.keys(data.tables)
  let keys = null
  let values = null

  async.each(names, (name, callBack) => {
    async.each(data.tables[name], (row, callBack) => {
      keys = Object.keys(row)
      values = keys.map((key) => {
        return "'" + row[key] + "'"
      })

      pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', callBack)
    }, callBack)
  }, done)
}

// This function will clear the data in the database (This does not drop the table)
exports.clear = (tables, done) => {
  let pool = state.pool
  if (!pool) return done(new Error('Missing database connection.'))

  async.each(tables, (name, callBack) => {
    pool.query('DELETE * FROM ' + name, callBack)
  }, done)
}
