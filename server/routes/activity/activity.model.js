const query = require('../../utilities/query')

const ActivityColumns = [
  'activity_id',
  'activity_name',
  'max_score',
  'activity_description'
]

const TABLE_NAME = 'activities'

const getAllActivities = () => `select student_id,firstname, lastname, t1.activity_id, activity_name, activity_description , received_score, max_score from students_activities as t1
inner join activities as t2
on t1.activity_id = t2.activity_id
inner join students as t3
on t1.sid = t3.sid
order by student_id, activity_id`

const filterActivities = (filterList) => {
  return query.transformToSQL.filter(TABLE_NAME, filterList)
}

const insertActivity = (dataSet) => {
  return `insert into students_activities (sid, activity_id, received_score) select 
  (select sid from students where student_id = "${dataSet.student_id}") as sid, 
  (select activity_id from activities where activity_id = "${dataSet.activity_id}") as activity_id, 
  (select ${dataSet.received_score}) as received_score`
}

const deleteActivity = (dataSet) => {
  return `delete from students_activities where 
  activity_id = "${dataSet.activity_id}"
  and sid = (select sid from students where student_id = "${dataSet.student_id}")`
}

const updateActivity = (dataSet, oldData) => {
  return `update students_activities set 
  activity_id = "${dataSet.activity_id}",
  received_score = ${dataSet.received_score}
  where sid = (select sid from students where student_id = "${dataSet.student_id}")
  and activity_id = "${oldData.activity_id}"`
}

module.exports = {
  ActivityColumns,
  getAllActivities,
  filterActivities,
  insertActivity,
  deleteActivity,
  updateActivity
}
