const query = require('../../utilities/query')

const CompetitionColumns = [
  'team_id',
  'competition_name',
  'prize',
  'competition_description'
]

const TABLE_NAME = 'competitions'

const getAllCompetitions = () => `SELECT * FROM ${TABLE_NAME}`

const filterCompetition = (filterList) => {
  return query.transformToSQL.filter(TABLE_NAME, filterList)
}

const deleteCompetition = (conditionSet) => {
  return query.transformToSQL.delete(TABLE_NAME, conditionSet)
}

module.exports = {
  CompetitionColumns,
  getAllCompetitions,
  filterCompetition,
  deleteCompetition
}
