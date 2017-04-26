const query = require('../../utilities/query')

const PunishmentRecordColumns = [
  'sid',
  'punishment_id',
  'timestamp'
]

const TABLE_NAME = 'punishment_records'

const getAllPunishment = () => `SELECT * FROM ${TABLE_NAME}`

const filterStudentSQL = (filterList) => {
  return query.transformToSQL.filter(TABLE_NAME, filterList)
}

const insertPunishment = (dataSet) => {
  return query.transformToSQL.insert(TABLE_NAME, dataSet)
}

module.exports = {
  PunishmentRecordColumns,
  getAllPunishment,
  filterStudentSQL,
  insertPunishment
}
