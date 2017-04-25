const express = require('express')
const router = express.Router()
const queryHelper = require('../utilities/query')

const Student = require('./student.model')

router.get('/all', (req, res) => {
  queryHelper.queryAndResponse(Student.getAllStudentSQL(), req, res)
})

router.get('/id/:id', (req, res) => {
  const id = req.params.id
  queryHelper.queryAndResponse(Student.getOneStudentSQL(id), req, res)
})

module.exports = router
