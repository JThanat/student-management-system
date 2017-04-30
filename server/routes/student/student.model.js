const query = require('../../utilities/query')

const StudentColumns = [
  'sid',
  'student_id',
  'curriculum_id',
  'member_id',
  'title',
  'firstname',
  'lastname',
  'email',
  'nationality',
  'birthdate',
  'gender',
  'citizen_id',
  'religion',
  'mobile',
  'img',
  'addr',
  'zipcode',
  'country',
  'emer_name',
  'emer_mobile',
  'emer_addr',
  'emer_zipcode',
  'emer_country',
  'highschool_name',
  'highschool_grade',
  'gpax',
  'semester_count',
  'summer_count',
  'status',
  'behavioral_score'
]
const TABLE_NAME = 'students'
const getAllStudentSQL = () => `SELECT * FROM ${TABLE_NAME}`

const getOneStudentSQL = (studentID) => {
  return `SELECT * FROM ${TABLE_NAME} WHERE student_id = "${studentID}"`
}

const deleteStudentSQL = (where) => {
  return query.transformToSQL.delete(TABLE_NAME, where)
}

const updateStudentSQL = (studentID, dataSet) => {
  return query.transformToSQL.update(TABLE_NAME, dataSet,
    `student_id = "${studentID}"`)
}

const insertStudentSQL = (dataSet) => {
  return query.transformToSQL.insert(TABLE_NAME, dataSet)
}

const filterStudentSQL = (filterList) => {
  return query.transformToSQL.filter(TABLE_NAME, filterList)
}

const getEnrollsCourseSQL = (id) => {
  return `SELECT students.student_id, enrollment_records.grade, courses.* FROM courses 
  INNER JOIN sections ON courses.course_id = sections.course_id
  INNER JOIN enrollment_records ON enrollment_records.course_id = sections.course_id
  INNER JOIN students ON students.sid = enrollment_records.sid
  WHERE student_id = "${id}"
  GROUP BY students.sid, courses.course_id;`
}

module.exports = {
  StudentColumns,
  getAllStudentSQL,
  getOneStudentSQL,
  deleteStudentSQL,
  updateStudentSQL,
  insertStudentSQL,
  filterStudentSQL,
  getEnrollsCourseSQL
}
