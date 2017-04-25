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
  const {
    student_id,
    data
  } = req.body
  res.send(Student.insertStudentSQL(student_id, data))
})

router.get('/update', (req, res) => {
  const {
    student_id,
    data
  } = req.body
  res.send(Student.updateStudentSQL(student_id, data))
})

router.post('/delete', (req, res) => {
  res.send(Student.deleteStudentSQL(req.body.student_id))
})

router.get('/test', (req, res) => {
  res.send('done')
})

module.exports = router
