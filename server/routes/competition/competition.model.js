const query = require('../../utilities/query')

const CompetitionColumns = [
  'team_id',
  'competition_name',
  'prize',
  'competition_description'
]

const TABLE_NAME = 'competitions'

const getAllCompetitions = () => `SELECT competition_name, competition_description, prize, T1.team_id, team_name,
	group_concat( member_name SEPARATOR ', ') as advisors
	FROM teams_advisors as T1
		LEFT JOIN competitions as T2 ON T1.team_id = T2.team_id
		LEFT JOIN faculty_members as T3 ON T1.member_id = T3.member_id
		LEFT JOIN competition_teams as T4 ON T1.team_id = T4.team_id
group by competition_name, competition_description, prize, team_id, team_name;`

const filterCompetitions = (filterList) => {
  return query.transformToSQL.filter(TABLE_NAME, filterList)
}

const insertCompetition = (dataSet) => {
  return query.transformToSQL.insert(TABLE_NAME, dataSet)
}

const deleteCompetition = (conditionSet) => {
  return query.transformToSQL.delete(TABLE_NAME, conditionSet)
}

module.exports = {
  CompetitionColumns,
  getAllCompetitions,
  filterCompetitions,
  deleteCompetition,
  insertCompetition
}


