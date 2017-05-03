const express = require('express')
const queryHelper = require('../../utilities/query')
const Competition = require('./competition.model')

const router = express.Router()

router.get('/all', (req, res) => {
  queryHelper.queryAndResponse({
    sql: Competition.getAllCompetitions(req.query.where || ''),
    req: req,
    res: res
  })
})

router.get('/team', (req, res) => {
  queryHelper.queryAndResponse({
    sql: `SELECT team_id, team_name from competition_teams`,
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

router.post('/insert', (req, res) => {
  queryHelper.queryAndResponse({
    sql: Competition.insertCompetition(req.body.data),
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

router.post('/update', (req, res) => {
  const {
    data
  } = req.body

  queryHelper.queryAndResponse({
    sql: Competition.updateCompetition(data),
    parse: (data) => {
      if (!data) {
        return {}
      }
      return data[0]
    },
    req: req,
    res: res
  })
})

// TODO - For insert we should move the prize out first

module.exports = router

