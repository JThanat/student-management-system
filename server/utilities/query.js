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
    req,
    res
  } = params

  // console.log(sql)

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
  new Promise((resolve, reject) => {
    connection.query('SET sql_mode = ""', (err, result) => {
      if (err) {
        utils.log(err)
        reject(err)
      } else {
        resolve('test')
      }
    })
  }).then(() => {
    return new Promise((resolve, reject) => {
      connection.query(sql, (err, results) => {
        if (err) {
          utils.log(err)
          reject(err)
        } else {
          console.log(results)
          resolve(results)
        }
      })
    })
  }).then((result) => {
    res.status(200).json({
      success: true,
      data: parse ? parse(result) : result
    })
  }).catch(
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
  },
  /**
   * receive tableName and filterList which consists of the key and value which
   * is needed to be queried
   */
  filter: (tableName, filterList) => {
    const keys = Object.keys(filterList)
    let queryString = `SELECT * FROM ${tableName} WHERE `
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      queryString += `${key} = "${filterList[key]}"` + `${(i < keys.length - 1) ? ' AND ' : ''}`
    }
    return queryString
  },
  delete: (tableName, conditionList) => {
    const keys = Object.keys(conditionList)
    let queryString = `DELETE FROM ${tableName} WHERE `
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      queryString += `${key} = "${conditionList[key]}"` + `${(i < keys.length - 1) ? ' AND ' : ''}`
    }
    return queryString
  }
}

module.exports = {
  queryAndResponse,
  transformToSQL
}
