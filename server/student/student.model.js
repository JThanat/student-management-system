const mysql = require('mysql')
const db = require('../utilities/db.js')

exports.getAllStudent = (done) => {
  // get all student from the table
  let pool = db.get()

  pool.query('SELECT * FROM student', (err, results, fields) => {
    if (err) return done(err)
    done(null, results)
  })
}

exports.insert = () => {
  // add insert function here
}
