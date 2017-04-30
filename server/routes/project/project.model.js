const query = require('../../utilities/query')

const ProjectsColumns = [
  'project_id',
  'project_name',
  'project_description'
]

const TABLE_NAME = 'projects'

const getAllProjects = () => `select t3.project_id, t3.project_name,student_id, firstname, lastname, t3.project_description from does_projects as t1
inner join students as t2
on t1.sid = t2.sid
inner join projects as t3
on t1.project_id = t3.project_id`

const filterProjects = (filterList) => {
  return query.transformToSQL.filter(TABLE_NAME, filterList)
}

const insertProject = (dataSet) => {
  console.log(dataSet)
  return `insert into does_projects (project_id, sid) select 
  (select sid from students where student_id = "${dataSet.student_id}") as sid, 
  (select project_id from projects where projects.project_id = ${dataSet.project_id})`
}

const deleteProject = (dataSet) => {
  return `delete from does_projects 
  where sid = (select sid from students where student_id = "${dataSet.student_id}") and project_id = ${dataSet.project_id}`
}

const updateProject = (dataSet, oldData) => {
  return `update does_projects 
  set project_id = (select project_id from projects where projects.project_id = ${dataSet.project_id} ) 
  where sid = (select sid from students where student_id = "${dataSet.student_id}") and project_id = (select project_id from projects where projects.project_id = ${oldData.project_id} )`
}

module.exports = {
  ProjectsColumns,
  getAllProjects,
  filterProjects,
  insertProject,
  deleteProject,
  updateProject
}
