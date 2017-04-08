const express = require('express')
const router = express.Router()

const Student = require('./student.model')

router.get('/:id', (req, res) => {
  res.json({
    message: 'this should return student with id ' + req.params.id
  })
})

router.get('/get_all_student', (req, res) => {
  
})
module.exports = router
