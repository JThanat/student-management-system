const query = require('../../utilities/query')

const PunishmentRecordColumns = [
  'sid',
  'punishment_id',
  'timestamp'
]

const TABLE_NAME = 'punishment_records'

const getAllPunishment = () => `SELECT  student_id, firstname, lastname, punishment_name, score_deduction 
FROM punishment_records 
left join students 
on punishment_records.sid = students.sid 
left join punishment_criteria
on punishment_records.punishment_id = punishment_criteria.punishment_id`

const filterStudentSQL = (filterList) => {
  return query.transformToSQL.filter(TABLE_NAME, filterList)
}

const insertPunishment = (dataSet) => {
  console.log(dataSet)
  return `INSERT INTO ${TABLE_NAME} 
  (${PunishmentRecordColumns.join(',')}) VALUES (${dataSet.sid}, ${dataSet.punishment_id}, NOW())`
}

const deletePunishment = (dataSet) => {
  return query.transformToSQL.delete(TABLE_NAME, dataSet)
}

module.exports = {
  PunishmentRecordColumns,
  getAllPunishment,
  filterStudentSQL,
  insertPunishment,
  deletePunishment
}
