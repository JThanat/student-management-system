const db = require('../utilities/db.js')
const utils = require('../utilities/utils.js')

exports.getAllStudent = (done) => {
  // Get connection from dataabase
  const connection = db.getConnection()

  // Query
  connection.query('SELECT * FROM students', (err, results, fields) => {
    if (err) {
      utils.log(err)
      return done(err)
    }
    done(null, results)
  })
}

exports.insert = () => {
  // add insert function here
}
