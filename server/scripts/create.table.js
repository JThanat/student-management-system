// -------------------------------------------------------------------------------
// this file contains the script which we might run automatically to create Table
// -------------------------------------------------------------------------------
const db = require('../utilities/db.js')
const queryString = require('../scripts/query.string')

const pool = db.get()

const listOfActions = [
  createTable('users', queryString.createUserTableQuery),
  endConnection
]

let currentIndex = 0

const runNextQueries = () => {
  var action = listOfActions[currentIndex++]
  action()
}

const createTable = (tableName, query) => {
  return function () {
    console.log('Creating table: ', tableName)
    pool.query(query, function (error, b, c, d) {
      if (error) console.log('error: ', error)
      runNextQueries()
    })
  }
}

const endConnection = () => {
  console.log('done creating tables!')
  db.end((err) => {
    console.error(err)
  })
}

runNextQueries(currentIndex)
