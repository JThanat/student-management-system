const router = require('express').Router()

router.use('/student', require('../student/student.route'))

module.exports = router
