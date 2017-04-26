const query = require('../../utilities/query')

const StudentColumns = [
  'student_id',
  'curid',
  'memid',
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

const getAllStudentSQL = () => 'SELECT * FROM students'

const getOneStudentSQL = (studentID) => {
  return `SELECT * FROM students WHERE student_id = "${studentID}"`
}

const deleteStudentSQL = (studentID) => {
  return `DELETE FROM students WHERE student_id = "${studentID}"`
}

const updateStudentSQL = (studentID, dataSet) => {
  return query.transformToSQL.update('students', dataSet,
    `student_id = "${studentID}"`)
}

const insertStudentSQL = (studentID, dataSet) => {
  return query.transformToSQL.insert('students', dataSet)
}

module.exports = {
  StudentColumns,
  getAllStudentSQL,
  getOneStudentSQL,
  deleteStudentSQL,
  updateStudentSQL,
  insertStudentSQL
}
