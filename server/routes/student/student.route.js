const express = require('express')
const router = express.Router()
const queryHelper = require('../../utilities/query')

const Student = require('./student.model')

router.get('/all', (req, res) => {
  queryHelper.queryAndResponse({
    sql: Student.getAllStudentSQL(),
    req: req,
    res: res
  })
})

router.get('/id/:id', (req, res) => {
  const id = req.params.id
  queryHelper.queryAndResponse({
    sql: Student.getOneStudentSQL(id),
    parse: (data) => {
      if (!data) {
        return {}
      }
      return data[0]
    },
    req: req,
    res: res
  })
})

router.post('/insert', (req, res) => {
  res.send(Student.insertStudentSQL(req.body.data))
})

router.post('/update', (req, res) => {
  const {
    student_id,
    data
  } = req.body

  queryHelper.queryAndResponse({
    sql: Student.updateStudentSQL(student_id, data),
    parse: (data) => {
      if (!data) {
        return {}
      }
      return data[0]
    },
    req: req,
    res: res
  })
})

router.post('/delete', (req, res) => {
  const where = req.body.where
  queryHelper.queryAndResponse({
    sql: Student.deleteStudentSQL(where),
    req: req,
    res: res
  })
})

router.get('/test', (req, res) => {
  res.send('done')
})

router.get('/filter', (req, res) => {
  const filterList = req.query
  queryHelper.queryAndResponse({
    sql: Student.filterStudentSQL(filterList),
    req: req,
    res: res
  })
})

module.exports = router
