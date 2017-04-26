const db = require('../utilities/db.js')
const utils = require('../utilities/utils.js')

/**
 * Query and response helper
 */

const responseWithError = (res, err) => {
  let errMsg = 'No error log found'
  if (typeof err === 'string') errMsg = err
  if (err instanceof Error) errMsg = err.message
  res.status(500).json({
    success: false,
    err: errMsg
  })
}

const queryAndResponse = (params) => {
  const {
    sql,
    parse,
    res,
    req
  } = params

  if (!sql) throw new Error('sql is not defined')
  if (typeof sql !== 'string') {
    throw new Error('Type of sql is not string')
  }
  if (!res) throw new Error('res object is not defined')
  if (!req) throw new Error('req object is not defined')
  if (parse && typeof parse !== 'function') {
    throw new Error('Type of parse is not defined')
  }

  const connection = db.getConnection()
  new Promise(
    (resolve, reject) => {
      connection.query(
        sql,
        (err, results) => {
          if (err) {
            utils.log(err)
            reject(err)
          } else {
            resolve(results)
          }
        }
      )
    }
  ).then(
    (result) => res.status(200).json({
      success: true,
      data: parse ? parse(result) : result
    }),
    (err) => responseWithError(res, err)
  ).catch(
    (err) => responseWithError(res, err)
  )
}

/**
 * Transform to SQL
 */

const transformToSQL = {
  insert: (tableName, dataSet) => {
    let columnsList = []
    let valuesList = []
    for (let key in dataSet) {
      columnsList.push(key)
      valuesList.push(dataSet[key])
    }
    return `INSERT INTO ${tableName} (${columnsList.join(', ')}) ` +
      `VALUES (${valuesList.map((val) => `"${val}"`).join(', ')})`
  },
  update: (tableName, dataSet, where) => {
    let setCondition = []
    for (let key in dataSet) {
      setCondition.push(`${key} = "${dataSet[key]}"`)
    }
    return `UPDATE ${tableName} SET ${setCondition.join(', ')} WHERE ${where}`
  }
}

module.exports = {
  queryAndResponse,
  transformToSQL
}
