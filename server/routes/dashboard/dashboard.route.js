const express = require('express')
const queryHelper = require('../../utilities/query')
const router = express.Router()

router.get('/number-of-student-by-year', (req, res) => {
  queryHelper.queryAndResponse({
    sql: `select convert(substr(student_id, 1, 2), unsigned integer)-54 as student_year, 
          count(*) as student_count from students 
          where convert(substr(student_id, 1, 2), unsigned integer)-54<=4
	        group by substr(student_id, 1, 2)`,
    req: req,
    res: res
  })
})

router.get('/average-gpax-by-year', (req, res) => {
  queryHelper.queryAndResponse({
    sql: `select convert(substr(student_id, 1, 2), unsigned integer)-54 as academic_year, 
	        avg(gpax) as avg_gpax from students 
          where convert(substr(student_id, 1, 2), unsigned integer)-54 <= 4
          group by SUBSTRING(student_id, 1, 2);`,
    req: req,
    res: res
  })
})

router.get('/average-gpax-all', (req, res) => {
  queryHelper.queryAndResponse({
    sql: `select avg(gpax) as avg_gpax from students;`,
    req: req,
    res: res
  })
})

router.get('/leave-student', (req, res) => {
  queryHelper.queryAndResponse({
    sql: `select count(*) as leave_count from leaves 
	        left join students on leaves.sid = students.sid
          where semester=2 and year=2016`,
    req: req,
    res: res
  })
})

router.get('/overtime-student', (req, res) => {
  queryHelper.queryAndResponse({
    sql: `select substr(student_id, 1, 2) as academic_year,
	        count(*) as student_count from students 
          where convert(substr(student_id, 1, 2), unsigned integer)<56 and status!='G';`,
    req: req,
    res: res
  })
})

router.get('/student-activity-by-name', (req, res) => {
  queryHelper.queryAndResponse({
    sql: `select activity_name, count(*) as student_count from students_activities
	        left join activities on activities.activity_id = students_activities.activity_id
          group by activity_name`,
    req: req,
    res: res
  })
})

router.get('/student-activity-by-year', (req, res) => {
  queryHelper.queryAndResponse({
    sql: `select substr(student_id, 1, 2) as academic_year, count(*) as student_count 
          from students_activities
	        left join students on students.sid = students_activities.sid
          group by substr(student_id, 1, 2)`,
    req: req,
    res: res
  })
})

router.get('/number-of-student-history', (req, res) => {
  queryHelper.queryAndResponse({
    sql: `select substr(student_id, 1, 2) as academic_year,
	        count(*) as student_count from students 
          group by substr(student_id, 1, 2)`,
    req: req,
    res: res
  })
})

module.exports = router
