const query = require('../../utilities/query')

const ProjectsColumns = [
  'project_id',
  'project_name',
  'project_description'
]

const TABLE_NAME = 'projects'

const getAllProjects = () => `SELECT * FROM ${TABLE_NAME}`

const filterProjects = (filterList) => {
  return query.transformToSQL.filter(TABLE_NAME, filterList)
}

const insertProject = (dataSet) => {
  return query.transformToSQL.insert(TABLE_NAME, dataSet)
}

module.exports = {
  ProjectsColumns,
  getAllProjects,
  filterProjects,
  insertProject
}
