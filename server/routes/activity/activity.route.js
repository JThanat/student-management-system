const express = require('express')
const queryHelper = require('../../utilities/query')
const Activity = require('./activity.model')

const router = express.Router()

router.get('/all', (req, res) => {
  queryHelper.queryAndResponse({
    sql: Activity.getAllActivities(),
    req: req,
    res: res
  })
})

router.get('/filter', (req, res) => {
  const filterList = req.query
  queryHelper.queryAndResponse({
    sql: Activity.filterActivities(filterList),
    req: req,
    res: res
  })
})

router.post('/delete', (req, res) => {
  const data = req.body.data
  queryHelper.queryAndResponse({
    sql: Activity.deleteActivity(data),
    req: req,
    res: res
  })
})

router.post('/insert', (req, res) => {
  const data = req.body.data
  queryHelper.queryAndResponse({
    sql: Activity.insertActivity(data),
    req: req,
    res: res
  })
})

router.post('/update', (req, res) => {
  const data = req.body.data
  const oldData = req.body.oldData
  queryHelper.queryAndResponse({
    sql: Activity.updateActivity(data, oldData),
    req: req,
    res: res
  })
})

module.exports = router
