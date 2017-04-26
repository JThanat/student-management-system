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
const TABLE_NAME = 'students'
const getAllStudentSQL = () => `SELECT * FROM ${TABLE_NAME}`

const getOneStudentSQL = (studentID) => {
  return `SELECT * FROM ${TABLE_NAME} WHERE student_id = "${studentID}"`
}

const deleteStudentSQL = (dataSet) => {
  return query.transformToSQL.delete(TABLE_NAME, dataSet)
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

module.exports = {
  StudentColumns,
  getAllStudentSQL,
  getOneStudentSQL,
  deleteStudentSQL,
  updateStudentSQL,
  insertStudentSQL,
  filterStudentSQL
}
