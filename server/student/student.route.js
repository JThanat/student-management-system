const express = require('express')
const async = require('async') 
const router = express.Router()

const Student = require('./student.model')

// router.get('/:id', (req, res) => {
//   res.json({
//     message: 'this should return student with id ' + req.params.id
//   })
// })

router.get('/all', (req, res) => {
  async.series([
    Student.getAllStudent
  ], (err, result) => {
    result = result[0]
    if (!err) {
      res.json(result)
    }
  })
})

router.get('/', (req, res) => {
  res.json({
    message: 'This should be some default route for student'
  })
})

// router.pos('/')
module.exports = router
