const router = require('express').Router()

router.use('/student', require('./student/student.route'))
router.use('/', (req, res) => {
  res.status(404).send('Page not found')
})

module.exports = router
