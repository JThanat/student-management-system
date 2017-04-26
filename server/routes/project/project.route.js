const express = require('express')
const queryHelper = require('../../utilities/query')
const Project = require('./project.model')

const router = express.Router()

router.get('/all', (req, res) => {
  queryHelper.queryAndResponse({
    sql: Project.getAllProjects(),
    req: req,
    res: res
  })
})

router.get('/filter', (req, res) => {
  const filterList = req.query
  queryHelper.queryAndResponse({
    sql: Project.filterProjects(filterList),
    req: req,
    res: res
  })
})

router.post('/create', (req, res) => {
  const data = req.body.data
  queryHelper.queryAndResponse({
    sql: Project.insertProject(data),
    req: req,
    res: res
  })
})

module.exports = router
