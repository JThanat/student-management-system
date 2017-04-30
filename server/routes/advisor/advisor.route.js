const express = require('express')
const queryHelper = require('../../utilities/query')
const router = express.Router()

router.get('/advisees', (req, res) => {
  const data = req.query.data
  // const member_id = req.user.member_id
  const member_id = 1
  queryHelper.queryAndResponse({
    sql: `select student_id, s.firstname, s.lastname, s.member_id, f.member_name, s.gpax, s.status from students as s 
          inner join advisors as a 
          on s.member_id = a.member_id 
          inner join faculty_members as f 
          on s.member_id = f.member_id 
          where f.member_id = ${member_id}`,
    req: req,
    res: res
  })
})

router.get('/project/advisees', (req, res) => {
  const data = req.query.data
  // const member_id = req.user.member_id
  const member_id = 1
  queryHelper.queryAndResponse({
    sql: `select student_id, s.firstname, s.lastname, s.member_id, f.member_name, s.gpax, s.status from students as s 
          inner join advisors as a 
          on s.member_id = a.member_id 
          inner join faculty_members as f 
          on s.member_id = f.member_id 
          where f.member_id = ${member_id}`,
    req: req,
    res: res
  })
})

router.get('/competition/advisees', (req, res) => {
  const data = req.query.data
  // const member_id = req.user.member_id
  const member_id = 1
  queryHelper.queryAndResponse({
    sql: `select student_id, s.firstname, s.lastname, s.member_id, f.member_name, s.gpax, s.status from students as s 
          inner join advisors as a 
          on s.member_id = a.member_id 
          inner join faculty_members as f 
          on s.member_id = f.member_id 
          where f.member_id = ${member_id}`,
    req: req,
    res: res
  })
})


module.exports = router
