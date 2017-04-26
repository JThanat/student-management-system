const query = require('../../utilities/query')

const ActivityColumns = [
  'activity_id',
  'activity_name',
  'max_score',
  'activity_description'
]

const TABLE_NAME = 'activities'

const getAllActivities = () => `SELECT * FROM ${TABLE_NAME}`

const filterActivities = (filterList) => {
  return query.transformToSQL.filter(TABLE_NAME, filterList)
}

const insertActivity = (dataSet) => {
  return query.transformToSQL.insert(TABLE_NAME, dataSet)
}

module.exports = {
  ActivityColumns,
  getAllActivities,
  filterActivities,
  insertActivity
}
