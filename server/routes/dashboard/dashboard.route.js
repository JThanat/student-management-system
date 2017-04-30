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

router.get('/average-gpax', (req, res) => {
  queryHelper.queryAndResponse({
    sql: `select substr(student_id, 1, 2) as academic_year, avg(gpax) as avg_gpax
	        from students group by SUBSTRING(student_id, 1, 2);`,
    req: req,
    res: res
  })
})


module.exports = router
