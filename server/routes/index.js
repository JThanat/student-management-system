const router = require('express').Router()

router.use('/student', require('./student/student.route'))
router.use('/', (req, res) => {
  res.send('Path not defined')
})

module.exports = router
