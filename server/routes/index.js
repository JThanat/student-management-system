const router = require('express').Router()

router.get('/test', (req, res) => {
  res.json({
    messege: 'hello'
  })
})

module.exports = router
