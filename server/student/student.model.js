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

module.exports = {
  StudentColumns,
  getAllStudentSQL,
  getOneStudentSQL
}

// exports.insert = () => {
//   // add insert function here
// }
