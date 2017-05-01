const express = require('express')
const queryHelper = require('../../utilities/query')
const router = express.Router()

router.get('/advisees', (req, res) => {
  let where = req.query.where ? req.query.where.replace('WHERE', 'AND') : ''
  // const member_id = req.user.member_id
  const memberId = 1
  queryHelper.queryAndResponse({
    sql: `select student_id, s.firstname, s.lastname, s.member_id, f.member_name, s.gpax, s.status from students as s 
          inner join advisors as a 
          on s.member_id = a.member_id 
          inner join faculty_members as f 
          on s.member_id = f.member_id 
          where f.member_id = ${memberId} ${where}`,
    req: req,
    res: res
  })
})

router.get('/project/advisees', (req, res) => {
  let where = req.query.where ? req.query.where.replace('WHERE', 'AND') : ''
  // const member_id = req.user.member_id
  const memberId = 1
  queryHelper.queryAndResponse({
    sql: `select s.student_id, s.firstname, s.lastname, p.project_name, p.project_description  from advisors as a
          inner join projects_advisors as pa
          on a.member_id = pa.member_id
          inner join projects as p
          on pa.project_id = p.project_id
          inner join students as s
          on pa.sid = s.sid
          where a.member_id = ${memberId} ${where}
          order by p.project_name`,
    req: req,
    res: res
  })
})

router.get('/competition/advisees', (req, res) => {
  let where = req.query.where ? req.query.where.replace('WHERE', 'AND') : ''
  // const member_id = req.user.member_id
  const memberId = 1
  queryHelper.queryAndResponse({
    sql: `select t5.student_id, team_name, t5.firstname, t5.lastname , c.competition_name, c.prize from advisors as t1
          inner join teams_advisors as t2
          on t1.member_id = t2.member_id
          inner join competition_teams as t3
          on t3.team_id = t2.team_id
          inner join teams_students as t4
          on t3.team_id = t4.team_id
          inner join students as t5
          on t4.sid = t5.sid
          inner join competitions as c
          on t3.team_id = c.team_id
          where t2.member_id = ${memberId} ${where}
          order by  competition_name, team_name`,
    req: req,
    res: res
  })
})


module.exports = router
