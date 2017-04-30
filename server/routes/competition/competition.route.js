const express = require('express')
const queryHelper = require('../../utilities/query')
const Competition = require('./competition.model')

const router = express.Router()

router.get('/all', (req, res) => {
  queryHelper.queryAndResponse({
    sql: Competition.getAllCompetitions(),
    req: req,
    res: res
  })
})

router.get('/filter', (req, res) => {
  const filterList = req.query
  queryHelper.queryAndResponse({
    sql: Competition.filterCompetitions(filterList),
    req: req,
    res: res
  })
})

router.post('/delete', (req, res) => {
  const data = req.body.data
  queryHelper.queryAndResponse({
    sql: Competition.deleteCompetition(data),
    req: req,
    res: res
  })
})
// TODO - For insert we should move the prize out first

module.exports = router

