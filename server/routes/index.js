const router = require('express').Router()

router.use('/activity', require('./activity/activity.route'))
router.use('/competition', require('./competition/competition.route'))
router.use('/dashboard', require('./dashboard/dashboard.route'))
router.use('/leaves', require('./leave/leave.route'))
router.use('/project', require('./project/project.route'))
router.use('/punishment', require('./punishment/punishment.route'))
router.use('/student', require('./student/student.route'))
router.use('/', (req, res) => {
  res.status(404).send('Page not found')
})

module.exports = router
