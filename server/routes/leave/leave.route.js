const express = require('express')
const queryHelper = require('../../utilities/query')
const Leave = require('./leave.model')

const router = express.Router()

router.get('/all', (req, res) => {
  queryHelper.queryAndResponse({
    sql: Leave.getAllLeaves() + (req.query.where || ''),
    req: req,
    res: res
  })
})

router.get('/filter', (req, res) => {
  const filterList = req.query
  queryHelper.queryAndResponse({
    sql: Leave.filterLeaves(filterList),
    req: req,
    res: res
  })
})

router.post('/insert', (req, res) => {
  const data = req.body.data
  console.log(data)
  queryHelper.queryAndResponse({
    sql: Leave.insertLeave(data),
    req: req,
    res: res
  })
})

router.post('/delete', (req, res) => {
  const data = req.body.data
  queryHelper.queryAndResponse({
    sql: Leave.deleteLeave(data),
    req: req,
    res: res
  })
})

router.post('/update', (req, res) => {
  const data = req.body.data
  const oldData = req.body.oldData
  queryHelper.queryAndResponse({
    sql: Leave.updateLeave(data, oldData),
    req: req,
    res: res
  })
})

module.exports = router
