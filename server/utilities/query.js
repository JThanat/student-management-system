const db = require('../utilities/db.js')
const utils = require('../utilities/utils.js')

const queryAndResponse = (sqlString, req, res) => {
  const connection = db.getConnection()
  new Promise(
    (resolve, reject) => {
      connection.query(
        sqlString,
        (err, results) => {
          if (err) {
            utils.log(err)
            return reject(err)
          } else {
            console.log('asdasdasdas')
            resolve(results)
          }
        }
      )
    }
  ).then(
    (result) => res.status(200).json({
      success: true,
      data: result
    }),
    (err) => res.status(500).json({
      success: false,
      err: err ? 'No error specify' : err.toString()
    })
  )
}

module.exports = {
  queryAndResponse
}
