const query = require('../../utilities/query')
const moment = require('moment')

const PunishmentRecordColumns = [
  'sid',
  'punishment_id',
  'timestamp'
]

const TABLE_NAME = 'punishment_records'


const getAllPunishment = () => `select  student_id, firstname, lastname, t1.punishment_id, punishment_name, score_deduction, timestamp 
from punishment_records as t1
left join students as t2 
on t1.sid = t2.sid 
left join punishment_criteria as t3
on t1.punishment_id = t3.punishment_id`

const filterStudentSQL = (filterList) => {
  return query.transformToSQL.filter(TABLE_NAME, filterList)
}

const insertPunishment = (dataSet) => {
  return `insert into punishment_records ( sid, punishment_id, timestamp) select
  (select sid from students where student_id = ${dataSet.student_id}) As sid,
  (select punishment_id from punishment_criteria where punishment_id = ${dataSet.punishment_id}) As punishment_id,
  (select NOW()) As timestamp`
}

const updatePunishment = (dataSet, oldDataSet) => {
  return `update punishment_records 
  set punishment_records.sid = (select sid from students where student_id = "${dataSet.student_id}"), 
  punishment_records.punishment_id = (select punishment_id from punishment_criteria where punishment_id = ${dataSet.punishment_id}) 
  where timestamp = "${moment.utc(dataSet.timestamp).local().format('YYYY-MM-DD HH:mm:ss')}" and punishment_records.punishment_id = ${oldDataSet.punishment_id} and sid = (select sid from students where student_id = "${dataSet.student_id}")`
}
const deletePunishment = (dataSet) => {
  return `delete from punishment_records where 
  sid = (select sid from students where student_id = "${dataSet.student_id}") 
  and timestamp = "${moment.utc(dataSet.timestamp).local().format('YYYY-MM-DD HH:mm:ss')}"  
  and punishment_id = ${dataSet.punishment_id};`
}

module.exports = {
  PunishmentRecordColumns,
  getAllPunishment,
  filterStudentSQL,
  insertPunishment,
  deletePunishment,
  updatePunishment
}
