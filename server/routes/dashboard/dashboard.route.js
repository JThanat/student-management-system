const express = require('express')
const queryHelper = require('../../utilities/query')
const router = express.Router()

const year = 2016
const sidBase = 54

router.get('/number-of-student-by-year', (req, res) => {
  queryHelper.queryAndResponse({
    sql: `select convert(substr(student_id, 1, 2), unsigned integer)-${sidBase} as student_year, 
          count(*) as student_count from students 
          where convert(substr(student_id, 1, 2), unsigned integer)-${sidBase}<=4
          group by substr(student_id, 1, 2)`,
    req: req,
    res: res
  })
})

router.get('/average-gpax-by-year', (req, res) => {
  queryHelper.queryAndResponse({
    sql: `select convert(substr(student_id, 1, 2), unsigned integer)-${sidBase} as academic_year, 
          avg(gpax) as avg_gpax from students 
          where convert(substr(student_id, 1, 2), unsigned integer)-${sidBase} <= 4
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
          where semester=2 and year=${year}`,
    req: req,
    res: res
  })
})

router.get('/overtime-student', (req, res) => {
  queryHelper.queryAndResponse({
    sql: `select convert(substr(student_id, 1, 2), unsigned integer)-${sidBase} as student_year,
          count(*) as student_count from students 
          where convert(substr(student_id, 1, 2), unsigned integer)<${sidBase + 2}
          and status!='G' GROUP BY student_year;`,
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

router.get('/student-competition-by-year', (req, res) => {
  queryHelper.queryAndResponse({
    sql: `select count(*) as student_count,
          convert(substr(student_id, 1, 2), unsigned integer)-${sidBase} as student_year FROM (                    
          select competition_name, T1.team_id, sid FROM competitions as T1
          left join teams_students as T2 on T1.team_id = T2.team_id) as T12
          left join students as T3 on T12.sid = T3.sid
          where convert(substr(student_id, 1, 2), unsigned integer)-${sidBase}<=4
          group by convert(substr(student_id, 1, 2), unsigned integer)-${sidBase}`,
    req: req,
    res: res
  })
})

router.get('/student-project-by-year', (req, res) => {
  queryHelper.queryAndResponse({
    sql: `select convert(substr(student_id, 1, 2), unsigned integer)-${sidBase} as student_year, 
          count(*) as student_count from students_projects
          left join students on students.sid = students_projects.sid
          where convert(substr(student_id, 1, 2), unsigned integer)-${sidBase}<=4
          group by convert(substr(student_id, 1, 2), unsigned integer)-${sidBase}`,
    req: req,
    res: res
  })
})

module.exports = router
