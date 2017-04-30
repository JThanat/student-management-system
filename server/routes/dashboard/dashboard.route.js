const express = require('express')
const queryHelper = require('../../utilities/query')
const router = express.Router()

router.get('/number-of-student', (req, res) => {
  queryHelper.queryAndResponse({
    sql: `select substr(student_id, 1, 2) as academic_year,
	        count(*) as student_count from students 
          group by substr(student_id, 1, 2)`,
    req: req,
    res: res
  })
})

router.get('/average-gpax-year', (req, res) => {
  queryHelper.queryAndResponse({
    sql: `select substr(student_id, 1, 2) as academic_year, avg(gpax) as avg_gpax
	        from students group by SUBSTRING(student_id, 1, 2)`,
    req: req,
    res: res
  })
})

router.get('/average-gpax-all', (req, res) => {
  queryHelper.queryAndResponse({
    sql: `select avg(gpax) as avg_gpax from students`,
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
    sql: `select count(*) as leave_count from leaves 
	        left join students on leaves.sid = students.sid
          where semester=2 and year=2016`,
    req: req,
    res: res
  })
})

module.exports = router
