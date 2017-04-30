const query = require('../../utilities/query')

const LeavesColumns = [
  'sid',
  'semester',
  'year',
  'leave_type',
  'leave_description'
]

const TABLE_NAME = 'leaves'

const getAllLeaves = () => `select student_id, firstname, lastname, semester, year, leave_type, leave_description 
from ${TABLE_NAME} as t1
left join students as t2
on t1.sid = t2.sid`

const filterLeaves = (filterList) => {
  return query.transformToSQL.filter(TABLE_NAME, filterList)
}

const insertLeave = (dataSet) => {
  return `insert into ${TABLE_NAME} ( sid, semester, year, leave_type ,leave_description) select 
  (select sid from students where student_id = "${dataSet.student_id}") as sid, 
  (select ${dataSet.semester}) as semester,
  (select ${dataSet.year}) as year,
  (select "${dataSet.leave_type}") as leave_type,
  (select "${dataSet.leave_description}") as leave_description`
}

const updateLeave = (dataSet, oldDataSet) => {
  return `update leaves 
  set leaves.sid = (select sid from students where student_id = "${dataSet.student_id}"),
  semester = ${dataSet.semester},
  year = ${dataSet.year},
  leave_type = "${dataSet.leave_type}",
  leave_description = "${dataSet.leave_description}"
  where semester = "${oldDataSet.semester}" and year = "${oldDataSet.year}" and sid = (select sid from students where student_id = "${dataSet.student_id}")`
}

const deleteLeave = (dataSet) => {
  return `delete from leaves where
  sid = (select sid from students where student_id = "${dataSet.student_id}") 
  and semester = ${dataSet.semester}  
  and year = ${dataSet.year}`
}

module.exports = {
  LeavesColumns,
  getAllLeaves,
  filterLeaves,
  insertLeave,
  deleteLeave,
  updateLeave
}
