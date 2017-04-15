const express = require('express')
const router = express.Router()

const Student = require('./student.model')

router.get('/:id', (req, res) => {
  console.log(req.body)
  console.log(req.query)
  console.log(req.params)
  res.json({
    message: 'this should return student with id ' + req.params.id
  })
})

router.get('/get_all_student', (req, res) => {
  return new Promise()
})

router.get('/', (req, res) => {
  res.json({
    message: 'This should be some default route for student'
  })
})

router.pos('/')
module.exports = router
