const query = require('../../utilities/query')

const LeavesColumns = [
  'sid',
  'semester',
  'year',
  'leave_type',
  'leave_description'
]

const TABLE_NAME = 'leaves'

const getAllLeaves = () => `SELECT * FROM ${TABLE_NAME}`

const filterLeaves = (filterList) => {
  return query.transformToSQL.filter(TABLE_NAME, filterList)
}

const insertLeave = (dataSet) => {
  return query.transformToSQL.insert(TABLE_NAME, dataSet)
}

const deleteLeave = (conditionSet) => {
  return query.transformToSQL.delete(TABLE_NAME, conditionSet)
}

module.exports = {
  LeavesColumns,
  getAllLeaves,
  filterLeaves,
  insertLeave,
  deleteLeave
}
