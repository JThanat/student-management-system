const query = require('../../utilities/query')

const CompetitionColumns = [
  'team_id',
  'competition_name',
  'prize',
  'competition_description'
]

const TABLE_NAME = 'competitions'

const getAllCompetitions = () => `SELECT team_name, competitions.competition_name, 
  competitions.competition_description, competitions.prize
  FROM competitions
  left join competition_teams
  on competitions.team_id = competition_teams.team_id`

const filterCompetitions = (filterList) => {
  return query.transformToSQL.filter(TABLE_NAME, filterList)
}

const deleteCompetition = (conditionSet) => {
  return query.transformToSQL.delete(TABLE_NAME, conditionSet)
}

module.exports = {
  CompetitionColumns,
  getAllCompetitions,
  filterCompetitions,
  deleteCompetition
}
